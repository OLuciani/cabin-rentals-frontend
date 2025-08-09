/* "use client";

import React from "react";
import { useAllBookings } from "../hooks/useAllBookings";
import { AllBookingsProps } from "../types/allBookingsTypes";

const AllBookings: React.FC<AllBookingsProps> = ({
  onSelectBooking,
  setSection,
}) => {
  const { bookings, loading, error } = useAllBookings();

  // Formateo las fechas para mostrarlas en la vista
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (loading) return <p>Cargando reservas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4">
      <h2 className="text-2xl font-bold mb-4">Todas las Reservas</h2>

      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-sm sm:text-base">
              <th className="p-2 border">Cliente</th>
              <th className="p-2 border">Cabaña</th>
              <th className="p-2 border">Entrada</th>
              <th className="p-2 border">Salida</th>
              <th className="p-2 border">Huéspedes</th>
              <th className="p-2 border">Estado</th>
              <th className="p-2 border">Pago</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Acciones</th> 
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="text-center border-t text-sm sm:text-base"
              >
                <td className="p-2 border">{booking.clientName}</td>
                <td className="p-2 border">{booking.cabinName}</td>
                <td className="p-2 border">{formatDate(booking.startDate)}</td>
                <td className="p-2 border">{formatDate(booking.endDate)}</td>
                <td className="p-2 border">{booking.numberOfGuests}</td>
                <td className="p-2 border">{`${booking.status === "pending" ? "Pendiente" : booking.status === "confirmed" ? "Confirmada" : booking.status === "cancelled" ? "Cancelada" : "Rechazada"}`}</td>
                <td className="p-2 border">{`${booking.paymentStatus === "paid" ? "Pagado" : "No pagado"}`}</td>
                <td className="p-2 border">${booking.totalPrice}</td>
                <td className="p-2 border">
                  <button
                    className="text-blue-500 underline hover:text-blue-700"
                    onClick={() => {
                      onSelectBooking(booking.id); // guarda el ID
                      setSection("bookingDetail"); // cambia de vista
                    }}
                  >
                    Ver detalle
                  </button>
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => {
                      onSelectBooking(booking.id);
                      setSection("editBooking");
                    }}
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBookings; */

/* "use client";

import React from "react";
import { useAllBookings } from "../hooks/useAllBookings";
import { AllBookingsProps } from "../types/allBookingsTypes";
import { useState } from "react";
import { useDeleteBooking } from "../../deleteBooking/hooks/useDeleteBooking";
import DeleteBookingModal from "../../deleteBooking/components/DeleteBookingModal";

const AllBookings: React.FC<AllBookingsProps> = ({
  onSelectBooking,
  setSection,
}) => {
  const { bookings, loading, error } = useAllBookings();

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { handleDelete } = useDeleteBooking();

  // Formateo las fechas para mostrarlas en la vista
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (loading) return <p>Cargando reservas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4">
      <h2 className="text-2xl font-bold mb-4">Todas las Reservas</h2>

      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-sm sm:text-base">
              <th className="p-2 border">Cliente</th>
              <th className="p-2 border">Cabaña</th>
              <th className="p-2 border">Entrada</th>
              <th className="p-2 border">Salida</th>
              <th className="p-2 border">Huéspedes</th>
              <th className="p-2 border">Estado</th>
              <th className="p-2 border">Pago</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Acciones</th> 
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="text-center border-t text-sm sm:text-base"
              >
                <td className="p-2 border">{booking.clientName}</td>
                <td className="p-2 border">{booking.cabinName}</td>
                <td className="p-2 border">{formatDate(booking.startDate)}</td>
                <td className="p-2 border">{formatDate(booking.endDate)}</td>
                <td className="p-2 border">{booking.numberOfGuests}</td>
                <td className="p-2 border">{`${
                  booking.status === "pending"
                    ? "Pendiente"
                    : booking.status === "confirmed"
                    ? "Confirmada"
                    : booking.status === "cancelled"
                    ? "Cancelada"
                    : "Rechazada"
                }`}</td>
                <td className="p-2 border">{`${
                  booking.paymentStatus === "paid" ? "Pagado" : "No pagado"
                }`}</td>
                <td className="p-2 border">${booking.totalPrice}</td>
                <td className="p-2 border">
                  <button
                    className="text-blue-500 underline hover:text-blue-700"
                    onClick={() => {
                      onSelectBooking(booking.id); // guarda el ID
                      setSection("bookingDetail"); // cambia de vista
                    }}
                  >
                    Ver detalle
                  </button>
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => {
                      onSelectBooking(booking.id);
                      setSection("editBooking");
                    }}
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    Editar
                  </button>
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => {
                      setSelectedId(booking.id);
                      setShowModal(true);
                    }}
                    className="text-red-500 underline hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedId && (
        <DeleteBookingModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={async () => {
            await handleDelete(selectedId);
            setShowModal(false);
            // Podés volver a cargar las reservas si querés.
            // location.reload(); // o llamar nuevamente al fetch de reservas
          }}
          bookingId={selectedId}
        />
      )}
    </div>
  );
};

export default AllBookings; */

