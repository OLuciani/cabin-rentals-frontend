import { useRouter } from "next/navigation";
import { FormikHelpers } from "formik";
import { FormValues } from "../types/formValues";
import { createCabin } from "../services/cabinService";

export const useCreateCabin = (setImageCount: (cb: (prev: number) => number) => void) => {
  const router = useRouter();

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      await createCabin(values);

      resetForm();
      setImageCount(() => 1);
      router.push("/cabins");
    } catch (error) {
      console.error("❌ Error al crear cabaña:", error);
      alert("Error al crear la cabaña");
    } finally {
      setSubmitting(false);
    }
  };

  return { handleSubmit };
};
