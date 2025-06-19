// Tipo `Cabin` dentro del feature Cabins.
//
// Define la estructura de datos que representa una cabaña en la aplicación,
// incluyendo campos básicos como nombre, imágenes, capacidad y precios.
//
// Este tipo es utilizado en componentes, hooks y servicios del feature Cabins para tipar las cabañas.


export type Cabin = {
    _id: string;
    name: string;
    description: string;
    mainImage: string;
    images: string[];
    pricePerNight: number;
    maxGuests: number;
    rooms: number;
    bathrooms: number;
    amenities: string[];
  };
  