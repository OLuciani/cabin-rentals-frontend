import axios from "axios";
import { BookingResponse } from "../../allBookings/types/allBookingsTypes";

export const getBookingById = async (id: string): Promise<{ data: BookingResponse }> => {
  const res = await axios.get(`/api-proxy/api/bookings/${id}`);
  return res.data;
};
