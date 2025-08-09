import axios from "axios";

export const deleteCabinService = async (cabinId: string): Promise<void> => {
  await axios.delete(`/api-proxy/api/cabins/${cabinId}`);
};