"use client";
import DateFilter from "../features/availability/components/DateFilter";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    const probarConexion = async () => {
      try {
        const response: AxiosResponse<{ ok: boolean; message: string }> =
          await axios.get("/api-proxy/api/ping");
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
      <section className="relative w-screen h-[300px] sm:h-[360px] md:h-[475px] xxxl:h-[630px] overflow-hidden">
        {/* Imagen para móviles (hasta md) */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/images/img-portada-recort.png"
            alt="Cabaña en la naturaleza"
            fill
            sizes="(max-width: 767px) 100vw"
            className="object-cover object-left"
            priority
          />
        </div>

        {/* Imagen para pantallas md en adelante */}
        <div className="absolute inset-0 hidden md:block">
          <Image
            src="/images/img-cabaña-portada2.jpg"
            alt="Cabaña en la naturaleza"
            width={1920}
            height={630}
            sizes="100vw"
            className="w-full h-full object-cover object-center"
            priority
          />
        </div>

        {/* Texto centrado encima de la imagen */}
        <div className="absolute mt-16 sm:mt-0 inset-0 bg-opacity-40 flex flex-col items-center justify-end mb-5 sm:mb-8">
          <div className="text-center text-white flex flex-col items-center justify-center gap-3 sm:gap-10 md:gap-10 lg:gap-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Escapá a la naturaleza
            </h2>
            {/* <p className="text-lg sm:text-xl">
              Descubre nuestras acogedoras cabañas en la naturaleza.
            </p> */}
            <p className="text-lg sm:text-xl">
              Cabañas acogedoras en la naturaleza.
            </p>
            <Link href="/cabins">
              <button className="mt-6 bg-accent dark:bg-darkAccent hover:bg-darkAccent dark:hover:bg-accent text-white font-bold py-2 px-4 rounded">
                Ver Cabañas
              </button>
            </Link>
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
              <p className="text-sm">
                Ideal para conectarte con la naturaleza.
              </p>
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
