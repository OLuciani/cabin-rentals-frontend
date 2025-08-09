"use client";

import React from "react";
import { DeleteBookingModalProps } from "../types/deleteBookingTypes";

const DeleteBookingModal: React.FC<DeleteBookingModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  booking,
}) => {
  if (!isOpen) return null;

  const { clientName, cabinName, startDate, endDate } = booking;

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center text-red-600">
          ¿Eliminar esta reserva?
        </h2>
        <p className="text-center mb-6">
          <span className="block">Cliente: <strong>{clientName}</strong></span>
          <span className="block">Cabaña: <strong>{cabinName}</strong></span>
          <span className="block">Entrada: <strong>{formatDate(startDate)}</strong></span>
          <span className="block">Salida: <strong>{formatDate(endDate)}</strong></span>
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Eliminar reserva
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBookingModal;
