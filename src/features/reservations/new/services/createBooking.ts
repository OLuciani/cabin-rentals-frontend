import axios from "axios";
import { BookingFormData } from "../types/booking.types";

export const createBooking = async (payload: BookingFormData) => {
  const response = await axios.post("/api-proxy/api/bookings", {
    ...payload,
    startDate: payload.startDate.toISOString(),
    endDate: payload.endDate.toISOString(),
  });
  return response.data;
};
