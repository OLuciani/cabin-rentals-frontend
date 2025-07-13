"use client";

// Página de detalle de una cabaña específica.
//
// Esta vista obtiene el ID de la cabaña desde la URL, consulta su información desde el backend
// y la muestra utilizando componentes modularizados: encabezado, información general e imágenes.
//
// Incluye una galería interactiva con modal, validación de sesión para realizar reservas,
// y manejo de errores y carga inicial. Forma parte de la feature `cabins/cabinDetail`.

import { useSearchParams, useParams } from "next/navigation"; 
import { useEffect, useState } from "react";
import { getCabinDetail } from "@/features/cabins/cabinDetail/services/cabinService";
import { Cabin } from "@/features/cabins/cabinDetail/types/cabinDetailTypes";
import CabinHeader from "@/features/cabins/cabinDetail/components/CabinHeader";
import CabinInfo from "@/features/cabins/cabinDetail/components/CabinInfo";
import ImageGallery from "@/features/cabins/cabinDetail/components/ImageGallery";
import ImageModal from "@/features/cabins/cabinDetail/components/ImageModal";
import { CircularProgress } from "@mui/material";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@mui/material";
import LoginOrRegisterModal from "@/components/modals/LoginOrRegisterModal";


const CabinDetailPage = () => {
  // Obtiene parámetros de búsqueda (por ejemplo, fechas de reserva)
  const searchParams = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  // Obtiene el ID de la cabaña desde la URL dinámica
  const { id } = useParams(); // Usamos useParams para obtener el parámetro de la URL
  const [cabin, setCabin] = useState<Cabin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Estado del modal de imágenes
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Estado del modal de autenticación
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Arreglo de imágenes de la cabaña
  const images = cabin && [cabin.mainImage, ...cabin.images];

  const router = useRouter();

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  // Abre el modal de imágenes con la imagen seleccionada
  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  // Cierra el modal de imágenes
  const closeModal = () => setIsModalOpen(false);

  // Imagen siguiente (cíclica)
  const nextImage = () => {
    if (images) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Ciclo a la primera imagen si es la última
    }
  };

  // Imagen anterior (cíclica)
  const prevImage = () => {
    if (images) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length // Ciclo a la última imagen si es la primera
      );
    }
  };

  // Fetch de la cabaña cuando se obtiene el ID
  useEffect(() => {
    if (id) {
      const fetchCabin = async () => {
        try {
          const response = await getCabinDetail(id);
          setCabin(response); // ya es de tipo CabinDetailProps
          console.log("Cabaña recibida:", response);
          setLoading(false);
        } catch (error) {
          console.error("Error cargando datos de la cabaña", error);

          if (error instanceof Error) {
            setError(error);
          } else {
            setError(new Error("Ocurrió un error desconocido"));
          }

          setLoading(false);
        }
      };

      fetchCabin();
    }
  }, [id]);

  // Si el usuario está logueado, redirige a la página de reserva; si no, abre el modal para 
  //que el usuario inicie sesión o cree una cuenta.
  const handleReserveClick = () => {
    if (isLoggedIn) {
      router.push(`/reservations/new?cabinId=${id}&startDate=${startDate}&endDate=${endDate}`);
    } else {
      setShowAuthModal(true);
    }
  };

  // Estado de carga
  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <p className="text-lg text-center">Esperando datos...</p>
        <CircularProgress />
      </div>
    );

  // Estado de error
  if (error) {
    return <p>{error.message}</p>;
  }

  // Si no existe la cabaña (por ID inválido)
  if (!cabin) {
    return <p>La cabaña no se encuentra.</p>;
  }

  // Renderizado principal
  return (
    <div className="max-w-4xl mx-auto my-2 sm:my-4 md:my-8 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 space-y-6">
      {/* Encabezado de la cabaña: título, imagen principal, botón de reserva */}
      <CabinHeader cabin={cabin} openModal={openModal} handleReserveClick={handleReserveClick} />

      {/* Información general de la cabaña */}
      <CabinInfo cabin={cabin} />

      {/* Galería de imágenes */}
      <ImageGallery cabin={cabin} openModal={openModal} />

      {/* Modal de galería ampliada con navegación */}
      <ImageModal
        isModalOpen={isModalOpen}
        currentImageIndex={currentImageIndex}
        images={images}
        closeModal={closeModal}
        prevImage={prevImage}
        nextImage={nextImage}
      />

      {/* Botón de reserva fijo */}
      <div className="flex justify-center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleReserveClick}
          className="mt-4"
        >
          Reservar esta cabaña
        </Button>
      </div>

      {/* Modal para login/registro si el usuario no está autenticado */}
      <LoginOrRegisterModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default CabinDetailPage;
