'use client';

/**
 * Componente de formulario de inicio de sesión.
 *
 * Este componente renderiza un formulario validado con Formik y Yup
 * que permite a los usuarios autenticarse con su email y contraseña.
 *
 * Al enviar el formulario, se consulta la API mediante `getUser`,
 * y si la autenticación es exitosa, se guarda el usuario en el store Zustand
 * y se redirige a la página principal.
 *
 * También se muestra manejo de errores, mensajes de validación y feedback visual.
 */

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from '../services/getUser';
import { AxiosError } from 'axios';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'react-toastify';



const LoginForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

   // Traemos la función login desde el store Zustand
   const login = useAuthStore((state) => state.login);


  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
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
      const response = await getUser(values);
      login(response.user); // si no tenés token aún, pasamos string vacío por ahora

      setServerError(null);
      resetForm();
      console.log("Valor de response: ", response);

      toast.success("Has iniciado sesión correctamente");

      setTimeout(() => {  
        router.push('/'); // redirige a página deseada
      }, 3000); 
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || 'Error al iniciar sesión';
        setServerError(message);
      }
  };

  return (
    <div className="w-full bg-white text-textPrimary p-6 rounded-xl shadow-md max-w-md border-[1px] border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-center">Iniciar sesión</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium">Email</label>
              <Field name="email" type="email" className="input border border-gray-300 rounded-lg p-2 text-black w-full" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium">Contraseña</label>
              <Field name="password" type="password" className="input border border-gray-300 rounded-lg p-2 text-black w-full" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
            >
              {isSubmitting ? 'Ingresando...' : 'Iniciar sesión'}
            </button>

            {serverError && <div className="text-red-600 text-center mt-2">{serverError}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
