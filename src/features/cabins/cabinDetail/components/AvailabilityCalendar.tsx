// codigo original
/* "use client";

import React, { useState } from "react";
import { DateRange, RangeKeyDict, Range } from "react-date-range";
import { useCabinBookedDates } from "../../dashboardAppAdmin/cabinCalendar/hooks/useCabinBookedDates";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface AvailabilityCalendarProps {
  cabinId: string;
  onDateRangeSelect?: (start: Date, end: Date) => void;
  setStartDate: React.Dispatch<React.SetStateAction<string | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<string | null>>;
  //setShowCalendarButton: React.Dispatch<React.SetStateAction<boolean>>;
  onDateRangeSetInUrl?: (startDateStr: string, endDateStr: string) => void;
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  showCalendar: boolean;
}

// Normalizador de fechas (elimina hora)
const normalizeDate = (date: Date | string) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const AvailabilityCalendar = ({
  cabinId,
  onDateRangeSelect,
  setStartDate,
  setEndDate,
  //setShowCalendarButton,
  onDateRangeSetInUrl,
  setShowCalendar,
  showCalendar
}: AvailabilityCalendarProps) => {
  const { events } = useCabinBookedDates(cabinId);

  const reservedDates = events.flatMap(({ start, end }) => {
    const startDate = normalizeDate(start);
    const endDate = normalizeDate(end);
    const range = [];
    // Usamos `let` porque vamos a mutar `current` en cada iteración del while.
    // Esta reasignación es intencional, por eso desactivamos la regla ESLint.
    // eslint-disable-next-line prefer-const
    let current = new Date(startDate);
    while (current < endDate) {
      range.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return range;
  });

  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  

  const handleRangeChange = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;
    setDateRange(selection);

    if (
      selection.startDate &&
      selection.endDate &&
      selection.startDate.toDateString() !== selection.endDate.toDateString()
    ) {
      const start = selection.startDate.toISOString();
      const end = selection.endDate.toISOString();

      setStartDate(start);
      setEndDate(end);

      if (onDateRangeSelect) {
        onDateRangeSelect(selection.startDate, selection.endDate);
      }

      // 👇 Actualiza la URL desde CabinHeader usando la función que llega por props
      if(onDateRangeSetInUrl) {
        onDateRangeSetInUrl(start, end);
      }
    }
  };

  const handleConfirmDates = () => {
    const { startDate, endDate } = dateRange;

    if (
      startDate &&
      endDate &&
      startDate.toDateString() !== endDate.toDateString()
    ) {
      const start = startDate.toISOString();
      const end = endDate.toISOString();

      setStartDate(start);
      setEndDate(end);

      if (onDateRangeSelect) {
        onDateRangeSelect(startDate, endDate);
      }

      if(onDateRangeSetInUrl) {
        onDateRangeSetInUrl(start, end);
      }
      setShowCalendar(false);
      //setShowCalendarButton(false);
    }
  };

  const dayContentRenderer = (date: Date) => {
    const isReserved = reservedDates.some(
      (d) => d.toDateString() === date.toDateString()
    );

    const isSelected =
      dateRange.startDate &&
      dateRange.endDate &&
      date >= dateRange.startDate &&
      date <= dateRange.endDate;

    const pointerEventsValue: React.CSSProperties["pointerEvents"] = isReserved
      ? "none"
      : undefined;

    const baseStyle: React.CSSProperties = {
      width: 36,
      height: 36,
      lineHeight: "36px",
      borderRadius: "50%",
      textAlign: "center",
      margin: "auto",
      userSelect: "none",
      pointerEvents: pointerEventsValue,
      opacity: isReserved ? 0.6 : 1,
      backgroundColor: isReserved
        ? "#fca5a5"
        : isSelected
        ? "#c7d2fe"
        : undefined,
      color: isReserved ? "#7f1d1d" : isSelected ? "#1e3a8a" : "#111827",
      fontWeight: isSelected ? "bold" : "normal",
    };

    return <div style={baseStyle}>{date.getDate()}</div>;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {!showCalendar ? (
        <button
          onClick={() => setShowCalendar(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Ver fechas disponibles
        </button>)
        : (<button
          onClick={() => setShowCalendar(false)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Ocultar calendario
        </button>
      )}

      {showCalendar && (
        <>
          
          {dateRange.startDate &&
            dateRange.endDate &&
            dateRange.startDate.toDateString() !==
              dateRange.endDate.toDateString() && (
              <div className="w-full flex flex-col space-y-4 border-[2px] p-4 rounded-lg">
                <div className="flex flex-col space-y-2">
                  <p>
                    <strong>Fecha de entrada:</strong>{" "}
                    {dateRange.startDate?.toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Fecha de salida:</strong>{" "}
                    {dateRange.endDate?.toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={handleConfirmDates}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Confirmar fechas
                </button>

                <button
                  onClick={() => {
                    setDateRange({
                      startDate: new Date(),
                      endDate: new Date(),
                      key: "selection",
                    });
                  }}
                  className="mt-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                >
                  Elegir otras fechas
                </button>
              </div>
            )}

          <DateRange
            ranges={[dateRange]}
            onChange={handleRangeChange}
            minDate={new Date()}
            months={1}
            direction="horizontal"
            editableDateInputs={true}
            disabledDates={reservedDates}
            dayContentRenderer={dayContentRenderer}
          />
        </>
      )}
    </div>
  );
};

export default AvailabilityCalendar; */

