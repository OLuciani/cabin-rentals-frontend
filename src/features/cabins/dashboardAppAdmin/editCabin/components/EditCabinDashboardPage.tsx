/* "use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { toast } from 'react-toastify';

import { getCabinDetail } from "../services/editCabinService";
import { useUpdateCabin } from "../hooks/useEditCabin";
import { CabinFormData, ICabin } from "../types/editCabinTypes";

interface Props {
  cabinId: string;
  onBack: () => void;
  setSection: (section: string) => void;
}

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

const amenitiesOptions = [
  "wifi",
  "aire acondicionado",
  "TV",
  "cocina",
  "calefacción",
  "ropa de cama",
];

const EditCabinDashboardPage: React.FC<Props> = ({ cabinId, setSection }) => {
  const [initialValues, setInitialValues] = useState<CabinFormData | null>(null);
  const { updateCabin, loading: updating, error } = useUpdateCabin();

  useEffect(() => {
    const fetchCabin = async () => {
      try {
        const cabin: ICabin = await getCabinDetail(cabinId);
        const {
          name,
          description,
          mainImage,
          images,
          pricePerNight,
          maxGuests,
          rooms,
          bathrooms,
          amenities,
          hasGrill,
          hasGarage,
          hasSwimmingPool,
          location,
        } = cabin;

        setInitialValues({
          name,
          description,
          mainImage,
          images,
          pricePerNight,
          maxGuests,
          rooms,
          bathrooms,
          amenities,
          hasGrill,
          hasGarage,
          hasSwimmingPool,
          location,
        });
      } catch (err) {
        console.error("Error al obtener los datos de la cabaña", err);
      }
    };

    fetchCabin();
  }, [cabinId]);

  if (!initialValues) return <p>Cargando cabaña...</p>;

  return (
    <div className="w-full max-w-lg sm:max-w-xl mx-auto bg-white text-black p-4 rounded-xl shadow-md">
      <button
        onClick={() => setSection("cabinDetail")}
        className="text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors mb-4"
      >
        ← Volver
      </button>
      
      <h2 className="text-2xl font-semibold mb-6 text-center">Editar Cabaña</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            await updateCabin(cabinId, values);
            toast.success("Cabaña editada con éxito");
            setSection("cabinManagement")
          } catch (error) {
            console.error("Error al actualizar la cabaña:", error);
            toast.error("Error al editar la cabaña");
          }
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="space-y-4">
           
            <div>
              <label className="block mb-1 font-medium" htmlFor="name">
                Nombre
              </label>
              <Field
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

      
            <div>
              <label className="block mb-1 font-medium" htmlFor="description">
                Descripción
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md h-24 resize-none"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
            </div>

          
            <div>
              <label className="block mb-1 font-medium" htmlFor="location">
                Ubicación
              </label>
              <Field
                id="location"
                name="location"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="location" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="pricePerNight">Precio por noche</label>
                <Field
                  id="pricePerNight"
                  type="number"
                  name="pricePerNight"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="pricePerNight" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="maxGuests">Capacidad máxima</label>
                <Field
                  id="maxGuests"
                  type="number"
                  name="maxGuests"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="maxGuests" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="rooms">Habitaciones</label>
                <Field
                  id="rooms"
                  type="number"
                  name="rooms"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="rooms" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="bathrooms">Baños</label>
                <Field
                  id="bathrooms"
                  type="number"
                  name="bathrooms"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="bathrooms" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            
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
              {values.mainImage && typeof values.mainImage !== "string" && (
                <Image
                  src={URL.createObjectURL(values.mainImage)}
                  alt="Preview imagen principal"
                  width={300}
                  height={200}
                  className="mt-2 rounded-md object-cover"
                />
              )}
            </div>

            
            <div>
              <label className="block font-medium mb-2">Imágenes secundarias</label>
              {values.images.map((img, index) => (
                <div key={index} className="mb-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0] || "";
                      const newImages = [...values.images];
                      newImages[index] = file;
                      setFieldValue("images", newImages);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                  />
                  {img && typeof img !== "string" && (
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
                  setFieldValue("images", [...values.images, ""]);
                }}
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-blue-300 rounded-md hover:bg-blue-200 transition-all duration-200"
              >
                + Agregar otra imagen secundaria
              </button>
            </div>

            
            <div>
              <label className="block font-medium mb-2">Comodidades</label>
              <div className="flex flex-wrap gap-2">
                {amenitiesOptions.map((amenity) => (
                  <label key={amenity} className="text-sm flex items-center gap-1">
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

            <button
              type="submit"
              disabled={isSubmitting || updating}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
            >
              {isSubmitting || updating ? "Guardando..." : "Guardar cambios"}
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditCabinDashboardPage; */



