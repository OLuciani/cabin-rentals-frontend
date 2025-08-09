import axios from "axios";
import { IBookedRange } from "../../../types/cabinComplete";

export const getBookedDates = async (cabinId: string): Promise<IBookedRange[]> => {
  const response = await axios.get(`/api-proxy/api/cabins/${cabinId}/bookedDates`);
  return response.data;
};