//este tiene arreglado el tema de mostrar bien las fechas reservadas, sin defasaje
/* "use client";

import React, { useState } from "react";
import { DateRange, RangeKeyDict, Range } from "react-date-range";
import { useCabinBookedDates } from "../../dashboardAppAdmin/cabinCalendar/hooks/useCabinBookedDates";
import { parseISO } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface AvailabilityCalendarProps {
  cabinId: string;
  onDateRangeSelect?: (start: Date, end: Date) => void;
  setStartDate: React.Dispatch<React.SetStateAction<string | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<string | null>>;
  onDateRangeSetInUrl?: (startDateStr: string, endDateStr: string) => void;
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  showCalendar: boolean;
}

// Normalizador de fechas (elimina hora)
const normalizeDate = (date: string | Date) => {
  const d = typeof date === "string" ? parseISO(date) : date;
  d.setHours(0, 0, 0, 0);
  return d;
};

const AvailabilityCalendar = ({
  cabinId,
  onDateRangeSelect,
  setStartDate,
  setEndDate,
  onDateRangeSetInUrl,
  setShowCalendar,
  showCalendar,
}: AvailabilityCalendarProps) => {
  const { events } = useCabinBookedDates(cabinId);

  // Construimos arreglo de fechas reservadas correctamente normalizadas
  const reservedDates = events.flatMap(({ start, end }) => {
    const startDate = normalizeDate(start);
    const endDate = normalizeDate(end);
    const range = [];
    const current = new Date(startDate);
    // Usamos < para reservar hasta día antes de salida, o <= si quieres incluir día salida
    while (current < endDate) {
      range.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return range;
  });

  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleRangeChange = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;
    setDateRange(selection);

    if (
      selection.startDate &&
      selection.endDate &&
      selection.startDate.toDateString() !== selection.endDate.toDateString()
    ) {
      const start = selection.startDate.toISOString();
      const end = selection.endDate.toISOString();

      setStartDate(start);
      setEndDate(end);

      if (onDateRangeSelect) {
        onDateRangeSelect(selection.startDate, selection.endDate);
      }

      if (onDateRangeSetInUrl) {
        onDateRangeSetInUrl(start, end);
      }
    }
  };

  const handleConfirmDates = () => {
    const { startDate, endDate } = dateRange;

    if (
      startDate &&
      endDate &&
      startDate.toDateString() !== endDate.toDateString()
    ) {
      const start = startDate.toISOString();
      const end = endDate.toISOString();

      setStartDate(start);
      setEndDate(end);

      if (onDateRangeSelect) {
        onDateRangeSelect(startDate, endDate);
      }

      if (onDateRangeSetInUrl) {
        onDateRangeSetInUrl(start, end);
      }
      setShowCalendar(false);
    }
  };

  const dayContentRenderer = (date: Date) => {
    const isReserved = reservedDates.some(
      (d) => d.toDateString() === date.toDateString()
    );

    const isSelected =
      dateRange.startDate &&
      dateRange.endDate &&
      date >= dateRange.startDate &&
      date <= dateRange.endDate;

    const pointerEventsValue: React.CSSProperties["pointerEvents"] = isReserved
      ? "none"
      : undefined;

    const baseStyle: React.CSSProperties = {
      width: 36,
      height: 36,
      lineHeight: "36px",
      borderRadius: "50%",
      textAlign: "center",
      margin: "auto",
      userSelect: "none",
      pointerEvents: pointerEventsValue,
      opacity: isReserved ? 0.6 : 1,
      backgroundColor: isReserved
        ? "#fca5a5"
        : isSelected
        ? "#c7d2fe"
        : undefined,
      color: isReserved ? "#7f1d1d" : isSelected ? "#1e3a8a" : "#111827",
      fontWeight: isSelected ? "bold" : "normal",
    };

    return <div style={baseStyle}>{date.getDate()}</div>;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {!showCalendar ? (
        <button
          onClick={() => setShowCalendar(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Ver fechas disponibles
        </button>
      ) : (
        <button
          onClick={() => setShowCalendar(false)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Ocultar calendario
        </button>
      )}

      {showCalendar && (
        <>
          {dateRange.startDate &&
            dateRange.endDate &&
            dateRange.startDate.toDateString() !==
              dateRange.endDate.toDateString() && (
              <div className="w-full flex flex-col space-y-4 border-[2px] p-4 rounded-lg">
                <div className="flex flex-col space-y-2">
                  <p>
                    <strong>Fecha de entrada:</strong>{" "}
                    {dateRange.startDate?.toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Fecha de salida:</strong>{" "}
                    {dateRange.endDate?.toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={handleConfirmDates}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Confirmar fechas
                </button>

                <button
                  onClick={() => {
                    setDateRange({
                      startDate: new Date(),
                      endDate: new Date(),
                      key: "selection",
                    });
                  }}
                  className="mt-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                >
                  Elegir otras fechas
                </button>
              </div>
            )}

          <DateRange
            ranges={[dateRange]}
            onChange={handleRangeChange}
            minDate={new Date()}
            months={1}
            direction="horizontal"
            editableDateInputs={true}
            disabledDates={reservedDates}
            dayContentRenderer={dayContentRenderer}
          />
        </>
      )}
    </div>
  );
};

export default AvailabilityCalendar; */

