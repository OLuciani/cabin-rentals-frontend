/* "use client";
import { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale';

const DateFilter = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    if (endDate && date && endDate <= date) {
      setEndDate(null);
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 items-center justify-center bg-[#F5F5F5] dark:bg-darkBackground py-5">
      <div className="flex items-center gap-2">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-darkText">Buscar por fechas</h4>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        
        <div className="relative">
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
            locale={es}
            placeholderText="Entrada"
            className="w-[300px] lg:w-[206.4px] h-[49.6px] text-center bg-white dark:bg-gray-800 text-gray-700 dark:text-darkText p-3 border border-gray-400 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <div className="relative">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate ? new Date(startDate.getTime() + 86400000) : new Date()}
            disabled={!startDate}
            dateFormat="dd/MM/yyyy"
            locale={es}
            placeholderText="Salida"
            className="w-[300px] lg:w-[206.4px] h-[49.6px] text-center bg-white dark:bg-gray-800 text-gray-700 dark:text-darkText p-3 border border-gray-400 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

    
      <div className="flex items-center">
        <button
          // onClick={handleBuscar}
          className="w-[300px] lg:w-[206.4px] h-[49.6px] bg-accent hover:bg-darkAccent text-white font-bold py-2 px-4 rounded-lg"
        >
          Buscar disponibilidad
        </button>
      </div>
    </div>
  );
};

export default DateFilter; */

/* "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import { es } from "date-fns/locale";

import "react-datepicker/dist/react-datepicker.css";

const DateFilter = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const router = useRouter();

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    if (endDate && date && endDate <= date) {
      setEndDate(null);
    }
  };

  const handleSearch = () => {
    if (!startDate || !endDate) return;

    const start = startDate.toISOString().split("T")[0];
    const end = endDate.toISOString().split("T")[0];

      // 👉 Log para verificar las fechas
  console.log("Fechas seleccionadas:", { start, end });

    router.push(`/cabins?start=${start}&end=${end}`);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 items-center justify-center bg-[#F5F5F5] dark:bg-darkBackground py-5">
      <div className="flex items-center gap-2">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-darkText">
          Buscar por fechas
        </h4>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        
        <div className="relative">
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
            locale={es}
            placeholderText="Entrada"
            className="w-[300px] lg:w-[206.4px] h-[49.6px] text-center bg-white dark:bg-gray-800 text-gray-700 dark:text-darkText p-3 border border-gray-400 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <div className="relative">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={
              startDate ? new Date(startDate.getTime() + 86400000) : new Date()
            }
            disabled={!startDate}
            dateFormat="dd/MM/yyyy"
            locale={es}
            placeholderText="Salida"
            className="w-[300px] lg:w-[206.4px] h-[49.6px] text-center bg-white dark:bg-gray-800 text-gray-700 dark:text-darkText p-3 border border-gray-400 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      
      <div className="flex items-center">
        <button
          onClick={handleSearch}
          className="w-[300px] lg:w-[206.4px] h-[49.6px] bg-accent hover:bg-darkAccent text-white font-bold py-2 px-4 rounded-lg"
        >
          Buscar disponibilidad
        </button>
      </div>
    </div>
  );
};

export default DateFilter; */

/* 'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DateFilter = () => {
  const router = useRouter();
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);

  const handleBuscar = () => {
    const formattedDateRange = {
      startDate: dateRange[0].startDate.toISOString(),
      endDate: dateRange[0].endDate.toISOString(),
    };

    router.push(
      `/cabins?startDate=${formattedDateRange.startDate}&endDate=${formattedDateRange.endDate}`
    );
  };

  return (
    <div className="w-full max-w-[900px] mx-auto px-4 py-6 flex flex-col lg:flex-row items-center gap-4 bg-white dark:bg-gray-900 rounded-xl shadow-md relative">
      
      <div className="flex flex-col w-full lg:w-[280px] relative">
        <label className="text-sm text-gray-700 dark:text-darkText mb-1 ml-1">Fechas</label>
        <input
          readOnly
          value={`${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`}
          onClick={() => setShowCalendar(!showCalendar)}
          className="cursor-pointer w-full h-[44px] bg-white dark:bg-gray-800 text-gray-700 dark:text-darkText p-2 border border-gray-400 dark:border-gray-600 rounded-md"
        />

        
        {showCalendar && (
          <div className="absolute top-[95px] z-20 shadow-lg rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
            <DateRange
              editableDateInputs={true}
              onChange={(item) =>
                setDateRange([
                  {
                    startDate: item.selection.startDate ?? new Date(),
                    endDate: item.selection.endDate ?? new Date(),
                    key: 'selection',
                  },
                ])
              }
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              rangeColors={['#4F46E5']}
              minDate={new Date()} // ⛔ evita fechas pasadas
              months={2} // 📆 muestra dos meses
              direction="horizontal"
            />
          </div>
        )}
      </div>

      
      <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto">
        
        <div className="flex flex-col flex-1">
          <label className="text-sm text-gray-700 dark:text-darkText mb-1 ml-1">Huéspedes</label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full h-[44px] text-center bg-white dark:bg-gray-800 text-gray-700 dark:text-darkText p-2 border border-gray-400 dark:border-gray-600 rounded-md"
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

       
        <div className="flex flex-col flex-1">
          <label className="text-sm text-gray-700 dark:text-darkText mb-1 ml-1">Habitaciones</label>
          <select
            value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}
            className="w-full h-[44px] text-center bg-white dark:bg-gray-800 text-gray-700 dark:text-darkText p-2 border border-gray-400 dark:border-gray-600 rounded-md"
          >
            {Array.from({ length: 5 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      
      <button
        onClick={handleBuscar}
        className="w-full lg:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-200"
      >
        Buscar
      </button>
    </div>
  );
};

export default DateFilter; */

