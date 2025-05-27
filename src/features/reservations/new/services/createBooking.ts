import axios from "axios";
import { BookingFormData } from "../types/booking.types";

export const createBooking = async (payload: BookingFormData) => {
  const response = await axios.post("http://localhost:5000/api/bookings", {
    ...payload,
    startDate: payload.startDate.toISOString(),
    endDate: payload.endDate.toISOString(),
  });
  return response.data;
};