// Está bastante bien, pero debe quitarse el borde azul a los dias de entrada de una reserva si el dia anterior ya esta reservado.
/* "use client";

import React, { useState } from "react";
import { DateRange, RangeKeyDict, Range } from "react-date-range";
import { useCabinBookedDates } from "../../dashboardAppAdmin/cabinCalendar/hooks/useCabinBookedDates";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface AvailabilityCalendarProps {
  cabinId: string;
  onDateRangeSelect?: (start: Date, end: Date) => void;
  setStartDate: React.Dispatch<React.SetStateAction<string | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<string | null>>;
  onDateRangeSetInUrl?: (startDateStr: string, endDateStr: string) => void;
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  showCalendar: boolean;
}

// Normaliza fecha quitando horas
const normalizeDate = (date: Date | string) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const AvailabilityCalendar = ({
  cabinId,
  onDateRangeSelect,
  setStartDate,
  setEndDate,
  onDateRangeSetInUrl,
  setShowCalendar,
  showCalendar,
}: AvailabilityCalendarProps) => {
  const { events } = useCabinBookedDates(cabinId);

  // Obtenemos fechas reservadas (rangos) y días de entrada (startDates)
  const reservedRanges = events.map(({ start, end }) => ({
    start: normalizeDate(start),
    end: normalizeDate(end),
  }));

  // Construimos array de fechas reservadas (incluye todos los días en el rango, menos el día de salida)
  const reservedDates = reservedRanges.flatMap(({ start, end }) => {
    const range = [];
    const current = new Date(start);
    while (current < end) {
      range.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return range;
  });

  // Array de fechas startDate normalizadas (días de entrada reservados)
  const startDates = events.map(({ start }) => normalizeDate(start));

  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  // Manejamos el cambio de rango
  const handleRangeChange = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;

    if (selection.startDate && selection.endDate) {
      const clickedDate = selection.endDate;
      const clickedDateNorm = normalizeDate(clickedDate);

      const isReserved = reservedDates.some(
        (d) => d.getTime() === clickedDateNorm.getTime()
      );
      const isStartDate = startDates.some(
        (d) => d.getTime() === clickedDateNorm.getTime()
      );

      // Si la fecha final es reservada y no es día de entrada, no permito seleccionarla
      if (isReserved && !isStartDate) {
        alert(
          "No puedes seleccionar esta fecha como salida porque está reservada. Por favor elige otra."
        );
        return;
      }
    }

    setDateRange(selection);

    if (
      selection.startDate &&
      selection.endDate &&
      selection.startDate.toDateString() !== selection.endDate.toDateString()
    ) {
      const start = selection.startDate.toISOString();
      const end = selection.endDate.toISOString();

      setStartDate(start);
      setEndDate(end);

      if (onDateRangeSelect) {
        onDateRangeSelect(selection.startDate, selection.endDate);
      }
      if (onDateRangeSetInUrl) {
        onDateRangeSetInUrl(start, end);
      }
    }
  };

  // Renderizado personalizado de días
  const dayContentRenderer = (date: Date) => {
    const normDate = normalizeDate(date);

    const isReserved = reservedDates.some(
      (d) => d.getTime() === normDate.getTime()
    );
    const isStartDate = startDates.some(
      (d) => d.getTime() === normDate.getTime()
    );

    const isSelected =
      dateRange.startDate &&
      dateRange.endDate &&
      date >= dateRange.startDate &&
      date <= dateRange.endDate;

    const style: React.CSSProperties = {
      width: 36,
      height: 36,
      lineHeight: "36px",
      borderRadius: "50%",
      textAlign: "center",
      margin: "auto",
      userSelect: "none",
      cursor: "pointer",
      backgroundColor: isSelected ? "#c7d2fe" : undefined,
      color: isSelected ? "#1e3a8a" : "#111827",
      fontWeight: isSelected ? "bold" : "normal",
      border: undefined,
      opacity: 1,
    };

    if (isReserved) {
      // Fondo rojo claro para todos los días reservados
      style.backgroundColor = "#fca5a5"; // rojo claro
      style.color = "#7f1d1d";
    }

    if (isReserved && isStartDate) {
      // Solo añadimos borde azul al día de entrada reservado
      style.border = "2px solid #2563eb"; // borde azul
      style.cursor = "pointer"; // clickeable
      style.pointerEvents = "auto";
    }

    if (isReserved && !isStartDate) {
      // Días reservados que no son entrada no se pueden clickear
      style.cursor = "not-allowed";
      style.pointerEvents = "none";
    }

    return <div style={style}>{date.getDate()}</div>;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {!showCalendar ? (
        <button
          onClick={() => setShowCalendar(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Ver fechas disponibles
        </button>
      ) : (
        <button
          onClick={() => setShowCalendar(false)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Ocultar calendario
        </button>
      )}

      {showCalendar && (
        <>
          {dateRange.startDate &&
            dateRange.endDate &&
            dateRange.startDate.toDateString() !==
              dateRange.endDate.toDateString() && (
              <div className="w-full flex flex-col space-y-4 border-[2px] p-4 rounded-lg">
                <div className="flex flex-col space-y-2">
                  <p>
                    <strong>Fecha de entrada:</strong>{" "}
                    {dateRange.startDate?.toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Fecha de salida:</strong>{" "}
                    {dateRange.endDate?.toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => setShowCalendar(false)}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Confirmar fechas
                </button>

                <button
                  onClick={() =>
                    setDateRange({
                      startDate: new Date(),
                      endDate: new Date(),
                      key: "selection",
                    })
                  }
                  className="mt-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                >
                  Elegir otras fechas
                </button>
              </div>
            )}

          <DateRange
            ranges={[dateRange]}
            onChange={handleRangeChange}
            minDate={new Date()}
            months={1}
            direction="horizontal"
            editableDateInputs={true}
            // quitamos disabledDates para permitir clicks en reservadas
            dayContentRenderer={dayContentRenderer}
          />
        </>
      )}
    </div>
  );
};

export default AvailabilityCalendar; */

