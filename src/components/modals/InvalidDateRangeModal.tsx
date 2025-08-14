"use client";

import React from "react";

interface InvalidDateRangeModalProps {
  onClose: () => void;
}

const InvalidDateRangeModal: React.FC<InvalidDateRangeModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-[90%] max-w-md text-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Seleccioná un rango de fechas válido
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          El rango seleccionado incluye días ya reservados. Por favor elige otro rango.
        </p>
        <button
          onClick={onClose}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

export default InvalidDateRangeModal;