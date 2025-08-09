/* "use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

export default function NewBookingPage() {
  const searchParams = useSearchParams();

  const cabinId = searchParams.get("cabinId");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const user = useAuthStore((state) => state.user);
  const userId = user?.id;

  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Datos obtenidos de la URL:");
    console.log({ cabinId, startDate, endDate, userId });
  }, [cabinId, startDate, endDate, userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cabinId || !userId || !startDate || !endDate) {
      setError("Faltan datos para completar la reserva.");
      console.warn("Datos incompletos:", {
        cabinId,
        userId,
        startDate,
        endDate,
      });
      return;
    }

    setLoading(true);
    setFeedback("");
    setError("");

    try {
      console.log("Enviando datos al backend...");
      const response = await axios.post("http://localhost:5000/api/bookings", {
        cabin: cabinId,
        user: userId,
        startDate,
        endDate,
        numberOfGuests,
      });

      console.log("Reserva creada exitosamente:", response.data);
      setFeedback("¡Reserva realizada con éxito!");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Error de Axios:", err.response?.data || err.message);
        setError("Error del servidor: " + (err.response?.data?.message || err.message));
      } else if (err instanceof Error) {
        console.error("Error general:", err.message);
        setError("Ocurrió un error al realizar la reserva.");
      } else {
        console.error("Error desconocido:", err);
        setError("Ocurrió un error inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Reservar cabaña</h1>

      {error && <p className="text-red-600">{error}</p>}
      {feedback && <p className="text-green-600">{feedback}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Cantidad de huéspedes</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(Number(e.target.value))}
            min={1}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Reservando..." : "Enviar reserva"}
        </button>
      </form>
    </div>
  );
} */

/* "use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useCreateBooking } from "@/features/reservations/new/hooks/useCreateBooking";
import { BookingFormData } from "@/features/reservations/new/types/booking.types";

export default function NewBookingPage() {
  const searchParams = useSearchParams();

  const cabinId = searchParams.get("cabinId");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const user = useAuthStore((state) => state.user);
  const userId = user?.id;

  const [numberOfGuests, setNumberOfGuests] = useState(1);

  const {
    loading,
    feedback,
    error,
    submitBooking,
  } = useCreateBooking();

  useEffect(() => {
    console.log("Datos obtenidos de la URL:");
    console.log({ cabinId, startDate, endDate, userId });
  }, [cabinId, startDate, endDate, userId]);

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

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Reservar cabaña</h1>

      {error && <p className="text-red-600">{error}</p>}
      {feedback && <p className="text-green-600">{feedback}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Cantidad de huéspedes</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(Number(e.target.value))}
            min={1}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Reservando..." : "Enviar reserva"}
        </button>
      </form>
    </div>
  );
} */

/* "use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useCreateBooking } from "@/features/reservations/new/hooks/useCreateBooking";
import { BookingFormData } from "@/features/reservations/new/types/booking.types";
import BookingSuccessModal from "@/components/modals/BookingSuccessModal";

export default function NewBookingPage() {
  const searchParams = useSearchParams();

  const cabinId = searchParams.get("cabinId");
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
      setIsModalOpen(true); // Abre el modal cuando el código de confirmación esté disponible
    }
  }, [confirmationCode]);

  useEffect(() => {
    console.log("Datos obtenidos de la URL:");
    console.log({ cabinId, startDate, endDate, userId });
  }, [cabinId, startDate, endDate, userId]);

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
    <div className="w-full p-4">
      <h1 className="text-xl font-bold text-center my-4">Reservar cabaña</h1>

      {error && <p className="text-red-600">{error}</p>}
      {feedback && <p className="text-green-600">{feedback}</p>}

      <form onSubmit={handleSubmit} className="w-full space-y-4 flex justify-center">
        <div className="w-full sm:w-1/2 lg:w-1/3 xxxl:w-1/4 space-y-5">
          
          <div>
            <label className="block font-medium mb-1">Nombre</label>
            <input type="text" className="w-full p-2 border rounded" value={user?.name || ""} readOnly />
          </div>

          <div>
            <label className="block font-medium mb-1">Apellido</label>
            <input type="text" className="w-full p-2 border rounded" value={user?.lastName || ""} readOnly />
          </div>

          <div> 
            <label className="block font-medium mb-1">Email</label>
            <input type="email" className="w-full p-2 border rounded" value={user?.email || ""} readOnly />
          </div>

          <div>
            <label className="block font-medium mb-1">Cantidad de huéspedes</label>
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
            {loading ? "Reservando..." : "Enviar reserva"}
          </button>
        </div>
        </div>
      </form>

      
      <BookingSuccessModal
        open={isModalOpen}
        onClose={handleCloseModal}
        confirmationCode={confirmationCode || ""}
        cabinName={searchParams.get("cabinName") || ""}
        checkInDate={searchParams.get("startDate") || ""}
        checkOutDate={searchParams.get("endDate") || ""}
        guests={numberOfGuests}
      />
    </div>
  );
}
 */


// Este anadaba perfecto hasta que intento solucionar de no poder usar useParams() dentro de un componente cliente (con "use client")
/* "use client";

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
} */



import { Suspense } from "react";
import NewBookingPageClient from "../../../features/reservations/new/components/NewBookingPageClient";

const NewBookingPage = () => {
  return (
    <Suspense fallback={<div className="p-4 text-center">Cargando formulario...</div>}>
      <NewBookingPageClient />
    </Suspense>
  );
};

export default NewBookingPage;
