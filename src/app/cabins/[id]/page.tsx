/* "use client"; 

import { useParams } from "next/navigation"; // Importa useParams de next/navigation
import { useEffect, useState } from "react";
import CabinDetail from "../../../components/CabinDetail"; // Ajusta la ruta si es necesario

const CabinDetailPage = () => {
  const { id } = useParams(); // Usamos useParams para obtener el parámetro de la URL
  const [cabin, setCabin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);


  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`http://localhost:5000/api/cabins/cabinDetail/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setCabin(data);
          setLoading(false);
        })
        .catch((err) => {
            console.log(err)
          setError(err);
          setLoading(false);
        });
    }
  }, [id]); // Este efecto solo se ejecutará cuando el id cambie

  if (loading) {
    return <p>Cargando detalles de la cabaña...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!cabin) {
    return <p>La cabaña no se encuentra.</p>;
  }

  return <CabinDetail cabin={cabin} />;
};

export default CabinDetailPage; */

//Esta es la que estaba andando perfecto sin el boton para comenzar una reserva
/* "use client";

import { useParams } from "next/navigation"; // Importa useParams de next/navigation
import { useEffect, useState } from "react";
import { getCabinDetail } from "@/features/cabins/cabinDetail/services/cabinService";
import { Cabin } from "@/features/cabins/cabinDetail/types/cabinDetailTypes";
import CabinHeader from "@/features/cabins/cabinDetail/components/CabinHeader";
import CabinInfo from "@/features/cabins/cabinDetail/components/CabinInfo";
import ImageGallery from "@/features/cabins/cabinDetail/components/ImageGallery";
import ImageModal from "@/features/cabins/cabinDetail/components/ImageModal";
import { CircularProgress } from "@mui/material";

const CabinDetailPage = () => {
  const { id } = useParams(); // Usamos useParams para obtener el parámetro de la URL
  const [cabin, setCabin] = useState<Cabin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = cabin && [cabin.mainImage, ...cabin.images];

  // Función para abrir el modal y poner la imagen actual
  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => setIsModalOpen(false);

  // Función para navegar entre las imágenes en el modal (con ciclo)
  const nextImage = () => {
    if (images) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Ciclo a la primera imagen si es la última
    }
  };

  const prevImage = () => {
    if (images) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length // Ciclo a la última imagen si es la primera
      );
    }
  };

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

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <p className="text-lg text-center">Esperando datos...</p>
        <CircularProgress />
      </div>
    );

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!cabin) {
    return <p>La cabaña no se encuentra.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto my-2 sm:my-4 lg:my-6  bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 space-y-6">
      <CabinHeader cabin={cabin} openModal={openModal} />
      <CabinInfo cabin={cabin} />
      <ImageGallery cabin={cabin} openModal={openModal} />
      <ImageModal
        isModalOpen={isModalOpen}
        currentImageIndex={currentImageIndex}
        images={images}
        closeModal={closeModal}
        prevImage={prevImage}
        nextImage={nextImage}
      />
    </div>
  );
};

export default CabinDetailPage; */





"use client";

import { useSearchParams, useParams } from "next/navigation"; // Importa useParams de next/navigation
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
  const searchParams = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const { id } = useParams(); // Usamos useParams para obtener el parámetro de la URL
  const [cabin, setCabin] = useState<Cabin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const images = cabin && [cabin.mainImage, ...cabin.images];

  const router = useRouter();

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  // Función para abrir el modal y poner la imagen actual
  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => setIsModalOpen(false);

  // Función para navegar entre las imágenes en el modal (con ciclo)
  const nextImage = () => {
    if (images) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Ciclo a la primera imagen si es la última
    }
  };

  const prevImage = () => {
    if (images) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length // Ciclo a la última imagen si es la primera
      );
    }
  };

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

  const handleReserveClick = () => {
    if (isLoggedIn) {
      router.push(`/reservations/new?cabinId=${id}&startDate=${startDate}&endDate=${endDate}`);
    } else {
      setShowAuthModal(true);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <p className="text-lg text-center">Esperando datos...</p>
        <CircularProgress />
      </div>
    );

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!cabin) {
    return <p>La cabaña no se encuentra.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto my-2 sm:my-4 lg:my-6  bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 space-y-6">
      <CabinHeader cabin={cabin} openModal={openModal} handleReserveClick={handleReserveClick} />
      <CabinInfo cabin={cabin} />
      <ImageGallery cabin={cabin} openModal={openModal} />
      <ImageModal
        isModalOpen={isModalOpen}
        currentImageIndex={currentImageIndex}
        images={images}
        closeModal={closeModal}
        prevImage={prevImage}
        nextImage={nextImage}
      />

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

      <LoginOrRegisterModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default CabinDetailPage;
