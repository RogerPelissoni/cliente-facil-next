"use client";

import FullCalendar from "@fullcalendar/react";

import { CoreModal } from "@/src/shared/components/CoreModal";
import { EMPTY_KEY_VALUE } from "@/src/shared/constants/default.constant";
import ptBr from "@fullcalendar/core/locales/pt-br";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState } from "react";
import { useEventScreen } from "./event.hooks";
import { EventForm, EventFormInitialDataType } from "./EventForm";

export function EventCalendar() {
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [editing, setEditing] = useState<EventFormInitialDataType>({
        id: undefined,
        start: undefined,
        end: undefined
    });

    const eventScreenQuery = useEventScreen();

    // Não mutar `eventScreenQuery.data.obEvent` diretamente (era o comportamento anterior) — é o
    // mesmo objeto guardado no cache do React Query; mutar em vez de derivar um array novo mexe com
    // a comparação estrutural que a lib usa internamente pra decidir se algo mudou de fato.
    const events = eventScreenQuery.data?.obEvent?.map((event) => ({
        ...event,
        title: event.dsTitle,
        start: new Date(event.dtStart),
        end: new Date(event.dtEnd),
    }));

    const onSuccessSubmitEvent = () => {
        setIsOpenForm(false);
    };

    return (
        <>
            <FullCalendar
                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    listPlugin,
                    interactionPlugin,
                ]}
                initialView="dayGridMonth"
                height="auto"
                locale={ptBr}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "addEvent dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                }}
                customButtons={{
                    addEvent: {
                        text: "Adicionar",
                        click: () => {
                            setEditing({ id: undefined });
                            setIsOpenForm(true);
                        },
                    },
                }}
                editable
                selectable
                weekends
                events={events}
                dateClick={(info) => {
                    setEditing({
                        id: undefined,
                        start: info.date ?? undefined,
                        end: info.date ?? undefined,
                    });

                    setIsOpenForm(true);
                }}
                eventClick={(info) => {
                    setEditing({ id: info.event.id });
                    setIsOpenForm(true);
                }}
                select={(info) => {
                    setEditing({
                        id: undefined,
                        start: info.start ?? undefined,
                        end: info.end ?? undefined,
                    });

                    setIsOpenForm(true);
                }}
            />

            <CoreModal open={isOpenForm} title="Novo Evento" size="lg" onOpenChange={setIsOpenForm}>
                <EventForm
                    initialData={editing}
                    kvClient={eventScreenQuery.data?.kvClient ?? EMPTY_KEY_VALUE}
                    kvProfessional={eventScreenQuery.data?.kvProfessional ?? EMPTY_KEY_VALUE}
                    onCancel={() => setIsOpenForm(false)}
                    onSuccess={onSuccessSubmitEvent}
                />
            </CoreModal>
        </>
    );
}