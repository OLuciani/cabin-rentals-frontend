import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CabinDetailProps } from "../types/cabinDetailTypes";

const ImageModal: React.FC<CabinDetailProps> = ({
  isModalOpen,
  closeModal,
  prevImage,
  images,
  currentImageIndex,
  nextImage,
}) => {
  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="relative bg-white p-4 rounded-2xl max-w-[90vw] max-h-[90vh] w-[80%] flex items-center justify-center">
            {/* Botón de cerrar */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-800 hover:text-red-500 z-50"
              aria-label="Cerrar"
            >
              ✕
            </button>

            {/* Botón anterior */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full p-2 z-50"
              aria-label="Anterior"
            >
              <ChevronLeft size={30} />
            </button>

            {/* Imagen */}
            {typeof currentImageIndex === "number" &&
              images?.[currentImageIndex] && (
                <div className="relative w-[70%] h-[80vh] rounded-xl overflow-hidden">
                  <Image
                    src={images[currentImageIndex]}
                    alt={`Imagen ${currentImageIndex + 1}`}
                    fill
                    className=""
                  />
                </div>
            )}

            {/* Botón siguiente */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full p-2 z-50"
              aria-label="Siguiente"
            >
              <ChevronRight size={30} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageModal;