"use client"

import { useState } from "react";
import { createBooking } from "../services/createBooking"; // Importa la función de crear reserva
import { BookingFormData } from "../types/booking.types";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

export const useCreateBooking = () => {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);  // Nuevo estado para el código de confirmación
 
  const router = useRouter();

  const submitBooking = async (payload: BookingFormData) => {
    setLoading(true);
    setFeedback("");
    setError("");
    setConfirmationCode(null);  // Resetea el código de confirmación antes de realizar la reserva

    try {
      // Usamos la función createBooking que hace la solicitud a la API
      const response = await createBooking(payload);
      
      // Si la respuesta tiene éxito, se guarda el código de confirmación
      if (response.success) {
        setFeedback("¡Reserva realizada con éxito!");
        setConfirmationCode(response.confirmationCode);  // Establece el código de confirmación

        toast.success("¡Reserva realizada con éxito!"); 
        setTimeout(() => {   
            router.push("/"); // Una vez que se crea exitosamente la reserva se redirige a home.
        }, 4000);
      } else {
        setError("Error al realizar la reserva.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Ocurrió un error al realizar la reserva.");
      } else {
        setError("Ocurrió un error inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    feedback,
    error,
    confirmationCode,  // Ahora retornamos el código de confirmación
    submitBooking,
  };
};
