import axios from "axios";
import { EditBookingPayload } from "../types/editBookingTypes";

export const updateBooking = async (
  bookingId: string,
  data: EditBookingPayload
) => {
  const res = await axios.put(`/api-proxy/api/bookings/${bookingId}`, data);
  return res.data;
};