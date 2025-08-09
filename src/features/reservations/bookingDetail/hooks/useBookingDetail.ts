// features/reservations/bookingDetail/hooks/useBookingDetail.ts
import { useEffect, useState } from "react";
import { getBookingById } from "../services/getBookingById";
import { BookingDetail } from "../types/bookingDetailTypes";

export const useBookingDetail = (bookingId: string) => {
  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        const res = await getBookingById(bookingId);
        setBooking(res.data);
      } catch (err) {
        console.error("Error al obtener la reserva:", err);
        setError("Error al obtener la reserva");
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) fetchBooking();
  }, [bookingId]);

  return { booking, loading, error };
};
