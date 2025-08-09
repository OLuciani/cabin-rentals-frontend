/* import { useEffect, useState } from "react";
import { BookingResponse } from "../types/allBookingsTypes";
import { getAllBookings } from "../services/getAllBookings";



export const useAllBookings = () => {
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await getAllBookings();
        setBookings(res.data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar las reservas");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return { bookings, loading, error };
}; */



import { useEffect, useState } from "react";
import { getAllBookings } from "../services/getAllBookings";
import { BookingResponse } from "../../allBookings/types/allBookingsTypes";

export const useAllBookings = () => {
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await getAllBookings();
      setBookings(response.data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar las reservas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return {
    bookings,
    loading,
    error,
    refetch: fetchBookings, // 🔁 esto permite recargar desde fuera
  };
};
