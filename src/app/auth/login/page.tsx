// Página de inicio de sesión.
//
// Esta vista renderiza el componente `LoginForm`, que contiene
// la lógica y presentación del formulario de login del usuario.
//
// Forma parte del módulo `auth` y está ubicada en `auth/login`.

import LoginForm from '@/features/auth/login/components/LoginForm';


export default function LoginPage() {
  return (
    <main className="w-screen h-screen px-4 flex items-center justify-center">
      <LoginForm />   
    </main>
  );
}
