"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCabinDetail } from "../cabinDetail/services/cabinService";
import { Cabin } from "../cabinDetail/types/cabinDetailTypes";
import CabinHeader from "../cabinDetail/components/CabinHeader";
import CabinInfo from "../cabinDetail/components/CabinInfo";
import ImageGallery from "../cabinDetail/components/ImageGallery";
import ImageModal from "../cabinDetail/components/ImageModal";
import { CircularProgress, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import LoginOrRegisterModal from "@/components/modals/LoginOrRegisterModal";
import { usePathname } from "next/navigation";

// 👇 Ahora recibimos cabinId como prop
interface Props {
  cabinId: string;
  onEditClick?: () => void;
}

const CabinDetailDashboardPage: React.FC<Props> = ({ cabinId, onEditClick }) => {
  const searchParams = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const pathname = usePathname();
  const isInDashboard = pathname.startsWith("/dashboardAppAdmin");

  const [cabin, setCabin] = useState<Cabin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const images = cabin && [cabin.mainImage, ...cabin.images];

  useEffect(() => {
    if (cabinId) {
      const fetchCabin = async () => {
        try {
          const response = await getCabinDetail(cabinId);
          setCabin(response);
          setLoading(false);
        } catch (error) {
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
  }, [cabinId]);

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const nextImage = () => {
    if (images) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
    }
  };

  const handleReserveClick = () => {
    if (isLoggedIn) {
      router.push(
        `/reservations/new?cabinId=${cabinId}&startDate=${startDate}&endDate=${endDate}`
      );
    } else {
      setShowAuthModal(true);
    }
  };

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

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <p className="text-lg text-center">Esperando datos...</p>
        <CircularProgress />
      </div>
    );

  if (error) return <p>{error.message}</p>;

  if (!cabin) return <p>La cabaña no se encuentra.</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 space-y-6">
      <CabinHeader
        cabin={cabin}
        openModal={openModal}
        handleReserveClick={handleReserveClick}
        onEditClick={onEditClick}
      />

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
       
      {!isInDashboard && (
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
      )}

      <LoginOrRegisterModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default CabinDetailDashboardPage;
