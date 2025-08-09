// Definiciones de tipos e interfaces para el detalle de una cabaña.
//
// `Cabin` describe las propiedades de una cabaña específica, incluyendo 
// detalles generales, características y comodidades.
//
// `CabinDetailProps` define las propiedades que usan los componentes 
// relacionados con el detalle de una cabaña, como la cabaña en sí, funciones 
// para abrir/cerrar modales de imágenes, navegación entre imágenes, y acciones 
// como reservar.

export interface Cabin {
    _id: string;
    name: string;                // Nombre de la cabaña
    description: string;         // Descripción detallada
    mainImage: string;           // URL de la imagen principal
    images: string[];            // URLs de imágenes adicionales
    maxGuests: number;           // Capacidad máxima de huéspedes
    rooms: number;               // Número de habitaciones
    pricePerNight: number;       // Precio por noche en moneda local
    bathrooms: number;           // Cantidad de baños
    amenities: string[];         // Lista de comodidades disponibles
    hasGrill: boolean;           // Indica si tiene asador
    hasGarage: boolean;          // Indica si tiene cochera
    hasSwimmingPool: boolean;    // Indica si tiene pileta
    location: string;            // Ubicación o dirección de la cabaña
  }
  
  export interface CabinDetailProps {
    cabin?: Cabin;  // Cabaña cuyos datos se mostrarán (opcional)

    // Función para abrir el modal de imágenes en un índice dado
    openModal?: (index: number) => void;

    // Estado de visibilidad del modal de imágenes
    isModalOpen?: boolean;

    // Índice de la imagen actualmente visible en el modal
    currentImageIndex?: number;

    // Array de URLs de imágenes (puede ser null o indefinido)
    images?: string[] | null;

    // Función para cerrar el modal (evento click)
    closeModal?: React.MouseEventHandler<HTMLButtonElement> | undefined;

    // Funciones para navegación entre imágenes
    prevImage?: () => void;
    nextImage?: () => void;

    // Fuente de imagen (puede ser string o elemento HTML)
    src?: string | HTMLImageElement

    // Función para manejar clics en "Reservar"
    handleReserveClick?: () => void;

    onEditClick?: () => void;

    onShowCalendar?: () => void; 

    onCreateBooking?: () => void;

    onDeleteCabin?: () => void;
  }