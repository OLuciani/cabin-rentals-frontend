// Servicio de cabañas (`cabinService.ts`)
//
// Este módulo proporciona funciones para interactuar con la API de cabañas.
// La función `getCabins` permite obtener una lista de cabañas desde el backend,
// con la opción de aplicar filtros por fechas de disponibilidad, cantidad de huéspedes y habitaciones. 

import axios from "axios";
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
};
