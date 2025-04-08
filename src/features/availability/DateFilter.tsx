"use client"
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale';

const DateFilter = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Manejar el cambio de la fecha de entrada
  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    // Si la fecha de salida es anterior a la de entrada, resetearla
    if (endDate && date && endDate <= date) {
      setEndDate(null);
    }
  };

  return (
    <div className="w-full flex flex-col sm:flex-row gap-4 items-center justify-center bg-[#F5F5F5] dark:bg-darkBackground py-5">
      <div className="dark:bg-darkBackground flex items-center gap-2">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-darkText">Buscar por fechas</h4>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Fecha de entrada */}
        <div className="relative">
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
            locale={es}
            placeholderText="Entrada"
            //className="w-full text-center bg-white text-gray-700 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            className="w-full text-center bg-white dark:bg-gray-800 text-gray-700 dark:text-darkText p-3 border border-gray-400 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

          />
        </div>

        {/* Fecha de salida */}
        <div className="relative">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate ? new Date(startDate.getTime() + 86400000) : new Date()} // Siempre un día después de la entrada
            disabled={!startDate} // Desactiva si no hay fecha de entrada
            dateFormat="dd/MM/yyyy"
            locale={es}
            placeholderText="Salida"
            //className="w-full text-center bg-white text-gray-700 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            className="w-full text-center bg-white dark:bg-gray-800 text-gray-700 dark:text-darkText p-3 border border-gray-400 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

          />
        </div>
      </div>
    </div>
  );
};

export default DateFilter;
