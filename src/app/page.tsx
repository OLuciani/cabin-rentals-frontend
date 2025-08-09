"use client";

// Página principal de la aplicación Cabin Rentals.
//
// Esta vista presenta una sección hero con imagen destacada, un componente para seleccionar fechas de disponibilidad
// y una galería fija de cabañas destacadas como ejemplo visual. Además, prueba la conexión con el backend al cargarse.
//
// Esta es la única página no modularizada (por ahora) dentro de la arquitectura basada en funcionalidades (feature-based).

import DateFilter from "../features/availability/components/DateFilter";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    // Al cargar la página, se hace un "ping" al backend para verificar que esté operativo.
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

  // Este useEffect asegura que el componente se muestre scrolleado al inicio cada vez que se monta en el dashboard src/dashboardAppAdmin/page.tsx.
  useEffect(() => {
    // Intentamos scroll en main y también en body/html por si acaso
    const main = document.getElementById("dashboard-scroll-container");
    if (main) {
      main.scrollTop = 0;
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="text-textPrimary dark:text-darkText pb-10">
      {/* Sección Hero con imagen de fondo y llamado a la acción */}
      <section className="relative w-screen aspect-[16/9] min-h-[250px] max-h-[66.666vh] overflow-hidden sm:aspect-[16/7] lg:aspect-auto lg:h-[66.666vh]">
        <div className="absolute inset-0 ">
          <Image
            src="/images/img-portada.webp"
            alt="Cabaña en la naturaleza"
            fill
            sizes="100vw"
            className="object-cover object-left-bottom"
          />
        </div>
        <div className="absolute inset-0 bg-opacity-40 flex flex-col items-center justify-start pt-[4%] lg-pt-0 lg:justify-center">
          <div className="text-center text-white/90 flex flex-col items-center justify-center gap-[5vh]">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
              Escapá a la naturaleza
            </h2>
            <p className="hidden lg:block text-2xl ">Elegí tu cabaña ideal.</p>
            <Link href="/cabins">
              <button className="hidden lg:block mt-6 bg-accent dark:bg-darkAccent hover:bg-darkAccent dark:hover:bg-accent text-white font-bold py-2 px-4 rounded">
                Ver cabañas
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Filtro de fechas de disponibilidad (componente modularizado) */}
      <DateFilter />

      {/* Sección de Cabañas Destacadas (mock visual) */}
      <section className="container mx-auto pb-12 px-4">
        <h3 className="text-2xl font-bold mb-8 text-center">
          Nuestras Cabañas Destacadas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Cabin Card 1 */}
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
          {/* Cabin Card 2 */}
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
          {/* Cabin Card 3 */}
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
