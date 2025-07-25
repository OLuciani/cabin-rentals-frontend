/* "use client";

import { useState, useEffect } from "react";
import { CabinFormData, ICabin } from "@/features/cabins/types/cabinComplete";
import { getCabinDetail } from "@/features/cabins/cabinDetail/services/cabinDetailService";
import { useUpdateCabin } from "@/features/cabins/cabinDetail/hooks/useUpdateCabin";

interface Props {
  cabinId: string;
  onBack: () => void;
}

const EditCabinDashboardPage: React.FC<Props> = ({ cabinId, onBack }) => {
  const [formData, setFormData] = useState<CabinFormData | null>(null);
  const [loading, setLoading] = useState(true);
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

        setFormData({
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
      } catch (error) {
        console.error("Error al cargar la cabaña:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCabin();
  }, [cabinId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      await updateCabin(cabinId, formData);
      alert("Cabaña actualizada con éxito");
      onBack();
    } catch (error) {
      console.error("Error al actualizar la cabaña:", error);
      alert("Error al actualizar la cabaña");
    }
  };

  if (loading || !formData) return <p>Cargando cabaña...</p>;

  return (
    <div className="w-full max-w-lg sm:max-w-xl mx-auto bg-white text-black p-4 rounded-xl shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl text-center font-bold">Editar Cabaña</h2>

        <input
            type="text"
            placeholder="Nombre"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border px-3 py-2"
        />

        <textarea
            placeholder="Descripción"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border px-3 py-2"
        />

       

        <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={updating}
        >
            {updating ? "Guardando..." : "Guardar cambios"}
        </button>

        <button
            type="button"
            onClick={onBack}
            className="ml-4 text-sm text-gray-500 underline"
        >
            Cancelar
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
    </div>
  );
};

export default EditCabinDashboardPage; */





/* "use client";

import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { CabinFormData, ICabin } from "@/features/cabins/types/cabinComplete";
import { getCabinDetail } from "@/features/cabins/cabinDetail/services/cabinDetailService";
import { useUpdateCabin } from "@/features/cabins/cabinDetail/hooks/useUpdateCabin";

interface Props {
  cabinId: string;
  onBack: () => void;
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

const EditCabinDashboardPage: React.FC<Props> = ({ cabinId, onBack }) => {
  const [initialValues, setInitialValues] = useState<CabinFormData | null>(null);
  const [imageCount, setImageCount] = useState(1);
  const { updateCabin, loading, error } = useUpdateCabin();

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
        setImageCount(images.length || 1);
      } catch (error) {
        console.error("Error al cargar la cabaña:", error);
      }
    };

    fetchCabin();
  }, [cabinId]);

  if (!initialValues) return <p>Cargando cabaña...</p>;

  return (
    <div className="w-full max-w-lg sm:max-w-xl mx-auto bg-white text-black p-4 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Editar cabaña
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await updateCabin(cabinId, values);
          onBack();
        }}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block font-medium mb-1" htmlFor="name">Nombre</label>
              <Field name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block font-medium mb-1" htmlFor="description">Descripción</label>
              <Field as="textarea" name="description" className="w-full px-3 py-2 border border-gray-300 rounded-md h-24 resize-none" />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block font-medium mb-1" htmlFor="location">Ubicación</label>
              <Field name="location" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              <ErrorMessage name="location" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="pricePerNight">Precio por noche</label>
                <Field type="number" name="pricePerNight" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                <ErrorMessage name="pricePerNight" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="maxGuests">Capacidad máxima</label>
                <Field type="number" name="maxGuests" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                <ErrorMessage name="maxGuests" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="rooms">Habitaciones</label>
                <Field type="number" name="rooms" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                <ErrorMessage name="rooms" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="bathrooms">Baños</label>
                <Field type="number" name="bathrooms" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                <ErrorMessage name="bathrooms" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1" htmlFor="mainImage">Imagen principal</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFieldValue("mainImage", e.currentTarget.files?.[0] || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
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
                      const file = e.currentTarget.files?.[0] || null;
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
                  setFieldValue("images", [...values.images, null]);
                  setImageCount((prev) => prev + 1);
                }}
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-blue-300 rounded-md hover:bg-blue-200"
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
                <Field type="checkbox" name="hasGrill" /> Parrilla
              </label>
              <label className="flex items-center gap-1">
                <Field type="checkbox" name="hasGarage" /> Cochera
              </label>
              <label className="flex items-center gap-1">
                <Field type="checkbox" name="hasSwimmingPool" /> Piscina
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
            >
              {isSubmitting || loading ? "Guardando..." : "Guardar cambios"}
            </button>

            <button
              type="button"
              onClick={onBack}
              className="ml-4 text-sm text-gray-500 underline"
            >
              Cancelar
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditCabinDashboardPage; */



