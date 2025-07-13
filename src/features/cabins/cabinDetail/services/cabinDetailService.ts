/* import axios from "axios";
import { ICabin, CabinFormData } from "../../types/cabinComplete";

// Obtener detalle de una cabaña
export async function getCabinDetail(id: string): Promise<ICabin> {
  const { data } = await axios.get(`/api-proxy/api/cabins/cabinDetail/${id}`);
  return data;
}

// Actualizar una cabaña
export async function updateCabinDetail(id: string, updateData: CabinFormData): Promise<ICabin> {
  const { data } = await axios.put(`/api-proxy/api/cabins/updateCabin/${id}`, updateData);
  return data;
} */


// src/features/cabins/cabinDetail/services/cabinDetailService.ts
import axios from "axios";
import { ICabin, CabinFormData } from "../../types/cabinComplete";

// Obtener detalle de una cabaña
export async function getCabinDetail(id: string): Promise<ICabin> {
  const { data } = await axios.get(`/api-proxy/api/cabins/cabinDetail/${id}`);
  return data;
}

// Actualizar una cabaña con FormData
export async function updateCabinDetail(id: string, updateData: CabinFormData): Promise<ICabin> {
  const formData = new FormData();

  // Campos simples
  formData.append("name", updateData.name);
  formData.append("description", updateData.description);
  formData.append("location", updateData.location);
  formData.append("pricePerNight", updateData.pricePerNight.toString());
  formData.append("maxGuests", updateData.maxGuests.toString());
  formData.append("rooms", updateData.rooms.toString());
  formData.append("bathrooms", updateData.bathrooms.toString());
  formData.append("hasGrill", String(updateData.hasGrill));
  formData.append("hasGarage", String(updateData.hasGarage));
  formData.append("hasSwimmingPool", String(updateData.hasSwimmingPool));

  // Amenities (array de strings)
  updateData.amenities.forEach((amenity) => {
    formData.append("amenities", amenity);
  });

  // Imagen principal
  if (updateData.mainImage instanceof File) {
    formData.append("mainImage", updateData.mainImage);
  } else if (typeof updateData.mainImage === "string") {
    formData.append("mainImage", updateData.mainImage); // mantener la URL existente
  }

  // Imágenes secundarias (puede haber combinación de File y string)
  updateData.images.forEach((img) => {
    if (img instanceof File) {
      formData.append("images", img); // nueva imagen subida
    } else if (typeof img === "string") {
      formData.append("images", img); // URL existente
    }
  });

  // Enviar con encabezado correcto
  const { data } = await axios.put(
    `/api-proxy/api/cabins/updateCabin/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
}
