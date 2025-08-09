"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useCreateBooking } from "@/features/reservations/new/hooks/useCreateBooking";
import { BookingFormData } from "@/features/reservations/new/types/booking.types";
import BookingSuccessModal from "@/components/modals/BookingSuccessModal";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function NewBookingPage() {
  const searchParams = useSearchParams();

  const cabinId = searchParams.get("cabinId");
  const cabinName = searchParams.get("cabinName") || "";
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const guestsParam = searchParams.get("guests");
  const guests = guestsParam && !isNaN(Number(guestsParam)) ? Number(guestsParam) : null;

  console.log("Valor de guestParam: ", guestsParam);
  console.log("VALOR DE guests: ",guests);

  console.log(
    "Valores recibidos en searchParams: ",
    cabinId,
    cabinName,
    startDate,
    endDate
  );

  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const userId = user?.id;

  const [numberOfGuests, setNumberOfGuests] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { loading, feedback, error, confirmationCode, submitBooking } =
    useCreateBooking();

  useEffect(() => {
    if(guests ) {
      setNumberOfGuests(guests);
    }
  }, [guests]);

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
      //cabin: cabinId,
      //user: userId,
      cabinId: cabinId,
      userId: userId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      numberOfGuests: numberOfGuests,
    };

    await submitBooking(payload);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onBack = () => {
    //router.push(`/cabins/${cabinId}`);
    router.push(`/cabins`);
  };

  return (
    <div>
      {startDate && endDate ? (
        <div className="w-full bg-white p-4 max-w-3xl mx-auto border border-gray-300 rounded-xl shadow-lg my-4">
          <button
            onClick={onBack}
            className="text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
          >
            ← Volver
          </button>

          <h1 className="text-xl font-bold text-center my-4">
            Confirmar reserva
          </h1>

          {error && <p className="text-red-600 text-center">{error}</p>}
          {feedback && <p className="text-green-600 text-center">{feedback}</p>}

          {/* Resumen de la reserva */}
          <div className="bg-blue-100 p-4 rounded mb-6 space-y-2">
            <h2 className="text-lg text-center font-semibold mb-2">
              Detalles de la reserva
            </h2>
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
          {/* Datos del usuario */}
          <div className="bg-gray-100 p-4 rounded mb-6 space-y-2">
            <h2 className="text-lg text-center font-semibold mb-2">Tus datos</h2>
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
          {/* <div className="bg-blue-100 p-4 rounded mb-6 space-y-2">
            <h2 className="text-lg font-semibold mb-2">
              Detalles de la reserva
            </h2>
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
          </div> */}

          {/* Formulario para elegir cantidad de huéspedes y enviar */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">
                Cantidad de huéspedes
              </label>
              <input
                type="number"
                className="w-44 p-2 border rounded"
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
      ) : (
        <p>Filtrar fechas</p>
      )}
    </div>
  );
}
