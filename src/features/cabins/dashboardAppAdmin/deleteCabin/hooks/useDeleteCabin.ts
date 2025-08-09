import { deleteCabinService } from "../services/deleteCabinService";

export const useDeleteCabin = () => {
  const handleDelete = async (cabinId: string): Promise<void> => {
    await deleteCabinService(cabinId);
  };

  return { handleDelete };
};