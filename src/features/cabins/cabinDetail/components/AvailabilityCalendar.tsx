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

  /* const [showCalendar, setShowCalendar] = useState(false); */

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
          {/* Solo mostrar si hay un rango válido */}
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

export default AvailabilityCalendar;
