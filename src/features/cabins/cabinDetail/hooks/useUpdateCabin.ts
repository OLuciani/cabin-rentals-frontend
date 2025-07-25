import { useState } from "react";
import { updateCabinDetail } from "../services/cabinDetailService";
import { CabinFormData, ICabin } from "../../types/cabinComplete";

export function useUpdateCabin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateCabin = async (id: string, formData: CabinFormData): Promise<ICabin | null> => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateCabinDetail(id, formData);
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
