"use client";

import FullCalendar from "@fullcalendar/react";

import { EventStatusEnum } from "@/src/enum/eventStatus.enum";
import { EventTypeEnum } from "@/src/enum/eventType.enum";
import { CoreModal } from "@/src/shared/components/CoreModal";
import { EMPTY_KEY_VALUE } from "@/src/shared/constants/default.constant";
import ptBr from "@fullcalendar/core/locales/pt-br";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState } from "react";
import { EVENT_STATUS_COLORS, EVENT_TYPE_COLORS } from "./event.util";
import { useEventScreen } from "./event.hooks";
import { EventForm, EventFormInitialDataType } from "./EventForm";

export function EventCalendar() {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [editing, setEditing] = useState<EventFormInitialDataType>({
    id: undefined,
    start: undefined,
    end: undefined,
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
    backgroundColor: EVENT_TYPE_COLORS[event.tpEvent].background,
    borderColor: EVENT_TYPE_COLORS[event.tpEvent].border,
    textColor: EVENT_TYPE_COLORS[event.tpEvent].text,
  }));

  const onSuccessSubmitEvent = () => {
    setIsOpenForm(false);
  };

  return (
    <>
      <div className="mb-3 flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {Object.entries(EventTypeEnum).map(([key, label]) => {
            const colors = EVENT_TYPE_COLORS[key as keyof typeof EventTypeEnum];

            return (
              <span
                key={key}
                className="rounded-full border-2 px-2 py-0.5 text-xs font-medium"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                {label}
              </span>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-3">
          {Object.entries(EventStatusEnum).map(([key, label]) => (
            <span
              key={key}
              className="text-muted-foreground inline-flex items-center gap-1.5 text-xs"
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{
                  backgroundColor:
                    EVENT_STATUS_COLORS[key as keyof typeof EventStatusEnum],
                }}
              />
              {label}
            </span>
          ))}
        </div>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
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
        eventContent={(arg) => {
          const tpEvent = arg.event.extendedProps
            .tpEvent as keyof typeof EventTypeEnum;
          const tpStatus = arg.event.extendedProps
            .tpStatus as keyof typeof EventStatusEnum;

          return (
            <div className="flex items-center gap-1 overflow-hidden px-1">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: EVENT_STATUS_COLORS[tpStatus] }}
              />
              <span className="truncate text-xs font-medium">
                {EventTypeEnum[tpEvent]} - {arg.event.title}
              </span>
            </div>
          );
        }}
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

      <CoreModal
        open={isOpenForm}
        title="Novo Evento"
        size="lg"
        onOpenChange={setIsOpenForm}
      >
        <EventForm
          initialData={editing}
          kvClient={eventScreenQuery.data?.kvClient ?? EMPTY_KEY_VALUE}
          kvProfessional={
            eventScreenQuery.data?.kvProfessional ?? EMPTY_KEY_VALUE
          }
          onCancel={() => setIsOpenForm(false)}
          onSuccess={onSuccessSubmitEvent}
        />
      </CoreModal>
    </>
  );
}
