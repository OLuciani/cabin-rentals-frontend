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
  const { handleSubmit } = useCreateCabin(setImageCount);

  console.log(imageCount);

  useEffect(() => {
    const main = document.getElementById("dashboard-scroll-container");
    if (main) main.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full max-w-lg sm:max-w-xl mx-auto bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-xl border border-gray-300 dark:border-gray-700 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">
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
              <label htmlFor="name" className="block font-medium mb-1">
                Nombre
              </label>
              <Field
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white"
              />
              <ErrorMessage name="name" component="div" className="text-red-600 dark:text-red-400 text-sm mt-1" />
            </div>

            {/* Descripción */}
            <div>
              <label htmlFor="description" className="block font-medium mb-1">
                Descripción
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md h-24 resize-none bg-white dark:bg-gray-900 text-black dark:text-white"
              />
              <ErrorMessage name="description" component="div" className="text-red-600 dark:text-red-400 text-sm mt-1" />
            </div>

            {/* Ubicación */}
            <div>
              <label htmlFor="location" className="block font-medium mb-1">
                Ubicación
              </label>
              <Field
                id="location"
                name="location"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white"
              />
              <ErrorMessage name="location" component="div" className="text-red-600 dark:text-red-400 text-sm mt-1" />
            </div>

            {/* Precio, Huéspedes, Habitaciones, Baños */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: "pricePerNight", label: "Precio por noche" },
                { id: "maxGuests", label: "Capacidad máxima" },
                { id: "rooms", label: "Habitaciones" },
                { id: "bathrooms", label: "Baños" },
              ].map(({ id, label }) => (
                <div key={id}>
                  <label htmlFor={id}>{label}</label>
                  <Field
                    id={id}
                    type="number"
                    name={id}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white"
                  />
                  <ErrorMessage name={id} component="div" className="text-red-600 dark:text-red-400 text-sm mt-1" />
                </div>
              ))}
            </div>

            {/* Imagen principal */}
            <div>
              <label htmlFor="mainImage" className="block font-medium mb-1">
                Imagen principal
              </label>
              <input
                id="mainImage"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFieldValue("mainImage", e.currentTarget.files?.[0] || null)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-sm text-black dark:text-white"
              />
              <ErrorMessage name="mainImage" component="div" className="text-red-600 dark:text-red-400 text-sm mt-1" />
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
              <label className="block font-medium mb-2">Imágenes secundarias</label>
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
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-sm text-black dark:text-white"
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
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-900 dark:text-blue-300 bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-200"
              >
                + Agregar otra imagen secundaria
              </button>
            </div>

            {/* Comodidades */}
            <div>
              <label className="block font-medium mb-2">Comodidades</label>
              <div className="flex flex-wrap gap-2">
                {amenitiesOptions.map((amenity) => (
                  <label key={amenity} className="text-sm flex items-center gap-1">
                    <Field type="checkbox" name="amenities" value={amenity} className="accent-blue-500" />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div className="flex gap-4">
              {[
                { name: "hasGrill", label: "Parrilla" },
                { name: "hasGarage", label: "Cochera" },
                { name: "hasSwimmingPool", label: "Piscina" },
              ].map(({ name, label }) => (
                <label key={name} className="flex items-center gap-1">
                  <Field type="checkbox" name={name} className="accent-blue-500" />
                  {label}
                </label>
              ))}
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
