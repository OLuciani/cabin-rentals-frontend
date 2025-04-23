"use client"
import DateFilter from "../features/availability/DateFilter";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";


export default function Home() {
  useEffect(() => {
    const probarConexion = async () => {
      try {
        const response: AxiosResponse<{ ok: boolean; message: string }> =
        await axios.get("http://localhost:5000/api/ping");
        console.log("✅ Respuesta del backend:", response.data);
      } catch (error) {
        console.error("❌ Error al conectar con el backend:", error);
      }
    };

    probarConexion();
  }, []);

  return (
    <div className="text-textPrimary dark:text-darkText pb-10">
      {/* Hero Section */}
      <section className="relative h-[300px] sm:h-[400px] md:h-[530px] xxxl:h-[700px] overflow-hidden">
        <Image
          src="/images/img-cabaña-portada.jpg"
          alt="Cabaña en la naturaleza"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute mt-10 sm:mt-0 inset-0 bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Escapa a la Tranquilidad
            </h2>
            <p className="text-lg sm:text-xl">
              Descubre nuestras acogedoras cabañas en la naturaleza.
            </p>
            <button className="mt-6 bg-accent dark:bg-darkAccent hover:bg-darkAccent dark:hover:bg-accent text-white font-bold py-2 px-4 rounded">
              Ver Cabañas
            </button>
          </div>
        </div>
      </section>

      <DateFilter />

      {/* Sección de Destacados */}
      <section className="container mx-auto pb-12 px-4">
        <h3 className="text-2xl font-bold mb-8 text-center">
          Nuestras Cabañas Destacadas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Cabaña 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg overflow-hidden">
            <Image
              src="/images/cabaña-1.jpg"
              alt="Cabaña 1"
              width={600}
              height={400}
              className="w-full object-cover"
            />
            <div className="p-4">
              <h4 className="font-bold">Cabaña de la Pradera</h4>
              <p className="text-sm">Ideal para conectarte con la naturaleza.</p>
            </div>
          </div>
          {/* Cabaña 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg overflow-hidden">
            <Image
              src="/images/cabaña-2.jpg"
              alt="Cabaña 2"
              width={600}
              height={400}
              className="w-full object-cover"
            />
            <div className="p-4">
              <h4 className="font-bold">Cabaña del Cerro</h4>
              <p className="text-sm">Vistas increíbles del Cerro Blanco.</p>
            </div>
          </div>
          {/* Cabaña 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg overflow-hidden">
            <Image
              src="/images/cabaña-3.jpg"
              alt="Cabaña 3"
              width={600}
              height={400}
              className="w-full object-cover"
            />
            <div className="p-4">
              <h4 className="font-bold">Cabaña del Lago</h4>
              <p className="text-sm">Con muelle para embarcaciones.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
