"use client"

// Hook personalizado `useCabins`.
//
// Este hook recupera una lista de cabañas desde el servicio `getCabins`.
//
// - Si no se pasan filtros, devuelve **todas las cabañas**.
// - Si se proporcionan filtros (`startDate`, `endDate`, `guests`, `rooms`), devuelve solo las
//   **cabañas disponibles** que cumplen con esos criterios.
//
// Devuelve:
// - `cabins`: array de cabañas obtenidas.
// - `loading`: estado de carga (true mientras se recuperan los datos).
// - `error`: mensaje en caso de error.
//
// Utilizado, por ejemplo, en `CabinsPageClient` para renderizar el listado de cabañas.

import { useEffect, useState } from "react";
import { getCabins } from "../services/cabinService";
import { Cabin } from "../types/cabin";

export const useCabins = (
  startDate?: string,
  endDate?: string,
  guests?: string,
  rooms?: string
) => {
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Al montar el componente o cambiar los filtros, se solicita la lista de cabañas
    const fetchData = async () => {
      try {
        const data = await getCabins(startDate, endDate, guests, rooms);
        setCabins(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar las cabañas");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate, guests, rooms]);

  return { cabins, loading, error };
};
