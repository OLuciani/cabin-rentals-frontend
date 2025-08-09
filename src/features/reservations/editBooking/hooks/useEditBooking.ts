import { useState } from "react";
import { EditBookingPayload } from "../types/editBookingTypes";
import { updateBooking } from "../services/editBookingService";

export const useEditBooking = (bookingId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const editBooking = async (data: EditBookingPayload) => {
    try {
      setLoading(true);
      setError(null);
      await updateBooking(bookingId, data);
      setSuccess(true);
    } catch (err) {
        console.log("Error al actualizar la reserva: ", err)
      setError("Error al actualizar la reserva");
    } finally {
      setLoading(false);
    }
  };

  return { editBooking, loading, error, success };
};