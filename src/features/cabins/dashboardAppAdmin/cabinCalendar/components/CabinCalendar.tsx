"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useCabinBookedDates } from "../hooks/useCabinBookedDates";
import esLocale from "@fullcalendar/core/locales/es";
import { useEffect } from "react";

interface CabinCalendarProps {
  cabinId: string;
  setSection: (section: string) => void;
}

const CabinCalendar = ({ cabinId, setSection }: CabinCalendarProps) => {
  const { events } = useCabinBookedDates(cabinId);
  console.log("Eventos en calendario:", events);

  // Este useEffect asegura que el componente se muestre scrolleado al inicio cada vez que se monta en el dashboard src/dashboardAppAdmin/page.tsx.
  useEffect(() => {
    // Intentamos scroll en main y también en body/html por si acaso
    const main = document.getElementById("dashboard-scroll-container");
    if (main) {
      main.scrollTop = 0;
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white dark:bg-gray-900 dark:text-white">
      <button
        onClick={() => setSection("cabinDetail")}
        className="ml-4 mt-4 text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors mb-4"
      >
        ← Volver
      </button>
      {/* Configurado en Inglés */}
      {/* <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "",
        }}
        events={events}
        height="auto"
        selectable={false}
      /> */}

      {/* Configurado en Español */}
      {/* <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locales={[esLocale]} // ← Agregado
        locale="es" // ← Agregado
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "",
        }}
        events={events}
        height="auto"
        selectable={false}
      /> */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locales={[esLocale]}
        locale="es"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "",
        }}
        events={events}
        height="auto"
        selectable={false}
      />
    </div>
  );
};

export default CabinCalendar;