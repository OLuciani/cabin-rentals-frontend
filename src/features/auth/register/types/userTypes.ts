/**
 * Tipos utilizados para el proceso de registro de usuarios.
 *
 * - `RegisterUserDTO`: estructura de los datos que se envían al backend para crear un nuevo usuario.
 * - `RegisteredUser`: estructura esperada de la respuesta que devuelve el backend al registrar exitosamente al usuario.
 */

export interface RegisterUserDTO {
    name: string;
    email: string;
    password: string;
  }
  
  export interface RegisteredUser {
    _id: string;
    name: string;
    email: string;
  }