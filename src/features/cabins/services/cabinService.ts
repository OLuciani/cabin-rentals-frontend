/* import axios from "axios";
import { Cabin } from "../types/cabin";

export const getCabins = async (
  startDate?: string,
  endDate?: string, 
  
): Promise<Cabin[]> => {
  const res = await axios.get<Cabin[]>(`http://localhost:5000/api/cabins/getCabins`, {
    params: startDate && endDate  ? { start: startDate, end: endDate } : {},
  });

  return res.data;
}; */



import axios from "axios";
import { Cabin } from "../types/cabin";

export const getCabins = async (
  startDate?: string,
  endDate?: string,
  guests?: string,
  rooms?: string
): Promise<Cabin[]> => {
  const params: Record<string, string> = {};

  if (startDate && endDate) {
    params.start = startDate;
    params.end = endDate;
  }

  if (guests) params.guests = guests;
  if (rooms) params.rooms = rooms;

  const res = await axios.get<Cabin[]>(
    "http://localhost:5000/api/cabins/getCabins",
    {
      params,
    }
  );

  return res.data;
};
