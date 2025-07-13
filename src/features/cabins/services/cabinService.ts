// Servicio de cabañas (`cabinService.ts`)
//
// Este módulo proporciona funciones para interactuar con la API de cabañas.
// La función `getCabins` permite obtener una lista de cabañas desde el backend,
// con la opción de aplicar filtros por fechas de disponibilidad, cantidad de huéspedes y habitaciones. 

/* import axios from "axios";
import { Cabin } from "../types/cabin";

export const getCabins = async (
  startDate?: string,
  endDate?: string,
  guests?: string,
  rooms?: string
): Promise<Cabin[]> => {
  // Construcción del objeto de parámetros de consulta (query params)
  const params: Record<string, string> = {};

  if (startDate && endDate) {
    params.start = startDate;
    params.end = endDate;
  }

  if (guests) params.guests = guests;
  if (rooms) params.rooms = rooms;

  // Solicitud GET al endpoint del backend usando proxy
  const res = await axios.get<Cabin[]>(
    "/api-proxy/api/cabins/getCabins",
    {
      params,
    }
  );

  // Se retorna solo el array de cabañas
  return res.data;
}; */


import axios from "axios";
import { Cabin } from "../types/cabinBasic";        // Para getCabins (lista simple)
import { ICabin } from "../types/cabinComplete";         // Para createCabin (objeto completo)
import { FormValues } from "../types/formValues";

// Obtener cabañas con filtros opcionales - sigue usando tipo básico
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

  const res = await axios.get<Cabin[]>("/api-proxy/api/cabins/getCabins", {
    params,
  });

  return res.data;
};

// Crear una nueva cabaña - usar el tipo completo que devuelve el backend
export const createCabin = async (values: FormValues): Promise<ICabin> => {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("description", values.description);
  formData.append("location", values.location);
  formData.append("pricePerNight", String(values.pricePerNight));
  formData.append("maxGuests", String(values.maxGuests));
  formData.append("rooms", String(values.rooms));
  formData.append("bathrooms", String(values.bathrooms));
  formData.append("hasGrill", String(values.hasGrill));
  formData.append("hasGarage", String(values.hasGarage));
  formData.append("hasSwimmingPool", String(values.hasSwimmingPool));

  values.amenities.forEach((a) => formData.append("amenities", a));
  if (values.mainImage) formData.append("mainImage", values.mainImage);
  values.images.forEach((img) => {
    if (img) formData.append("images", img);
  });

  const res = await axios.post("/api-proxy/api/cabins/createCabin", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data; // Esto ahora tiene tipo ICabin
};
