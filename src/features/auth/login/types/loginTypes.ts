// Definiciones de tipos para el proceso de login.

// Estructura de los datos que devuelve el backend tras un login exitoso.
export interface LoginResponse {
  message: string;      // Mensaje informativo o de éxito
  user: {
    id: string;         // Identificador único del usuario
    name: string;       // Nombre del usuario
    lastName: string;   // Apellido del usuario
    email: string;      // Email del usuario
    role: string;       // Rol del usuario (ej. admin, user)
  };
}

// Estructura de los datos que se envían al backend para iniciar sesión.
export interface LoginRequest {
  email: string;     // Email para autenticación
  password: string;  // Contraseña del usuario
}