"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { toast } from "react-toastify";

import { getCabinDetail } from "../services/editCabinService";
import { useUpdateCabin } from "../hooks/useEditCabin";
import { CabinFormData, ICabin } from "../types/editCabinTypes";

interface Props {
  cabinId: string;
  onBack: () => void;
  setSection: (section: string) => void;
}

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

const amenitiesOptions = [
  "wifi",
  "aire acondicionado",
  "TV",
  "cocina",
  "calefacción",
  "ropa de cama",
];

const EditCabinDashboardPage: React.FC<Props> = ({ cabinId, setSection }) => {
  const [initialValues, setInitialValues] = useState<CabinFormData | null>(null);
  const { updateCabin, loading: updating, error } = useUpdateCabin();

  useEffect(() => {
    const fetchCabin = async () => {
      try {
        const cabin: ICabin = await getCabinDetail(cabinId);
        const {
          name,
          description,
          mainImage,
          images,
          pricePerNight,
          maxGuests,
          rooms,
          bathrooms,
          amenities,
          hasGrill,
          hasGarage,
          hasSwimmingPool,
          location,
        } = cabin;

        setInitialValues({
          name,
          description,
          mainImage,
          images,
          pricePerNight,
          maxGuests,
          rooms,
          bathrooms,
          amenities,
          hasGrill,
          hasGarage,
          hasSwimmingPool,
          location,
        });
      } catch (err) {
        console.error("Error al obtener los datos de la cabaña", err);
      }
    };

    fetchCabin();
  }, [cabinId]);

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

  if (!initialValues) return <p>Cargando cabaña...</p>;

  return (
    <div className="w-full max-w-lg sm:max-w-xl mx-auto bg-white dark:bg-gray-900 text-black dark:text-white p-4 rounded-xl shadow-md">
      <button
        onClick={() => setSection("cabinDetail")}
        className="text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors mb-4"
      >
        ← Volver
      </button>

      <h2 className="text-2xl font-semibold mb-6 text-center">Editar Cabaña</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            await updateCabin(cabinId, values);
            toast.success("Cabaña editada con éxito");
            setSection("cabinManagement");
          } catch (error) {
            console.error("Error al actualizar la cabaña:", error);
            toast.error("Error al editar la cabaña");
          }
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="space-y-4">
            {/* Nombre */}
            <div>
              <label className="block mb-1 font-medium" htmlFor="name">
                Nombre
              </label>
              <Field
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Descripción */}
            <div>
              <label className="block mb-1 font-medium" htmlFor="description">
                Descripción
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white h-24 resize-none"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Ubicación */}
            <div>
              <label className="block mb-1 font-medium" htmlFor="location">
                Ubicación
              </label>
              <Field
                id="location"
                name="location"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
              />
              <ErrorMessage name="location" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Precio, capacidad, habitaciones, baños */}
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
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                  />
                  <ErrorMessage name={id} component="div" className="text-red-500 text-sm mt-1" />
                </div>
              ))}
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
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white text-sm"
              />
              <ErrorMessage name="mainImage" component="div" className="text-red-500 text-sm mt-1" />
              {values.mainImage && typeof values.mainImage !== "string" && (
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
                      const file = e.currentTarget.files?.[0] || "";
                      const newImages = [...values.images];
                      newImages[index] = file;
                      setFieldValue("images", newImages);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white text-sm"
                  />
                  {img && typeof img !== "string" && (
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
                  setFieldValue("images", [...values.images, ""]);
                }}
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-900 dark:text-blue-100 bg-blue-100 dark:bg-blue-800 border border-blue-300 dark:border-blue-600 rounded-md hover:bg-blue-200 dark:hover:bg-blue-700 transition-all duration-200"
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
              {[
                { name: "hasGrill", label: "Parrilla" },
                { name: "hasGarage", label: "Cochera" },
                { name: "hasSwimmingPool", label: "Piscina" },
              ].map(({ name, label }) => (
                <label key={name} className="flex items-center gap-1">
                  <Field type="checkbox" name={name} />
                  {label}
                </label>
              ))}
            </div>

            {/* Botón guardar */}
            <button
              type="submit"
              disabled={isSubmitting || updating}
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-2 rounded-md"
            >
              {isSubmitting || updating ? "Guardando..." : "Guardar cambios"}
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditCabinDashboardPage;