// Muy cerca
/* "use client";

import React, { useState } from "react";
import { DateRange, RangeKeyDict, Range } from "react-date-range";
import { useCabinBookedDates } from "../../dashboardAppAdmin/cabinCalendar/hooks/useCabinBookedDates";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface AvailabilityCalendarProps {
  cabinId: string;
  onDateRangeSelect?: (start: Date, end: Date) => void;
  setStartDate: React.Dispatch<React.SetStateAction<string | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<string | null>>;
  onDateRangeSetInUrl?: (startDateStr: string, endDateStr: string) => void;
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  showCalendar: boolean;
}

// Normaliza fecha quitando horas
const normalizeDate = (date: Date | string) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const AvailabilityCalendar = ({
  cabinId,
  onDateRangeSelect,
  setStartDate,
  setEndDate,
  onDateRangeSetInUrl,
  setShowCalendar,
  showCalendar,
}: AvailabilityCalendarProps) => {
  const { events } = useCabinBookedDates(cabinId);

  // Obtenemos rangos reservados normalizados
  const reservedRanges = events.map(({ start, end }) => ({
    start: normalizeDate(start),
    end: normalizeDate(end),
  }));

  // Generamos array con todas las fechas reservadas incluidas en los rangos
  const reservedDates = reservedRanges.flatMap(({ start, end }) => {
    const range = [];
    const current = new Date(start);
    while (current < end) {
      range.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return range;
  });

  // Array con solo fechas de entrada (startDates) normalizadas
  const startDates = events.map(({ start }) => normalizeDate(start));

  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleRangeChange = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;

    if (selection.startDate && selection.endDate) {
      const clickedDate = selection.endDate;
      const clickedDateNorm = normalizeDate(clickedDate);

      const isReserved = reservedDates.some(
        (d) => d.getTime() === clickedDateNorm.getTime()
      );
      const isStartDate = startDates.some(
        (d) => d.getTime() === clickedDateNorm.getTime()
      );

      // Si la fecha final es reservada y no es día de entrada, no permito seleccionarla
      if (isReserved && !isStartDate) {
        alert(
          "No puedes seleccionar esta fecha como salida porque está reservada. Por favor elige otra."
        );
        return;
      }
    }

    setDateRange(selection);

    if (
      selection.startDate &&
      selection.endDate &&
      selection.startDate.toDateString() !== selection.endDate.toDateString()
    ) {
      const start = selection.startDate.toISOString();
      const end = selection.endDate.toISOString();

      setStartDate(start);
      setEndDate(end);

      if (onDateRangeSelect) {
        onDateRangeSelect(selection.startDate, selection.endDate);
      }
      if (onDateRangeSetInUrl) {
        onDateRangeSetInUrl(start, end);
      }
    }
  };

  const dayContentRenderer = (date: Date) => {
    const normDate = normalizeDate(date);

    const isReserved = reservedDates.some(
      (d) => d.getTime() === normDate.getTime()
    );
    const isStartDate = startDates.some(
      (d) => d.getTime() === normDate.getTime()
    );

    // Chequeo si el día anterior está reservado
    const previousDay = new Date(normDate);
    previousDay.setDate(previousDay.getDate() - 1);
    const isPreviousDayReserved = reservedDates.some(
      (d) => d.getTime() === previousDay.getTime()
    );

    const isSelected =
      dateRange.startDate &&
      dateRange.endDate &&
      date >= dateRange.startDate &&
      date <= dateRange.endDate;

    const style: React.CSSProperties = {
      width: 36,
      height: 36,
      lineHeight: "36px",
      borderRadius: "50%",
      textAlign: "center",
      margin: "auto",
      userSelect: "none",
      cursor: "pointer",
      backgroundColor: isSelected ? "#c7d2fe" : undefined,
      color: isSelected ? "#1e3a8a" : "#111827",
      fontWeight: isSelected ? "bold" : "normal",
      border: undefined,
      opacity: 1,
    };

    if (isReserved) {
      // Fondo rojo para todas las fechas reservadas
      style.backgroundColor = "#fca5a5";
      style.color = "#7f1d1d";
    }

    // Mostramos borde azul solo si es día de entrada y el día anterior NO está reservado
    if (isReserved && isStartDate && !isPreviousDayReserved) {
      style.border = "2px solid #2563eb"; // azul
      style.cursor = "pointer";
      style.pointerEvents = "auto";
    }

    // Si es reservado pero no cumple la condición de borde azul, lo bloqueamos
    if (
      isReserved &&
      (!isStartDate || (isStartDate && isPreviousDayReserved))
    ) {
      style.cursor = "not-allowed";
      style.pointerEvents = "none";
    }

    return <div style={style}>{date.getDate()}</div>;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {!showCalendar ? (
        <button
          onClick={() => setShowCalendar(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Ver fechas disponibles
        </button>
      ) : (
        <button
          onClick={() => setShowCalendar(false)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Ocultar calendario
        </button>
      )}

      {showCalendar && (
        <>
          {dateRange.startDate &&
            dateRange.endDate &&
            dateRange.startDate.toDateString() !==
              dateRange.endDate.toDateString() && (
              <div className="w-full flex flex-col space-y-4 border-[2px] p-4 rounded-lg">
                <div className="flex flex-col space-y-2">
                  <p>
                    <strong>Fecha de entrada:</strong>{" "}
                    {dateRange.startDate?.toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Fecha de salida:</strong>{" "}
                    {dateRange.endDate?.toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => setShowCalendar(false)}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Confirmar fechas
                </button>

                <button
                  onClick={() =>
                    setDateRange({
                      startDate: new Date(),
                      endDate: new Date(),
                      key: "selection",
                    })
                  }
                  className="mt-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                >
                  Elegir otras fechas
                </button>
              </div>
            )}

          <DateRange
            ranges={[dateRange]}
            onChange={handleRangeChange}
            minDate={new Date()}
            months={1}
            direction="horizontal"
            editableDateInputs={true}
            dayContentRenderer={dayContentRenderer}
          />
        </>
      )}
    </div>
  );
};

export default AvailabilityCalendar; */

