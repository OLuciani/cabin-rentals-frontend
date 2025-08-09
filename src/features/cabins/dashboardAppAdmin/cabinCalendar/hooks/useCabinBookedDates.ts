/* import { useEffect, useState } from "react";
import { getBookedDates } from "../services/cabinCalendarService";
import { CalendarEvent } from "../types/calendar.types";
import { IBookedRange } from "../../../types/cabinComplete";

export const useCabinBookedDates = (cabinId: string) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const bookedRanges: IBookedRange[] = await getBookedDates(cabinId);

        const calendarEvents: CalendarEvent[] = bookedRanges.map((range) => {
          const start = new Date(range.from);
          const end = new Date(range.to);
          end.setDate(end.getDate() + 1);

          return {
            title: "Reservado",
            start,
            end,
            allDay: true,
            color: "#f87171", // Rojo claro
          };
        });

        setEvents(calendarEvents);
        console.log("Eventos mapeados:", calendarEvents); // 🔍 debug opcional
      } catch (error) {
        console.error("Error al obtener fechas reservadas:", error);
      }
    };

    fetchDates();
  }, [cabinId]);

  return { events };
}; */



import { useEffect, useState } from "react";
import { getBookedDates } from "../services/cabinCalendarService";
import { CalendarEvent } from "../types/calendar.types";
import { IBookedRange } from "../../../types/cabinComplete";

export const useCabinBookedDates = (cabinId: string) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const bookedRanges: IBookedRange[] = await getBookedDates(cabinId);

        const calendarEvents: CalendarEvent[] = bookedRanges.map((range) => ({
          title: "Reservado",
          start: range.from.split("T")[0], // YYYY-MM-DD
          end: range.to.split("T")[0],     // YYYY-MM-DD, no restamos nada
          allDay: true,                    // ← clave
          //display: "background",
          color: "#f87171",
        }));

        setEvents(calendarEvents);
      } catch (error) {
        console.error("Error al obtener fechas reservadas:", error);
      }
    };

    fetchDates();
  }, [cabinId]);

  return { events };
};
