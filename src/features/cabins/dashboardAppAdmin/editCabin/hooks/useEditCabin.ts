import { useState } from "react";
import { editCabinService } from "../services/editCabinService";
import { CabinFormData, ICabin } from "../types/editCabinTypes";

export function useUpdateCabin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateCabin = async (id: string, formData: CabinFormData): Promise<ICabin | null> => {
    setLoading(true);
    setError(null);
    try {
      const updated = await editCabinService(id, formData);
      return updated;
    } catch (err: unknown) {
      console.error(err);

      if (typeof err === "object" && err !== null && "response" in err) {
        const axiosError = err as { response: { data: { message: string } } };
        setError(axiosError.response.data.message || "Ocurrió un error al actualizar la cabaña");
      } else {
        setError("Ocurrió un error inesperado");
      }

      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateCabin, loading, error };
}
