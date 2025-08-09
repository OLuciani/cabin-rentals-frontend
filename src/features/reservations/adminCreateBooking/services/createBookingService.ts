import axios from "axios";
import { IAdminCreateBooking } from "../types/adminBookingTypes";

export const createAdminBooking = async (data: IAdminCreateBooking) => {
  const response = await axios.post("/api-proxy/api/bookings", data);
  return response.data;
};
