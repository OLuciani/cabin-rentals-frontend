import axios from "axios";
import { BookingResponse } from "../types/allBookingsTypes";

interface GetAllBookingsResponse {
  success: boolean;
  data: BookingResponse[];
}

export const getAllBookings = async (): Promise<GetAllBookingsResponse> => {
  const response = await axios.get<GetAllBookingsResponse>("/api-proxy/api/bookings", {
    withCredentials: true, // si usás cookies para auth
  });
  return response.data;
};
