import axios from "axios";

export const deleteBooking = async (bookingId: string) => {
  const response = await axios.delete(
    `/api-proxy/api/bookings/${bookingId}`
  );
  return response.data;
};