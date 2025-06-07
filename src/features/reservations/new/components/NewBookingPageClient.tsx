"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useCreateBooking } from "@/features/reservations/new/hooks/useCreateBooking";
import { BookingFormData } from "@/features/reservations/new/types/booking.types";
import BookingSuccessModal from "@/components/modals/BookingSuccessModal";
import { format } from "date-fns";

export default function NewBookingPage() {
  const searchParams = useSearchParams();

  const cabinId = searchParams.get("cabinId");
  const cabinName = searchParams.get("cabinName") || "";
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const user = useAuthStore((state) => state.user);
  const userId = user?.id;

  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { loading, feedback, error, confirmationCode, submitBooking } =
    useCreateBooking();

  useEffect(() => {
    if (confirmationCode) {
      setIsModalOpen(true);
    }
  }, [confirmationCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cabinId || !userId || !startDate || !endDate) {
      console.warn("Datos incompletos:", {
        cabinId,
        userId,
        startDate,
        endDate,
      });
      return;
    }

    const payload: BookingFormData = {
      cabin: cabinId,
      user: userId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      numberOfGuests,
    };

    await submitBooking(payload);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full p-4 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold text-center my-4">Confirmar reserva</h1>

      {error && <p className="text-red-600 text-center">{error}</p>}
      {feedback && <p className="text-green-600 text-center">{feedback}</p>}

      {/* Datos del usuario */}
      <div className="bg-gray-100 p-4 rounded mb-6 space-y-2">
        <h2 className="text-lg font-semibold mb-2">Tus datos</h2>
        <p>
          <strong>Nombre:</strong> {user?.name || "No disponible"}
        </p>
        <p>
          <strong>Apellido:</strong> {user?.lastName || "No disponible"}
        </p>
        <p>
          <strong>Email:</strong> {user?.email || "No disponible"}
        </p>
      </div>

      {/* Resumen de la reserva */}
      <div className="bg-blue-50 p-4 rounded mb-6 space-y-2">
        <h2 className="text-lg font-semibold mb-2">Detalles de la reserva</h2>
        <p>
          <strong>Cabaña:</strong> {cabinName}
        </p>
        <p>
          <strong>Fecha de entrada:</strong>{" "}
          {startDate ? format(new Date(startDate), "dd/MM/yyyy") : ""}
        </p>
        <p>
          <strong>Fecha de salida:</strong>{" "}
          {endDate ? format(new Date(endDate), "dd/MM/yyyy") : ""}
        </p>
        <p>
          <strong>Huéspedes:</strong> {numberOfGuests}
        </p>
      </div>

      {/* Formulario para elegir cantidad de huéspedes y enviar */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">
            Cantidad de huéspedes
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(Number(e.target.value))}
            min={1}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full sm:w-1/2 bg-blue-600 text-white text-lg py-2 px-4 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Reservando..." : "Confirmar reserva"}
          </button>
        </div>
      </form>

      {/* Modal de confirmación */}
      <BookingSuccessModal
        open={isModalOpen}
        onClose={handleCloseModal}
        confirmationCode={confirmationCode || ""}
        cabinName={cabinName}
        checkInDate={startDate || ""}
        checkOutDate={endDate || ""}
        guests={numberOfGuests}
      />
    </div>
  );
}