// Funciona bien pero no tiene labels
/* "use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";

import { getCabinDetail } from "@/features/cabins/cabinDetail/services/cabinDetailService";
import { useUpdateCabin } from "@/features/cabins/cabinDetail/hooks/useUpdateCabin";
import { CabinFormData, ICabin } from "@/features/cabins/types/cabinComplete";

interface Props {
  cabinId: string;
  onBack: () => void;
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

const EditCabinDashboardPage: React.FC<Props> = ({ cabinId, onBack }) => {
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
      <h2 className="text-2xl font-semibold mb-6 text-center">Editar Cabaña</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            await updateCabin(cabinId, values);
            alert("Cabaña actualizada con éxito");
            onBack();
          } catch (error) {
            console.error("Error al actualizar la cabaña:", error);
            alert("Error al actualizar la cabaña");
          }
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="space-y-4">
            <Field name="name" className="w-full px-3 py-2 border rounded" placeholder="Nombre" />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

            <Field
              as="textarea"
              name="description"
              className="w-full px-3 py-2 border rounded"
              placeholder="Descripción"
            />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />

            <Field name="location" className="w-full px-3 py-2 border rounded" placeholder="Ubicación" />
            <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />

            <Field name="pricePerNight" type="number" className="w-full px-3 py-2 border rounded" placeholder="Precio por noche" />
            <Field name="maxGuests" type="number" className="w-full px-3 py-2 border rounded" placeholder="Capacidad máxima" />
            <Field name="rooms" type="number" className="w-full px-3 py-2 border rounded" placeholder="Habitaciones" />
            <Field name="bathrooms" type="number" className="w-full px-3 py-2 border rounded" placeholder="Baños" />

            <div>
              <label>Imagen principal</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFieldValue("mainImage", e.currentTarget.files?.[0] || null)}
                className="w-full px-3 py-2 border rounded bg-white"
              />
              {values.mainImage && typeof values.mainImage !== "string" && (
                <Image
                  src={URL.createObjectURL(values.mainImage)}
                  alt="Preview imagen principal"
                  width={300}
                  height={200}
                  className="mt-2 rounded object-cover"
                />
              )}
            </div>

            <div>
              <label>Imágenes secundarias</label>
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
                    className="w-full px-3 py-2 border rounded bg-white"
                  />
                  {img && typeof img !== "string" && (
                    <Image
                      src={URL.createObjectURL(img)}
                      alt={`Imagen secundaria ${index + 1}`}
                      width={250}
                      height={160}
                      className="mt-2 rounded object-cover"
                    />
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => setFieldValue("images", [...values.images, null])}
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-blue-300 rounded-md hover:bg-blue-200"
              >
                + Agregar otra imagen secundaria
              </button>
            </div>

            <div>
              <label>Comodidades</label>
              <div className="flex flex-wrap gap-2">
                {amenitiesOptions.map((amenity) => (
                  <label key={amenity} className="text-sm flex items-center gap-1">
                    <Field type="checkbox" name="amenities" value={amenity} className="accent-blue-500" />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <Field type="checkbox" name="hasGrill" /> Parrilla
              </label>
              <label className="flex items-center gap-1">
                <Field type="checkbox" name="hasGarage" /> Cochera
              </label>
              <label className="flex items-center gap-1">
                <Field type="checkbox" name="hasSwimmingPool" /> Piscina
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || updating}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              {isSubmitting || updating ? "Guardando..." : "Guardar cambios"}
            </button>

            <button
              type="button"
              onClick={onBack}
              className="mt-2 text-sm text-gray-500 underline"
            >
              Cancelar
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditCabinDashboardPage; */



// Es el que mejor funciona, pero no cambia las imagenes 
"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { toast } from 'react-toastify';

import { getCabinDetail } from "@/features/cabins/cabinDetail/services/cabinDetailService";
import { useUpdateCabin } from "@/features/cabins/cabinDetail/hooks/useUpdateCabin";
import { CabinFormData, ICabin } from "@/features/cabins/types/cabinComplete";

interface Props {
  cabinId: string;
  onBack: () => void;
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

const EditCabinDashboardPage: React.FC<Props> = ({ cabinId, onBack }) => {
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
      <h2 className="text-2xl font-semibold mb-6 text-center">Editar Cabaña</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            await updateCabin(cabinId, values);
            toast.success("Cabaña actualizada con éxito");
            onBack();
          } catch (error) {
            console.error("Error al actualizar la cabaña:", error);
            //alert("Error al actualizar la cabaña");
            toast.error("Error al actualizar la cabaña");
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

            <button
              type="button"
              onClick={onBack}
              className="mt-2 text-sm text-gray-500 underline"
            >
              Cancelar
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditCabinDashboardPage;
