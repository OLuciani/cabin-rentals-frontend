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
import { FiMapPin, FiHeart, FiCoffee } from "react-icons/fi";
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

  useEffect(() => {
    const main = document.getElementById("dashboard-scroll-container");
    if (main) main.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="text-textPrimary dark:text-darkText pb-10">
      {/* Hero */}
      <section className="relative w-screen aspect-[16/9] min-h-[250px] max-h-[66.666vh] sm:aspect-[16/7] lg:aspect-auto lg:h-[66.666vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/img-portada.webp"
            alt="Cabaña en la naturaleza"
            fill
            sizes="100vw"
            className="object-cover object-left-bottom"
          />
        </div>

        <div className="absolute inset-0 bg-opacity-40 flex flex-col items-center justify-start pt-[4%] lg:pt-0 lg:justify-center">
          <div className="text-center text-white/90 flex flex-col items-center justify-center gap-[5vh]">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
              Escapá a la naturaleza
            </h2>
            <p className="hidden lg:block text-2xl">
              Elegí tu cabaña ideal.
            </p>
            <Link href="/cabins">
              <button className="hidden lg:block mt-6 bg-accent dark:bg-darkAccent hover:bg-darkAccent dark:hover:bg-accent text-white font-bold py-2 px-4 rounded">
                Ver cabañas
              </button>
            </Link>
          </div>
        </div>
      </section>


      {/* Filtro de fechas */}
      <div className="py-8 container mx-auto px-4">
        <DateFilter />
      </div>

      {/* Por qué elegirnos */}
      <section className="py-8 bg-primary/5 dark:bg-darkPrimary/10">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Una experiencia inolvidable</h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Descubrí por qué nuestros huéspedes nos eligen una y otra vez para sus escapadas a la naturaleza.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center">
              <FiMapPin className="text-accent dark:text-darkAccent text-5xl mb-4" />
              <h4 className="text-xl font-semibold mb-2">Entorno Único</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Cabañas inmersas en paisajes soñados, ideales para desconectar y renovar energías.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <FiHeart className="text-accent dark:text-darkAccent text-5xl mb-4" />
              <h4 className="text-xl font-semibold mb-2">Comodidad Garantizada</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Totalmente equipadas para que te sientas como en casa, pero en el corazón del bosque.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <FiCoffee className="text-accent dark:text-darkAccent text-5xl mb-4" />
              <h4 className="text-xl font-semibold mb-2">Atención Personalizada</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Estamos para ayudarte a que tu estadía sea perfecta, cuidando cada detalle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Galería de cabañas */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-10 text-center">Explorá nuestras cabañas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src={`/images/cabaña-${i}.jpg`}
                  alt={`Cabaña ${i}`}
                  width={600}
                  height={400}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-bold">Cabaña {i}</h4>
                  <p className="text-sm mt-2">Descripción breve de la cabaña {i}.</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/cabins">
              <button className="bg-accent dark:bg-darkAccent hover:bg-darkAccent dark:hover:bg-accent text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
                Ver todas las cabañas
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-10">Lo que dicen nuestros clientes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <p className="italic">
                Un lugar mágico. La cabaña era perfecta y el entorno inmejorable. ¡Volveremos sin dudarlo!
              </p>
              <p className="font-semibold mt-4">- Familia González</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <p className="italic">
                La escapada de fin de semana que necesitábamos. Paz, naturaleza y una atención de primera. 100% recomendado.
              </p>
              <p className="font-semibold mt-4">- Ana y Marcos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-accent dark:bg-darkAccent text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">¿Listo para tu próxima aventura?</h3>
          <p className="text-lg mb-8">Tu refugio en la naturaleza te está esperando.</p>
          <Link href="/cabins">
            <button className="bg-white text-accent dark:text-darkAccent font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-200 transition-colors">
              Reservar ahora
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

