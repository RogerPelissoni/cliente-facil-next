"use client";

import FullCalendar from "@fullcalendar/react";

import { CoreModal } from "@/src/shared/components/CoreModal";
import { IdentifierType } from "@/src/shared/types/form.type";
import ptBr from "@fullcalendar/core/locales/pt-br";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState } from "react";
import { useEventByAuthUser } from "./event.hooks";
import { EventForm } from "./EventForm";

export function EventCalendar() {
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [editing, setEditing] = useState<{
        id?: IdentifierType
    }>();

    const events = useEventByAuthUser();

    events.data = events.data?.map((event) => {
        return {
            ...event,
            title: event.dsTitle,
            start: new Date(event.dtStart),
            end: new Date(event.dtEnd)
        }
    });

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
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                }}
                editable
                selectable
                weekends
                events={events.data}
                dateClick={(info) => {
                    setEditing({ id: undefined });
                    setIsOpenForm(true);
                }}
                eventClick={(info) => {
                    setEditing({ id: info.event.id });
                    setIsOpenForm(true);
                }}
                select={(info) => {
                    console.log(info.startStr, info.endStr);
                }}
                datesSet={(info) => {
                    console.log(info.start, info.end);
                }}
            />

            <CoreModal open={isOpenForm} title="Novo Evento" size="lg" onOpenChange={setIsOpenForm}>
                <EventForm
                    id={editing?.id}
                    onCancel={() => setIsOpenForm(false)}
                    onSuccess={onSuccessSubmitEvent}
                />
            </CoreModal>
        </>
    );
}