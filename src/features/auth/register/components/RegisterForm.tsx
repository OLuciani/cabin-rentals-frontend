'use client';

/**
 * Formulario de registro de usuarios.
 *
 * Este componente permite a los usuarios crear una cuenta ingresando nombre, apellido, email y contraseña.
 * Utiliza Formik para manejar el estado del formulario, validación con Yup, y muestra mensajes de éxito o error.
 * Al registrarse correctamente, redirige al usuario a la página de login.
 */

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../services/registerUser';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const [success, setSuccess] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const router = useRouter();

  const initialValues = {
    name: '',
    lastName: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('El nombre es obligatorio')
      .min(2, 'Debe tener al menos 2 caracteres'),
    lastName: Yup.string()
    .required('El Apellido es obligatorio')
    .min(2, 'Debe tener al menos 2 caracteres'),
    email: Yup.string()
      .email('Email inválido')
      .required('El email es obligatorio'),
    password: Yup.string()
      .required('La contraseña es obligatoria')
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    try {
      await registerUser(values); // ✅ eliminamos `res` si no se usa
      setSuccess('Usuario registrado correctamente 🎉');
      setServerError(null);
      resetForm();
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError('Ocurrió un error inesperado');
      }
      setSuccess(null);
    }
  };

  return (
    <div className="w-full bg-white text-textPrimary p-6 rounded-xl shadow-md max-w-md border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-center">Crear cuenta</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* Campo: Nombre */}
            <div>
              <label htmlFor="name" className="block mb-1 text-sm font-medium">Nombre</label>
              <Field name="name" type="text" className="input border border-gray-300 rounded-lg p-2 text-black w-full" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Campo: Apellido */}
            <div>
              <label htmlFor="lastName" className="block mb-1 text-sm font-medium">Apellido</label>
              <Field name="lastName" type="text" className="input border border-gray-300 rounded-lg p-2 text-black w-full" />
              <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Campo: Email */}
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium">Email</label>
              <Field name="email" type="email" className="input border border-gray-300 rounded-lg p-2 text-black w-full" />
              
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Campo: Contraseña */}
            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium">Contraseña</label>
              <Field name="password" type="password" className="input border border-gray-300 rounded-lg p-2 text-black w-full" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
            >
              {isSubmitting ? 'Registrando...' : 'Registrarse'}
            </button>

            {/* Mensajes de éxito o error */}
            {success && <div className="text-green-600 text-center mt-2">{success}</div>}
            {serverError && <div className="text-red-600 text-center mt-2">{serverError}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;