// Mas cerca todavia
/* "use client";

import React, { useState } from "react";
import { DateRange, RangeKeyDict, Range } from "react-date-range";
import { useCabinBookedDates } from "../../dashboardAppAdmin/cabinCalendar/hooks/useCabinBookedDates";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface AvailabilityCalendarProps {
  cabinId: string;
  onDateRangeSelect?: (start: Date, end: Date) => void;
  setStartDate: React.Dispatch<React.SetStateAction<string | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<string | null>>;
  onDateRangeSetInUrl?: (startDateStr: string, endDateStr: string) => void;
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  showCalendar: boolean;
}

// Normaliza fecha quitando horas
const normalizeDate = (date: Date | string) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const AvailabilityCalendar = ({
  cabinId,
  onDateRangeSelect,
  setStartDate,
  setEndDate,
  onDateRangeSetInUrl,
  setShowCalendar,
  showCalendar,
}: AvailabilityCalendarProps) => {
  const { events } = useCabinBookedDates(cabinId);

  // Obtenemos fechas reservadas (rangos) y días de entrada (startDates)
  const reservedRanges = events.map(({ start, end }) => ({
    start: normalizeDate(start),
    end: normalizeDate(end),
  }));

  const reservedDates = reservedRanges.flatMap(({ start, end }) => {
    const range = [];
    const current = new Date(start);
    while (current < end) {
      range.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return range;
  });

  // Array de fechas startDate normalizadas (días de entrada reservados)
  const startDates = events.map(({ start }) => normalizeDate(start));

  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  // Manejamos el cambio de rango con la nueva validación
  const handleRangeChange = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;

    if (selection.startDate && selection.endDate) {
      const clickedDate = selection.endDate;
      const clickedDateNorm = normalizeDate(clickedDate);

      const isReserved = reservedDates.some(
        (d) => d.getTime() === clickedDateNorm.getTime()
      );
      const isStartDate = startDates.some(
        (d) => d.getTime() === clickedDateNorm.getTime()
      );

      // Chequear si día anterior está reservado
      const previousDay = new Date(clickedDateNorm);
      previousDay.setDate(previousDay.getDate() - 1);
      const isPreviousDayReserved = reservedDates.some(
        (d) => d.getTime() === previousDay.getTime()
      );

      // Bloquear si fecha reservada y:
      // no es día de entrada válido, o día de entrada con día anterior reservado (sin borde azul)
      if (
        isReserved &&
        (!isStartDate || (isStartDate && isPreviousDayReserved))
      ) {
        alert(
          "No puedes seleccionar esta fecha porque está reservada o no es una fecha válida de salida. Por favor elige otra."
        );
        return;
      }
    }

    setDateRange(selection);

    if (
      selection.startDate &&
      selection.endDate &&
      selection.startDate.toDateString() !== selection.endDate.toDateString()
    ) {
      const start = selection.startDate.toISOString();
      const end = selection.endDate.toISOString();

      setStartDate(start);
      setEndDate(end);

      if (onDateRangeSelect) {
        onDateRangeSelect(selection.startDate, selection.endDate);
      }
      if (onDateRangeSetInUrl) {
        onDateRangeSetInUrl(start, end);
      }
    }
  };

  // Renderizado personalizado de días
  const dayContentRenderer = (date: Date) => {
    const normDate = normalizeDate(date);

    const isReserved = reservedDates.some(
      (d) => d.getTime() === normDate.getTime()
    );
    const isStartDate = startDates.some(
      (d) => d.getTime() === normDate.getTime()
    );

    // Chequear si día anterior está reservado para decidir borde azul
    const previousDay = new Date(normDate);
    previousDay.setDate(previousDay.getDate() - 1);
    const isPreviousDayReserved = reservedDates.some(
      (d) => d.getTime() === previousDay.getTime()
    );

    const isSelected =
      dateRange.startDate &&
      dateRange.endDate &&
      date >= dateRange.startDate &&
      date <= dateRange.endDate;

    const style: React.CSSProperties = {
      width: 36,
      height: 36,
      lineHeight: "36px",
      borderRadius: "50%",
      textAlign: "center",
      margin: "auto",
      userSelect: "none",
      cursor: "pointer",
      backgroundColor: isSelected ? "#c7d2fe" : undefined,
      color: isReserved ? "#7f1d1d" : isSelected ? "#1e3a8a" : "#111827",
      fontWeight: isSelected ? "bold" : "normal",
      border: undefined,
      opacity: 1,
    };

    // Mostrar borde azul solo si es día de entrada y día anterior NO está reservado
    if (isReserved && isStartDate && !isPreviousDayReserved) {
      style.border = "2px solid #2563eb"; // azul
      style.backgroundColor = isSelected ? "#c7d2fe" : undefined;
      style.color = "#7f1d1d";
    }

    // Fechas reservadas normales sin borde
    if (isReserved && (!isStartDate || isPreviousDayReserved)) {
      style.backgroundColor = "#fca5a5"; // rojo claro
      style.color = "#7f1d1d";
    }

    return <div style={style}>{date.getDate()}</div>;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {!showCalendar ? (
        <button
          onClick={() => setShowCalendar(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Ver fechas disponibles
        </button>
      ) : (
        <button
          onClick={() => setShowCalendar(false)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Ocultar calendario
        </button>
      )}

      {showCalendar && (
        <>
          {dateRange.startDate &&
            dateRange.endDate &&
            dateRange.startDate.toDateString() !==
              dateRange.endDate.toDateString() && (
              <div className="w-full flex flex-col space-y-4 border-[2px] p-4 rounded-lg">
                <div className="flex flex-col space-y-2">
                  <p>
                    <strong>Fecha de entrada:</strong>{" "}
                    {dateRange.startDate?.toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Fecha de salida:</strong>{" "}
                    {dateRange.endDate?.toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => setShowCalendar(false)}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Confirmar fechas
                </button>

                <button
                  onClick={() =>
                    setDateRange({
                      startDate: new Date(),
                      endDate: new Date(),
                      key: "selection",
                    })
                  }
                  className="mt-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                >
                  Elegir otras fechas
                </button>
              </div>
            )}

          <DateRange
            ranges={[dateRange]}
            onChange={handleRangeChange}
            minDate={new Date()}
            months={1}
            direction="horizontal"
            editableDateInputs={true}
            dayContentRenderer={dayContentRenderer}
          />
        </>
      )}
    </div>
  );
};

export default AvailabilityCalendar; */

