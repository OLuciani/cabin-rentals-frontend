// Servicio para obtener el detalle de una cabaña específica desde el backend.
//
// Esta función realiza una petición HTTP GET utilizando Axios para recuperar los datos completos
// de una cabaña identificada por su `_id`. Se utiliza en la vista de detalle (CabinDetailPage).
//
// La función está tipada para garantizar que la respuesta coincida con la estructura `Cabin`.
// En caso de error, se lanza la excepción para ser manejada por el componente que llama.

import axios from "axios";
import { Cabin } from "../types/cabinDetailTypes";
import { ParamValue } from "next/dist/server/request/params";

/**
 * Obtiene el detalle de una cabaña específica por su ID.
 *
 * @param _id - ID de la cabaña (obtenido desde los parámetros de URL)
 * @returns Una promesa que resuelve con los datos completos de la cabaña.
 */
export async function getCabinDetail( _id: ParamValue ): Promise<Cabin> {
    try {
      const response = await axios.get<Cabin>(
        `/api-proxy/api/cabins/cabinDetail/${_id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching cabin detail:", error);
      throw error;
    }
  }