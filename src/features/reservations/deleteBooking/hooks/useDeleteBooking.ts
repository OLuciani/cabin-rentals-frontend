import { useState } from "react";
import { deleteBooking } from "../services/deleteBookingById";

export const useDeleteBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleDelete = async (bookingId: string) => {
    try {
      setLoading(true);
      setError(null);
      await deleteBooking(bookingId);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Error al eliminar la reserva");
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, loading, error, success };
};