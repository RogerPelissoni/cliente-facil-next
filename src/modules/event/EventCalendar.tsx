"use client";

import FullCalendar from "@fullcalendar/react";

import ptBr from "@fullcalendar/core/locales/pt-br";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEventByAuthUser } from "./event.hooks";

export function EventCalendar() {

    const events = useEventByAuthUser();

    events.data = events.data?.map((event) => {
        return {
            ...event,
            title: event.dsTitle,
            start: event.dtStart,
            end: event.dtEnd
        }
    });

    return (
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
                console.log(info.dateStr);
            }}
            eventClick={(info) => {
                console.log(info.event.id);
            }}
            select={(info) => {
                console.log(info.startStr, info.endStr);
            }}
            datesSet={(info) => {
                console.log(info.start, info.end);
            }}
        />
    );
}