/* 'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DateFilter = () => {
  const router = useRouter();
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
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
    <div className='w-full flex justify-center items-center'>
      <div className="w-full md:w-auto my-6 px-4 py-6 flex flex-col md:flex-row items-center justify-center gap-4 bg-white dark:bg-gray-900 rounded-xl shadow-md relative">
        
       
        <div className="flex flex-col w-full md:w-auto relative">
          <label className="text-sm text-gray-700 dark:text-darkText mb-1 ml-1">Fechas</label>
          <input
            readOnly
            value={`${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`}
            onClick={() => setShowCalendar(!showCalendar)}
            className="cursor-pointer w-full h-[44px] text-center bg-white dark:bg-gray-800 text-gray-700 dark:text-darkText p-2 border border-gray-400 dark:border-gray-600 rounded-md"
          />

          {showCalendar && (
            <div className="absolute w-auto top-[95px] z-20 shadow-lg rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
              <DateRange
                editableDateInputs={true}
                onChange={(item) =>
                  setDateRange([
                    {
                      startDate: item.selection.startDate ?? new Date(),
                      endDate: item.selection.endDate ?? new Date(),
                      key: 'selection',
                    },
                  ])
                }
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                rangeColors={['#4F46E5']}
                minDate={new Date()}
                months={2}
                direction="horizontal"
              />
            </div>
          )}
        </div>

      
        <div className="w-full md:w-auto flex flex-row gap-4">
          <div className="flex flex-col flex-1">
            <label className="text-sm text-gray-700 dark:text-darkText mb-1 ml-1">Huéspedes</label>
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
            <label className="text-sm text-gray-700 dark:text-darkText mb-1 ml-1">Habitaciones</label>
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

   
        <button
          onClick={handleBuscar}
          className="w-full mt-[18px] md:w-[100px] px-6 h-[46px] bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-200 items-center justify-center"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default DateFilter; */

//Este funciona bien pero no se ve bien el calendario doble en dispositivos moviles
/* 'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DateFilter = () => {
  const router = useRouter();
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
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
    <div className='w-full flex justify-center items-center'>
      <div className="w-full md:w-auto my-6 px-4 py-6 flex flex-col md:flex-row items-center justify-center gap-4 bg-white dark:bg-gray-900 rounded-xl shadow-md relative">
        
       
        <div className="flex flex-col w-full md:w-auto relative">
          <label className="text-sm text-gray-700 dark:text-darkText mb-1 ml-1">Fechas</label>
          <input
            readOnly
            value={`${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`}
            onClick={() => setShowCalendar(!showCalendar)}
            className="cursor-pointer w-full h-[44px] text-center bg-white dark:bg-gray-800 text-gray-700 dark:text-darkText p-2 border border-gray-400 dark:border-gray-600 rounded-md"
          />

          {showCalendar && (
            <div className="absolute w-auto top-[95px] z-20 shadow-lg rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
              <DateRange
                editableDateInputs={true}
                onChange={(item) =>
                  setDateRange([{
                    startDate: item.selection.startDate ?? new Date(),
                    endDate: item.selection.endDate ?? new Date(),
                    key: 'selection',
                  }])
                }
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                rangeColors={['#4F46E5']}
                minDate={new Date()}
                months={2}
                direction="horizontal"
              />
            </div>
          )}
        </div>

      
        <div className="w-full md:w-auto flex flex-row gap-4">
          <div className="flex flex-col flex-1">
            <label className="text-sm text-gray-700 dark:text-darkText mb-1 ml-1">Huéspedes</label>
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
            <label className="text-sm text-gray-700 dark:text-darkText mb-1 ml-1">Habitaciones</label>
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

export default DateFilter; */




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
      <div className="w-full md:w-auto my-6 py-6 px-4 flex flex-col md:flex-row items-center justify-center gap-4 bg-white dark:bg-gray-900 rounded-xl shadow-md relative">
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