// Anda re bien, pero quiero que no muestre por defecto la fecha del dia como fecha de entrada.
/* "use client";

import React, { useState } from "react";
import { DateRange, RangeKeyDict, Range } from "react-date-range";
import { useCabinBookedDates } from "../../dashboardAppAdmin/cabinCalendar/hooks/useCabinBookedDates";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface AvailabilityCalendarProps {
  cabinId: string;
  onDateRangeSelect?: (start: Date, end: Date) => void;
  setStartDate: React.Dispatch<React.SetStateAction<string | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<string | null>>;
  onDateRangeSetInUrl?: (startDateStr: string, endDateStr: string) => void;
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  showCalendar: boolean;
}

// Normaliza fecha quitando horas
const normalizeDate = (date: Date | string) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

// Genera todas las fechas entre start y end, sin incluir end
const getDatesInRange = (start: Date, end: Date) => {
  const dates = [];
  const current = new Date(start);
  while (current < end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

const AvailabilityCalendar = ({
  cabinId,
  onDateRangeSelect,
  setStartDate,
  setEndDate,
  onDateRangeSetInUrl,
  setShowCalendar,
  showCalendar,
}: AvailabilityCalendarProps) => {
  const { events } = useCabinBookedDates(cabinId);

  // Fechas reservadas (rangos) y días de entrada
  const reservedRanges = events.map(({ start, end }) => ({
    start: normalizeDate(start),
    end: normalizeDate(end),
  }));

  // Todas las fechas reservadas (sin incluir el día de salida)
  const reservedDates = reservedRanges.flatMap(({ start, end }) => {
    return getDatesInRange(start, end);
  });

  // Días de entrada normalizados
  const startDates = events.map(({ start }) => normalizeDate(start));

  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleRangeChange = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;

    if (selection.startDate && selection.endDate) {
      const startNorm = normalizeDate(selection.startDate);
      const endNorm = normalizeDate(selection.endDate);

      // Genero todas las fechas dentro del rango seleccionado (sin incluir endDate)
      const datesInSelectedRange = getDatesInRange(startNorm, endNorm);

      // Verifico si hay alguna fecha reservada en ese rango
      const hasConflict = datesInSelectedRange.some((date) =>
        reservedDates.some(
          (reservedDate) => reservedDate.getTime() === date.getTime()
        )
      );

      if (hasConflict) {
        alert(
          "El rango seleccionado incluye días ya reservados. Por favor elige otro rango."
        );
        return; // No actualizamos el rango
      }

      // También validamos que la fecha final no sea reservada a menos que sea día de entrada
      const isEndDateReserved = reservedDates.some(
        (d) => d.getTime() === endNorm.getTime()
      );
      const isEndDateStartDate = startDates.some(
        (d) => d.getTime() === endNorm.getTime()
      );

      if (isEndDateReserved && !isEndDateStartDate) {
        alert(
          "No puedes seleccionar la fecha de salida porque está reservada. Por favor elige otra."
        );
        return;
      }
    }

    setDateRange(selection);

    if (
      selection.startDate &&
      selection.endDate &&
      selection.startDate.toDateString() !== selection.endDate.toDateString()
    ) {
      const start = selection.startDate.toISOString();
      const end = selection.endDate.toISOString();

      setStartDate(start);
      setEndDate(end);

      if (onDateRangeSelect) {
        onDateRangeSelect(selection.startDate, selection.endDate);
      }
      if (onDateRangeSetInUrl) {
        onDateRangeSetInUrl(start, end);
      }
    }
  };

  // Renderizado personalizado de días (igual que antes)
  const dayContentRenderer = (date: Date) => {
    const normDate = normalizeDate(date);

    const isReserved = reservedDates.some(
      (d) => d.getTime() === normDate.getTime()
    );
    const isStartDate = startDates.some(
      (d) => d.getTime() === normDate.getTime()
    );

    const previousDay = new Date(normDate);
    previousDay.setDate(previousDay.getDate() - 1);
    const isPreviousDayReserved = reservedDates.some(
      (d) => d.getTime() === previousDay.getTime()
    );

    const isSelected =
      dateRange.startDate &&
      dateRange.endDate &&
      date >= dateRange.startDate &&
      date <= dateRange.endDate;

    const style: React.CSSProperties = {
      width: 36,
      height: 36,
      lineHeight: "36px",
      borderRadius: "50%",
      textAlign: "center",
      margin: "auto",
      userSelect: "none",
      cursor: "pointer",
      backgroundColor: isSelected ? "#c7d2fe" : undefined,
      color: isReserved ? "#7f1d1d" : isSelected ? "#1e3a8a" : "#111827",
      fontWeight: isSelected ? "bold" : "normal",
      border: undefined,
      opacity: 1,
    };

    // Día de entrada con día anterior libre: borde azul + fondo rojo
    if (isReserved && isStartDate && !isPreviousDayReserved) {
      style.border = "2px solid #2563eb"; // azul
      style.backgroundColor = "#fca5a5"; // rojo
      style.color = "#7f1d1d";
    }

    // Fechas reservadas normales
    if (isReserved && (!isStartDate || isPreviousDayReserved)) {
      style.backgroundColor = "#fca5a5"; // rojo
      style.color = "#7f1d1d";
    }

    return <div style={style}>{date.getDate()}</div>;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {!showCalendar ? (
        <button
          onClick={() => setShowCalendar(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Ver fechas disponibles
        </button>
      ) : (
        <button
          onClick={() => setShowCalendar(false)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Ocultar calendario
        </button>
      )}

      {showCalendar && (
        <>
          {dateRange.startDate &&
            dateRange.endDate &&
            dateRange.startDate.toDateString() !==
              dateRange.endDate.toDateString() && (
              <div className="w-full flex flex-col space-y-4 border-[2px] p-4 rounded-lg">
                <div className="flex flex-col space-y-2">
                  <p>
                    <strong>Fecha de entrada:</strong>{" "}
                    {dateRange.startDate?.toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Fecha de salida:</strong>{" "}
                    {dateRange.endDate?.toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => setShowCalendar(false)}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Confirmar fechas
                </button>

                <button
                  onClick={() =>
                    setDateRange({
                      startDate: new Date(),
                      endDate: new Date(),
                      key: "selection",
                    })
                  }
                  className="mt-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                >
                  Elegir otras fechas
                </button>
              </div>
            )}

          <DateRange
            ranges={[dateRange]}
            onChange={handleRangeChange}
            minDate={new Date()}
            months={1}
            direction="horizontal"
            editableDateInputs={true}
            dayContentRenderer={dayContentRenderer}
          />
        </>
      )}
    </div>
  );
};

export default AvailabilityCalendar; */

