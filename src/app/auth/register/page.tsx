// Página de registro de usuarios.
//
// Renderiza el componente `RegisterForm`, que contiene el formulario y la lógica para crear una nueva cuenta.
// Esta vista ocupa toda la pantalla y centra el contenido vertical y horizontalmente.

import RegisterForm from '@/features/auth/register/components/RegisterForm';

export default function RegisterPage() {
  return (
    <main className="w-screen h-auto py-6 px-4 flex items-start justify-center">
      <RegisterForm />
    </main>
  );
}