"use client";

import React, { useEffect } from "react";
import { useAllBookings } from "../hooks/useAllBookings";
import { AllBookingsProps, BookingResponse } from "../types/allBookingsTypes";
import { useState } from "react";
import { useDeleteBooking } from "../../deleteBooking/hooks/useDeleteBooking";
import DeleteBookingModal from "../../deleteBooking/components/DeleteBookingModal";
import { toast } from "react-toastify";

const AllBookings: React.FC<AllBookingsProps> = ({
  onSelectBooking,
  setSection,
}) => {
  const { bookings, loading, error, refetch } = useAllBookings();

  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] =
    useState<BookingResponse | null>(null);
  const { handleDelete } = useDeleteBooking();

  // Este useEffect asegura que el componente se muestre scrolleado al inicio cada vez que se monta en el dashboard src/dashboardAppAdmin/page.tsx.
  useEffect(() => {
    // Intentamos scroll en main y también en body/html por si acaso
    const main = document.getElementById("dashboard-scroll-container");
    if (main) {
      main.scrollTop = 0;
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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

  if (loading) return <p>Cargando reservas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4">
      <h2 className="text-2xl font-bold mb-4">Todas las Reservas</h2>

      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-600 text-sm sm:text-base">
              <th className="p-2 border border-gray-400 dark:border-white">Cliente</th>
              <th className="p-2 border border-gray-400 dark:border-white">Cabaña</th>
              <th className="p-2 border border-gray-400 dark:border-white">Entrada</th>
              <th className="p-2 border border-gray-400 dark:border-white">Salida</th>
              <th className="p-2 border border-gray-400 dark:border-white">Huéspedes</th>
              <th className="p-2 border border-gray-400 dark:border-white">Estado</th>
              <th className="p-2 border border-gray-400 dark:border-white">Pago</th>
              <th className="p-2 border border-gray-400 dark:border-white">Total</th>
              <th className="p-2 border border-gray-400 dark:border-white">Detalles</th>
              <th className="p-2 border border-gray-400 dark:border-white">Editar</th>
              <th className="p-2 border border-gray-400 dark:border-white">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="text-center border-t text-sm sm:text-base"
              >
                <td className="p-2 border border-gray-400 dark:border-white">{booking.clientName}</td>
                <td className="p-2 border border-gray-400 dark:border-white">{booking.cabinName}</td>
                <td className="p-2 border border-gray-400 dark:border-white">{formatDate(booking.startDate)}</td>
                <td className="p-2 border border-gray-400 dark:border-white">{formatDate(booking.endDate)}</td>
                <td className="p-2 border border-gray-400 dark:border-white">{booking.numberOfGuests}</td>
                <td className="p-2 border  border-gray-400 dark:border-white">{`${
                  booking.status === "pending"
                    ? "Pendiente"
                    : booking.status === "confirmed"
                    ? "Confirmada"
                    : booking.status === "cancelled"
                    ? "Cancelada"
                    : "Rechazada"
                }`}</td>
                <td className="p-2 border border-gray-400 dark:border-white">{`${
                  booking.paymentStatus === "paid" ? "Pagado" : "No pagado"
                }`}</td>
                <td className="p-2 border border-gray-400 dark:border-white">${booking.totalPrice}</td>
                <td className="p-2 border border-gray-400 dark:border-white">
                  <button
                    className="text-blue-500 underline hover:text-blue-700"
                    onClick={() => {
                      onSelectBooking(booking.id); // guarda el ID
                      setSection("bookingDetail"); // cambia de vista
                    }}
                  >
                    Ver detalle
                  </button>
                </td>
                <td className="p-2 border border-gray-400 dark:border-white">
                  <button
                    onClick={() => {
                      onSelectBooking(booking.id);
                      setSection("editBooking");
                    }}
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    Editar
                  </button>
                </td>
                <td className="p-2 border border-gray-400 dark:border-white">
                  <button
                    onClick={() => {
                      setSelectedBooking(booking);
                      setShowModal(true);
                    }}
                    className="text-red-500 underline hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedBooking && (
        <DeleteBookingModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={async () => {
            await handleDelete(selectedBooking.id);
            toast.success("Reserva eliminada correctamente");
            setShowModal(false);
            refetch(); // <- lo agregamos en el siguiente paso
          }}
          booking={selectedBooking}
        />
      )}
    </div>
  );
};

export default AllBookings;