//Este esta perfecto con todo funcionando bien. Falta lograr que no se muestren fechas reservadas anteriores al dia de hoy.
/* "use client";

import React, { useState } from "react";
import { DateRange, RangeKeyDict, Range } from "react-date-range";
import { useCabinBookedDates } from "../../dashboardAppAdmin/cabinCalendar/hooks/useCabinBookedDates";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface AvailabilityCalendarProps {
  cabinId: string;
  onDateRangeSelect?: (start: Date, end: Date) => void;
  setStartDate: React.Dispatch<React.SetStateAction<string | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<string | null>>;
  onDateRangeSetInUrl?: (startDateStr: string, endDateStr: string) => void;
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  showCalendar: boolean;
}

// 🔧 Normaliza fecha a medianoche LOCAL preservando el día del string/UTC
const normalizeDate = (date: Date | string) => {
  const d = new Date(date);
  // Tomamos los componentes en UTC para evitar el corrimiento por zona horaria
  return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
};

// Genera todas las fechas entre start y end, sin incluir end
const getDatesInRange = (start: Date, end: Date) => {
  const dates: Date[] = [];
  const current = new Date(start);
  while (current < end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

const AvailabilityCalendar = ({
  cabinId,
  onDateRangeSelect,
  setStartDate,
  setEndDate,
  onDateRangeSetInUrl,
  setShowCalendar,
  showCalendar,
}: AvailabilityCalendarProps) => {
  const { events } = useCabinBookedDates(cabinId);

  // Fechas reservadas (rangos) y días de entrada
  const reservedRanges = events.map(({ start, end }) => ({
    start: normalizeDate(start),
    end: normalizeDate(end),
  }));

  // Todas las fechas reservadas (sin incluir el día de salida)
  const reservedDates = reservedRanges.flatMap(({ start, end }) => {
    return getDatesInRange(start, end);
  });

  // Días de entrada normalizados
  const startDates = events.map(({ start }) => normalizeDate(start));

  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleRangeChange = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;

    if (selection.startDate && selection.endDate) {
      const startNorm = normalizeDate(selection.startDate);
      const endNorm = normalizeDate(selection.endDate);

      // Genero todas las fechas dentro del rango seleccionado (sin incluir endDate)
      const datesInSelectedRange = getDatesInRange(startNorm, endNorm);

      // Verifico si hay alguna fecha reservada en ese rango
      const hasConflict = datesInSelectedRange.some((date) =>
        reservedDates.some(
          (reservedDate) => reservedDate.getTime() === date.getTime()
        )
      );

      if (hasConflict) {
        alert(
          "El rango seleccionado incluye días ya reservados. Por favor elige otro rango."
        );
        return; // No actualizamos el rango
      }

      // También validamos que la fecha final no sea reservada a menos que sea día de entrada
      const isEndDateReserved = reservedDates.some(
        (d) => d.getTime() === endNorm.getTime()
      );
      const isEndDateStartDate = startDates.some(
        (d) => d.getTime() === endNorm.getTime()
      );

      if (isEndDateReserved && !isEndDateStartDate) {
        alert(
          "No puedes seleccionar la fecha de salida porque está reservada. Por favor elige otra."
        );
        return;
      }
    }

    setDateRange(selection);

    if (
      selection.startDate &&
      selection.endDate &&
      selection.startDate.toDateString() !== selection.endDate.toDateString()
    ) {
      const start = selection.startDate.toISOString();
      const end = selection.endDate.toISOString();

      setStartDate(start);
      setEndDate(end);

      if (onDateRangeSelect) {
        onDateRangeSelect(selection.startDate, selection.endDate);
      }
      if (onDateRangeSetInUrl) {
        onDateRangeSetInUrl(start, end);
      }
    }
  };

  // Renderizado personalizado de días (igual que antes)
  const dayContentRenderer = (date: Date) => {
    const normDate = normalizeDate(date);

    const isReserved = reservedDates.some(
      (d) => d.getTime() === normDate.getTime()
    );
    const isStartDate = startDates.some(
      (d) => d.getTime() === normDate.getTime()
    );

    const previousDay = new Date(normDate);
    previousDay.setDate(previousDay.getDate() - 1);
    const isPreviousDayReserved = reservedDates.some(
      (d) => d.getTime() === previousDay.getTime()
    );

    const isSelected =
      dateRange.startDate &&
      dateRange.endDate &&
      date >= dateRange.startDate &&
      date <= dateRange.endDate;

    const style: React.CSSProperties = {
      width: 36,
      height: 36,
      lineHeight: "36px",
      borderRadius: "50%",
      textAlign: "center",
      margin: "auto",
      userSelect: "none",
      cursor: "pointer",
      backgroundColor: isSelected ? "#c7d2fe" : undefined,
      color: isReserved ? "#7f1d1d" : isSelected ? "#1e3a8a" : "#111827",
      fontWeight: isSelected ? "bold" : "normal",
      border: undefined,
      opacity: 1,
    };

    // Día de entrada con día anterior libre: borde azul + fondo rojo
    if (isReserved && isStartDate && !isPreviousDayReserved) {
      style.border = "2px solid #2563eb"; // azul
      style.backgroundColor = "#fca5a5"; // rojo
      style.color = "#7f1d1d";
    }

    // Fechas reservadas normales
    if (isReserved && (!isStartDate || isPreviousDayReserved)) {
      style.backgroundColor = "#fca5a5"; // rojo
      style.color = "#7f1d1d";
    }

    return <div style={style}>{date.getDate()}</div>;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {!showCalendar ? (
        <button
          onClick={() => setShowCalendar(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Ver fechas disponibles
        </button>
      ) : (
        <button
          onClick={() => setShowCalendar(false)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Ocultar calendario
        </button>
      )}

      {showCalendar && (
        <>
          {dateRange.startDate &&
            dateRange.endDate &&
            dateRange.startDate.toDateString() !==
              dateRange.endDate.toDateString() && (
              <div className="w-full flex flex-col space-y-4 border-[2px] p-4 rounded-lg">
                <div className="flex flex-col space-y-2">
                  <p>
                    <strong>Fecha de entrada:</strong>{" "}
                    {dateRange.startDate?.toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Fecha de salida:</strong>{" "}
                    {dateRange.endDate?.toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => setShowCalendar(false)}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Confirmar fechas
                </button>

                <button
                  onClick={() =>
                    setDateRange({
                      startDate: new Date(),
                      endDate: new Date(),
                      key: "selection",
                    })
                  }
                  className="mt-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                >
                  Elegir otras fechas
                </button>
              </div>
            )}

          <DateRange
            ranges={[dateRange]}
            onChange={handleRangeChange}
            minDate={new Date()}
            months={1}
            direction="horizontal"
            editableDateInputs={true}
            dayContentRenderer={dayContentRenderer}
          />
        </>
      )}

      <div className="w-full flex flex-wrap gap-4 mt-4 items-center justify-start text-sm">
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              backgroundColor: "#fca5a5",
              border: "2px solid #2563eb",
            }}
          />
          <span>Día de salida disponible</span>
        </div>

      
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              backgroundColor: "#fca5a5",
            }}
          />
          <span>Día reservado</span>
        </div>

       
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              backgroundColor: "#c7d2fe",
            }}
          />
          <span>Día seleccionado</span>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar; */

"use client";

import React, { useState } from "react";
import { DateRange, RangeKeyDict, Range } from "react-date-range";
import { useCabinBookedDates } from "../../dashboardAppAdmin/cabinCalendar/hooks/useCabinBookedDates";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface AvailabilityCalendarProps {
  cabinId: string;
  onDateRangeSelect?: (start: Date, end: Date) => void;
  setStartDate: React.Dispatch<React.SetStateAction<string | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<string | null>>;
  onDateRangeSetInUrl?: (startDateStr: string, endDateStr: string) => void;
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  showCalendar: boolean;
}

// 🔧 Normaliza fecha a medianoche LOCAL preservando el día del string/UTC
const normalizeDate = (date: Date | string) => {
  const d = new Date(date);
  return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
};

