"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { FormValues } from "../types/formValues";
import { useCreateCabin } from "../hooks/useCreateCabin";

import Image from "next/image";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es obligatorio"),
  description: Yup.string().required("La descripción es obligatoria"),
  location: Yup.string().required("La ubicación es obligatoria"),
  pricePerNight: Yup.number().required("Precio requerido").min(1),
  maxGuests: Yup.number().required("Capacidad requerida").min(1),
  rooms: Yup.number().required("Cantidad de habitaciones requerida").min(1),
  bathrooms: Yup.number().required("Cantidad de baños requerida").min(1),
  amenities: Yup.array().of(Yup.string()),
  mainImage: Yup.mixed().required("Imagen principal requerida"),
  images: Yup.array(),
});

const initialValues: FormValues = {
  name: "",
  description: "",
  location: "",
  pricePerNight: 1,
  maxGuests: 1,
  rooms: 1,
  bathrooms: 1,
  amenities: [],
  hasGrill: false,
  hasGarage: false,
  hasSwimmingPool: false,
  mainImage: null,
  images: [null],
};

const amenitiesOptions = [
  "wifi",
  "aire acondicionado",
  "TV",
  "cocina",
  "calefacción",
  "ropa de cama",
];

const CreateCabin: React.FC = () => {
  const [imageCount, setImageCount] = useState(1);
  console.log(imageCount);

  const { handleSubmit } = useCreateCabin(setImageCount);

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
    <div className="w-full max-w-lg sm:max-w-xl mx-auto bg-white text-black p-4 rounded-xl border-[1px] shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Crear nueva cabaña
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="space-y-4">
            {/* Nombre */}
            <div>
              <label className="block font-medium mb-1" htmlFor="name">
                Nombre
              </label>
              <Field
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block font-medium mb-1" htmlFor="description">
                Descripción
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md h-24 resize-none"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Ubicación */}
            <div>
              <label className="block font-medium mb-1" htmlFor="location">
                Ubicación
              </label>
              <Field
                id="location"
                name="location"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Precio, Huéspedes, Habitaciones, Baños */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="pricePerNight">Precio por noche</label>
                <Field
                  id="pricePerNight"
                  type="number"
                  name="pricePerNight"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="pricePerNight"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label htmlFor="maxGuests">Capacidad máxima</label>
                <Field
                  id="maxGuests"
                  type="number"
                  name="maxGuests"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="maxGuests"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label htmlFor="rooms">Habitaciones</label>
                <Field
                  id="rooms"
                  type="number"
                  name="rooms"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="rooms"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label htmlFor="bathrooms">Baños</label>
                <Field
                  id="bathrooms"
                  type="number"
                  name="bathrooms"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="bathrooms"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            {/* Imagen principal */}
            <div>
              <label className="block font-medium mb-1" htmlFor="mainImage">
                Imagen principal
              </label>
              <input
                id="mainImage"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFieldValue("mainImage", e.currentTarget.files?.[0] || null)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
              />
              <ErrorMessage
                name="mainImage"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
              {values.mainImage && (
                <Image
                  src={URL.createObjectURL(values.mainImage)}
                  alt="Preview imagen principal"
                  width={300}
                  height={200}
                  className="mt-2 rounded-md object-cover"
                />
              )}
            </div>

            {/* Imágenes secundarias */}
            <div>
              <label className="block font-medium mb-2">
                Imágenes secundarias
              </label>
              {values.images.map((img, index) => (
                <div key={index} className="mb-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0] || null;
                      const newImages = [...values.images];
                      newImages[index] = file;
                      setFieldValue("images", newImages);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                  />
                  {img && (
                    <Image
                      src={URL.createObjectURL(img)}
                      alt={`Imagen secundaria ${index + 1}`}
                      width={250}
                      height={160}
                      className="mt-2 rounded-md object-cover"
                    />
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  setFieldValue("images", [...values.images, null]);
                  setImageCount((prev) => prev + 1);
                }}
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-blue-300 rounded-md hover:bg-blue-200 transition-all duration-200"
              >
                + Agregar otra imagen secundaria
              </button>
            </div>

            {/* Comodidades */}
            <div>
              <label className="block font-medium mb-2">Comodidades</label>
              <div className="flex flex-wrap gap-2">
                {amenitiesOptions.map((amenity) => (
                  <label
                    key={amenity}
                    className="text-sm flex items-center gap-1"
                  >
                    <Field
                      type="checkbox"
                      name="amenities"
                      value={amenity}
                      className="accent-blue-500"
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <Field type="checkbox" name="hasGrill" />
                Parrilla
              </label>
              <label className="flex items-center gap-1">
                <Field type="checkbox" name="hasGarage" />
                Cochera
              </label>
              <label className="flex items-center gap-1">
                <Field type="checkbox" name="hasSwimmingPool" />
                Piscina
              </label>
            </div>

            {/* Botón submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
            >
              {isSubmitting ? "Creando..." : "Crear cabaña"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCabin;
