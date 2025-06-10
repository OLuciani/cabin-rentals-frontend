"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DateRange } from "react-date-range";
import { useMediaQuery } from "react-responsive";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateFilter = () => {
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);

  const handleBuscar = () => {
    const formattedDateRange = {
      startDate: dateRange[0].startDate.toISOString(),
      endDate: dateRange[0].endDate.toISOString(),
    };

    const queryParams = new URLSearchParams({
      startDate: formattedDateRange.startDate,
      endDate: formattedDateRange.endDate,
      guests: guests.toString(),
      rooms: rooms.toString(),
    });

    router.push(`/cabins?${queryParams.toString()}`);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full md:w-auto my-5 mx-4 md:mx-0 p-4 flex border-gray-200 border-[2px] flex-col md:flex-row items-center justify-center gap-4 bg-white dark:bg-gray-900 rounded-xl shadow-md relative">
        {/* Fecha */}
        <div className="flex flex-col w-full md:w-auto ">
          <label className="text-sm text-gray-700 dark:text-darkText mb-1 ml-1">
            Fechas
          </label>
          <input
            readOnly
            value={`${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`}
            onClick={() => setShowCalendar(!showCalendar)}
            className="cursor-pointer w-full h-[44px] text-center bg-white dark:bg-gray-800 text-gray-700 dark:text-darkText p-2 border border-gray-400 dark:border-gray-600 rounded-md"
          />
          {showCalendar && (
            <div
              className={`absolute top-[95px] z-20 left-1/2 transform -translate-x-1/2`}
            >
              <div className="flex justify-center px-0">
                <div className={`w-full ${isMobile ? "w-full" : "sm:w-auto"}`}>
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) =>
                      setDateRange([
                        {
                          startDate: item.selection.startDate ?? new Date(),
                          endDate: item.selection.endDate ?? new Date(),
                          key: "selection",
                        },
                      ])
                    }
                    moveRangeOnFirstSelection={false}
                    ranges={dateRange}
                    rangeColors={["#4F46E5"]}
                    minDate={new Date()}
                    months={isMobile ? 1 : 2}
                    direction={isMobile ? "vertical" : "horizontal"}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Huéspedes y Habitaciones */}
        <div className="w-full md:w-auto flex flex-row gap-4">
          <div className="flex flex-col flex-1">
            <label className="text-sm text-gray-700 dark:text-darkText mb-1 ml-1">
              Huéspedes
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="md:w-[100px] h-[44px] text-center bg-white dark:bg-gray-800 text-gray-700 dark:text-darkText p-2 border border-gray-400 dark:border-gray-600 rounded-md"
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col flex-1">
            <label className="text-sm text-gray-700 dark:text-darkText mb-1 ml-1">
              Habitaciones
            </label>
            <select
              value={rooms}
              onChange={(e) => setRooms(Number(e.target.value))}
              className="md:w-[100px] h-[44px] text-center bg-white dark:bg-gray-800 text-gray-700 dark:text-darkText p-2 border border-gray-400 dark:border-gray-600 rounded-md"
            >
              {Array.from({ length: 5 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botón */}
        <div className="w-full md:w-auto pt-[24px]">
          <button
            onClick={handleBuscar}
            className="w-full md:w-[100px] h-[44px] px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-200 flex items-center justify-center"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateFilter;