// Genera todas las fechas entre start y end, sin incluir end
const getDatesInRange = (start: Date, end: Date) => {
  const dates: Date[] = [];
  const current = new Date(start);
  while (current < end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

const AvailabilityCalendar = ({
  cabinId,
  onDateRangeSelect,
  setStartDate,
  setEndDate,
  onDateRangeSetInUrl,
  setShowCalendar,
  showCalendar,
}: AvailabilityCalendarProps) => {
  const { events } = useCabinBookedDates(cabinId);

  const today = normalizeDate(new Date());

  // Fechas reservadas (rangos) y días de entrada
  const reservedRanges = events.map(({ start, end }) => ({
    start: normalizeDate(start),
    end: normalizeDate(end),
  }));

  // Todas las fechas reservadas (sin incluir el día de salida) a partir de hoy
  const reservedDates = reservedRanges
    .flatMap(({ start, end }) => getDatesInRange(start, end))
    .filter((date) => date >= today);

  // Días de entrada normalizados a partir de hoy
  const startDates = events
    .map(({ start }) => normalizeDate(start))
    .filter((date) => date >= today);

  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleRangeChange = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;

    if (selection.startDate && selection.endDate) {
      const startNorm = normalizeDate(selection.startDate);
      const endNorm = normalizeDate(selection.endDate);

      const datesInSelectedRange = getDatesInRange(startNorm, endNorm);

      const hasConflict = datesInSelectedRange.some((date) =>
        reservedDates.some(
          (reservedDate) => reservedDate.getTime() === date.getTime()
        )
      );

      if (hasConflict) {
        alert(
          "El rango seleccionado incluye días ya reservados. Por favor elige otro rango."
        );
        return;
      }

      const isEndDateReserved = reservedDates.some(
        (d) => d.getTime() === endNorm.getTime()
      );
      const isEndDateStartDate = startDates.some(
        (d) => d.getTime() === endNorm.getTime()
      );

      if (isEndDateReserved && !isEndDateStartDate) {
        alert(
          "No puedes seleccionar la fecha de salida porque está reservada. Por favor elige otra."
        );
        return;
      }
    }

    setDateRange(selection);

    if (
      selection.startDate &&
      selection.endDate &&
      selection.startDate.toDateString() !== selection.endDate.toDateString()
    ) {
      const start = selection.startDate.toISOString();
      const end = selection.endDate.toISOString();

      setStartDate(start);
      setEndDate(end);

      if (onDateRangeSelect)
        onDateRangeSelect(selection.startDate, selection.endDate);
      if (onDateRangeSetInUrl) onDateRangeSetInUrl(start, end);
    }
  };

  const dayContentRenderer = (date: Date) => {
    const normDate = normalizeDate(date);
    const isPast = normDate < today;

    const isReserved = reservedDates.some(
      (d) => d.getTime() === normDate.getTime()
    );
    const isStartDate = startDates.some(
      (d) => d.getTime() === normDate.getTime()
    );

    const previousDay = new Date(normDate);
    previousDay.setDate(previousDay.getDate() - 1);
    const isPreviousDayReserved = reservedDates.some(
      (d) => d.getTime() === previousDay.getTime()
    );

    const isSelected =
      dateRange.startDate &&
      dateRange.endDate &&
      date >= dateRange.startDate &&
      date <= dateRange.endDate;

    const style: React.CSSProperties = {
      width: 36,
      height: 36,
      lineHeight: "36px",
      borderRadius: "50%",
      textAlign: "center",
      margin: "auto",
      userSelect: "none",
      cursor: isPast ? "not-allowed" : "pointer",
      backgroundColor: isSelected ? "#c7d2fe" : undefined,
      color: isPast
        ? "#9ca3af"
        : isReserved
        ? "#7f1d1d"
        : isSelected
        ? "#1e3a8a"
        : "#111827",
      fontWeight: isSelected ? "bold" : "normal",
      border: undefined,
      opacity: 1,
    };

    // Día de entrada con día anterior libre: borde azul + fondo rojo
    if (!isPast && isReserved && isStartDate && !isPreviousDayReserved) {
      style.border = "2px solid #2563eb"; // azul
      style.backgroundColor = "#fca5a5"; // rojo
      style.color = "#7f1d1d";
    }

    // Fechas reservadas normales
    if (!isPast && isReserved && (!isStartDate || isPreviousDayReserved)) {
      style.backgroundColor = "#fca5a5"; // rojo
      style.color = "#7f1d1d";
    }

    return <div style={style}>{date.getDate()}</div>;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {!showCalendar ? (
        <button
          onClick={() => setShowCalendar(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Ver fechas disponibles
        </button>
      ) : (
        <button
          onClick={() => setShowCalendar(false)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Ocultar calendario
        </button>
      )}

      {showCalendar && (
        <>
          {dateRange.startDate &&
            dateRange.endDate &&
            dateRange.startDate.toDateString() !==
              dateRange.endDate.toDateString() && (
              <div className="w-full flex flex-col space-y-4 border-[2px] p-4 rounded-lg">
                <div className="flex flex-col space-y-2">
                  <p>
                    <strong>Fecha de entrada:</strong>{" "}
                    {dateRange.startDate?.toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Fecha de salida:</strong>{" "}
                    {dateRange.endDate?.toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => setShowCalendar(false)}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Confirmar fechas
                </button>

                <button
                  onClick={() =>
                    setDateRange({
                      startDate: new Date(),
                      endDate: new Date(),
                      key: "selection",
                    })
                  }
                  className="mt-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                >
                  Elegir otras fechas
                </button>
              </div>
            )}

          <DateRange
            ranges={[dateRange]}
            onChange={handleRangeChange}
            minDate={today}
            months={1}
            direction="horizontal"
            editableDateInputs={true}
            dayContentRenderer={dayContentRenderer}
          />

          <div className="w-full flex flex-wrap gap-4 mt-2 items-center justify-start text-sm">
            {/* Día disponible */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  border: "1px solid #d1d5db", // gris clarito
                }}
              />
              <span>Día disponible</span>
            </div>

            {/* Día de salida posible */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "#fca5a5",
                  border: "2px solid #2563eb",
                }}
              />
              <span>Día de salida disponible</span>
            </div>

            {/* Día reservado normal */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "#fca5a5",
                }}
              />
              <span>Día reservado</span>
            </div>

            {/* Día seleccionado */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "#c7d2fe",
                }}
              />
              <span>Día seleccionado</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AvailabilityCalendar;
