import axios from "axios";
import { Cabin } from "../types/cabin";

/* export const getCabins = async (): Promise<Cabin[]> => {
  const res = await axios.get<Cabin[]>(`http://localhost:5000/api/cabins/getCabins`);
  return res.data;
}; */

export const getCabins = async (
  startDate?: string,
  endDate?: string
): Promise<Cabin[]> => {
  const res = await axios.get<Cabin[]>(`http://localhost:5000/api/cabins/getCabins`, {
    params: startDate && endDate ? { start: startDate, end: endDate } : {},
  });

  return res.data;
};