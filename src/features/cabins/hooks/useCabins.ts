/* import { useEffect, useState } from "react";
import { getCabins } from "../services/cabinService";
import { Cabin } from "../types/cabin";

export const useCabins = () => {
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCabins();
        setCabins(data);
      } catch (err) {
        console.error(err); 
        setError("Error al cargar las cabañas");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { cabins, loading, error };
}; */


// useCabins.ts
import { useEffect, useState } from "react";
import { getCabins } from "../services/cabinService";
import { Cabin } from "../types/cabin";

export const useCabins = (startDate?: string, endDate?: string) => {
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCabins(startDate, endDate);
        setCabins(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar las cabañas");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  return { cabins, loading, error };
};
