"use client";

import React, { useEffect, useState } from "react";
import { BookingResponse } from "../../allBookings/types/allBookingsTypes";
import { getBookingById } from "../services/getBookingById";

interface Props {
  bookingId: string;
  onBack: () => void;
}

const BookingDetailDashboardPage: React.FC<Props> = ({ bookingId, onBack }) => {
  const [booking, setBooking] = useState<BookingResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Formateo las fechas para mostrarlas en la vista
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC", // 👈 esta línea es clave para que no reste horas
    });
  };

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await getBookingById(bookingId);
        setBooking(res.data);
      } catch (error) {
        console.error("Error al cargar la reserva:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) return <p>Cargando detalle...</p>;
  if (!booking) return <p>No se encontró la reserva.</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded p-4 dark:bg-gray-700">
      <button
        onClick={onBack}
        className="text-sm md:text-base text-gray-700 hover:text-black dark:text-white dark:hover:text-gray-200 transition-colors mb-4"
      >
        ← Volver
      </button>

      <h2 className="text-2xl font-bold mb-4">Detalle de la Reserva</h2>
      <p>
        <strong>Cliente:</strong> {booking.clientName}
      </p>
      <p>
        <strong>Email:</strong> {booking.clientEmail}
      </p>
      <p>
        <strong>Teléfono:</strong> {booking.clientPhone}
      </p>
      <p>
        <strong>Cabaña:</strong> {booking.cabinName}
      </p>
      <p>
        <strong>Entrada:</strong> {formatDate(booking.startDate)}
      </p>
      <p>
        <strong>Salida:</strong> {formatDate(booking.endDate)}
      </p>
      <p>
        <strong>Huéspedes:</strong> {booking.numberOfGuests}
      </p>
      <p>
        <strong>Estado:</strong>{" "}
        {`${
          booking.status === "pending"
            ? "Pendiente"
            : booking.status === "confirmed"
            ? "Confirmada"
            : booking.status === "cancelled"
            ? "Cancelada"
            : "Rechazada"
        }`}
      </p>
      <p>
        <strong>Pago:</strong>{" "}
        {`${booking.paymentStatus === "paid" ? "Pagado" : "No pagado"}`}
      </p>
      <p>
        <strong>Mensaje:</strong> {booking.message}
      </p>
      <p>
        <strong>Total:</strong> ${booking.totalPrice}
      </p>
      <p>
        <strong>Código de confirmación:</strong> {booking.confirmationCode}
      </p>

      {/* <button
        onClick={onBack}
        className="mt-4 px-4 py-2 bg-primary text-white rounded"
      >
        Volver al listado
      </button> */}
    </div>
  );
};

export default BookingDetailDashboardPage;
