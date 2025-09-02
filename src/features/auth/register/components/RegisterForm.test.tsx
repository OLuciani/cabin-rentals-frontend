/// <reference types="@testing-library/jest-dom" />

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterForm from './RegisterForm';
import { registerUser } from '../services/registerUser';
import { useRouter } from 'next/navigation';

// Mocks de las dependencias externas
jest.mock('../services/registerUser', () => ({
  registerUser: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Tipamos los mocks para tener autocompletado y seguridad de tipos
const mockedRegisterUser = registerUser as jest.Mock;
const mockedUseRouter = useRouter as jest.Mock;

describe('RegisterForm', () => {
  // Mock de window.scrollTo para evitar el error "Not implemented" en JSDOM
  window.scrollTo = jest.fn();

  let pushMock: jest.Mock;

  beforeEach(() => {
    // Limpiamos todos los mocks antes de cada test para asegurar aislamiento
    jest.clearAllMocks();

    // Configuramos el mock del router para cada test
    pushMock = jest.fn();
    mockedUseRouter.mockReturnValue({
      push: pushMock,
    });
  });

  test('renderiza el formulario de registro correctamente', () => {
    render(<RegisterForm />);

    expect(screen.getByRole('heading', { name: /crear cuenta/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/apellido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^contraseña$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrarse/i })).toBeInTheDocument();
  });

  test('muestra errores de validación si se envía el formulario vacío', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    await user.click(screen.getByRole('button', { name: /registrarse/i }));

    expect(await screen.findByText('El nombre es obligatorio')).toBeInTheDocument();
    expect(await screen.findByText('El Apellido es obligatorio')).toBeInTheDocument();
    expect(await screen.findByText('El email es obligatorio')).toBeInTheDocument();
    expect(await screen.findByText('La contraseña es obligatoria')).toBeInTheDocument();
    expect(await screen.findByText('Debes confirmar la contraseña')).toBeInTheDocument();
  });

  test('muestra un error si las contraseñas no coinciden', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    await user.type(screen.getByLabelText(/nombre/i), 'John');
    await user.type(screen.getByLabelText(/apellido/i), 'Doe');
    await user.type(screen.getByLabelText(/email/i), 'john.doe@test.com');
    await user.type(screen.getByLabelText(/^contraseña$/i), 'password123');
    await user.type(screen.getByLabelText(/confirmar contraseña/i), 'password456');

    await user.click(screen.getByRole('button', { name: /registrarse/i }));

    expect(await screen.findByText('Las contraseñas no coinciden')).toBeInTheDocument();
    expect(mockedRegisterUser).not.toHaveBeenCalled();
  });

  test('registra un usuario exitosamente, muestra mensaje y redirige', async () => {
    const user = userEvent.setup();
    // Simulamos que el registro es exitoso
    mockedRegisterUser.mockResolvedValue(undefined);

    render(<RegisterForm />);

    const nameInput = screen.getByLabelText(/nombre/i);
    const lastNameInput = screen.getByLabelText(/apellido/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^contraseña$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar contraseña/i);
    const submitButton = screen.getByRole('button', { name: /registrarse/i });

    await user.type(nameInput, 'Jane');
    await user.type(lastNameInput, 'Doe');
    await user.type(emailInput, 'jane.doe@test.com');
    await user.type(passwordInput, 'password123');
    await user.type(confirmPasswordInput, 'password123');

    await user.click(submitButton);

    // waitFor re-ejecuta el callback hasta que todas las aserciones pasen o se agote el tiempo.
    // Esto es ideal para esperar que todos los efectos del envío del formulario se completen.
    await waitFor(() => {
      // 1. Verificamos que se llamó al servicio con los datos correctos
      expect(mockedRegisterUser).toHaveBeenCalledWith({
        name: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@test.com',
        password: 'password123',
        confirmPassword: 'password123',
      });

      // 2. Verificamos que se muestra el mensaje de éxito
      expect(screen.getByText('Usuario registrado correctamente 🎉')).toBeInTheDocument();

      // 3. Verificamos que el formulario se reseteó (los campos se vaciaron)
      expect(nameInput).toHaveValue('');

      // 4. Verificamos que se redirige al login
      expect(pushMock).toHaveBeenCalledWith('/auth/login');
    });
  });

  test('muestra un error del servidor si el registro falla', async () => {
    const user = userEvent.setup();
    // Simulamos que el registro falla con un error (ej. email ya existe)
    mockedRegisterUser.mockRejectedValue(new Error('El email ya está en uso'));

    render(<RegisterForm />);

    await user.type(screen.getByLabelText(/nombre/i), 'Jane');
    await user.type(screen.getByLabelText(/apellido/i), 'Doe');
    await user.type(screen.getByLabelText(/email/i), 'jane.doe@test.com');
    await user.type(screen.getByLabelText(/^contraseña$/i), 'password123');
    await user.type(screen.getByLabelText(/confirmar contraseña/i), 'password123');

    await user.click(screen.getByRole('button', { name: /registrarse/i }));

    // Verificamos que se muestra el mensaje de error del servidor
    expect(await screen.findByText('El email ya está en uso')).toBeInTheDocument();

    // Verificamos que el mensaje de éxito NO se muestra
    expect(screen.queryByText('Usuario registrado correctamente 🎉')).not.toBeInTheDocument();

    // Verificamos que NO se intentó redirigir
    expect(pushMock).not.toHaveBeenCalled();
  });
});