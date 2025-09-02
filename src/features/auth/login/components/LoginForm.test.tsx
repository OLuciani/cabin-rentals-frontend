/* /// <reference types="@testing-library/jest-dom" />

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';
import { getUser } from '../services/getUser';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// Mocks
jest.mock('../services/getUser', () => ({
  getUser: jest.fn(),
}));

jest.mock('@/store/useAuthStore', () => ({
  useAuthStore: jest.fn(),
}));

// Mock del router para solucionar el error "invariant expected app router to be mounted"
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(), // Mockeamos error también para ser completos
  },
}));

// Asignamos tipos a los mocks para mayor seguridad y autocompletado
const mockedUseAuthStore = useAuthStore as unknown as jest.Mock;
const mockedUseRouter = useRouter as unknown as jest.Mock;
const mockedGetUser = getUser as unknown as jest.Mock;
const mockedToast = toast as jest.Mocked<typeof toast>;

describe('LoginForm', () => {
  // Setup antes de cada test
  beforeEach(() => {
    jest.clearAllMocks();

    // Implementación por defecto del mock del router
    mockedUseRouter.mockReturnValue({
      push: jest.fn(),
    });
  });

  // Tests
  test('renderiza correctamente el formulario', () => {
    // Usamos mockImplementation para ser consistentes y robustos
    mockedUseAuthStore.mockImplementation((selector) => selector({ login: jest.fn() }));
    render(<LoginForm />);

    expect(screen.getByRole('heading', { level: 2, name: /Iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ingresá tu email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ingresá tu contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar sesión/i })).toBeInTheDocument();
  });

  test('muestra errores de validación si los campos están vacíos', async () => {
    // Usamos mockImplementation para ser consistentes y robustos
    mockedUseAuthStore.mockImplementation((selector) => selector({ login: jest.fn() }));
    const user = userEvent.setup();
    render(<LoginForm />);

    const submitButton = screen.getByRole('button', { name: /Iniciar sesión/i });
    await user.click(submitButton);

    expect(await screen.findByText(/El email es obligatorio/i)).toBeInTheDocument();
    expect(await screen.findByText(/La contraseña es obligatoria/i)).toBeInTheDocument();
  });

  test('login exitoso llama a las funciones correctas y redirige', async () => {
    // Hacemos que el mock de login sea una función asíncrona que resuelve una promesa.
    // Esto simula el caso en que el componente podría hacer `await login(user)`
    // antes de redirigir.
    const loginMock = jest.fn().mockResolvedValue(undefined);
    const pushMock = jest.fn();

    // CORRECCIÓN CLAVE: Usamos mockImplementation para que el selector de Zustand funcione.
    // Esto asegura que `useAuthStore(state => state.login)` devuelva `loginMock` correctamente.
    mockedUseAuthStore.mockImplementation((selector) => {
      const state = { login: loginMock, user: null, isLoggedIn: false, isLoadingUser: false };
      // Ejecutamos el selector que el componente usa sobre nuestro estado falso.
      return selector(state);
    });

    mockedUseRouter.mockReturnValue({ push: pushMock });

    // CORRECCIÓN FINAL: El componente espera un objeto con una propiedad `user` anidada.
    mockedGetUser.mockResolvedValue({ user: { id: 1, email: 'test@test.com' } });

    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByPlaceholderText(/Ingresá tu email/i), 'test@test.com');
    await user.type(screen.getByPlaceholderText(/Ingresá tu contraseña/i), '123456');
    await user.click(screen.getByRole('button', { name: /Iniciar sesión/i }));

    await waitFor(() => {
      // Verificamos que todas las acciones post-login se ejecuten correctamente
      expect(mockedGetUser).toHaveBeenCalledWith({ email: 'test@test.com', password: '123456' });
      expect(loginMock).toHaveBeenCalledWith({ id: 1, email: 'test@test.com' }); // Esta vez `loginMock` recibirá el objeto correcto
      expect(mockedToast.success).toHaveBeenCalledWith('Has iniciado sesión correctamente');
    });
  });

  test('muestra un error del servidor si el login falla', async () => {
    // Usamos mockImplementation para ser consistentes y robustos
    mockedUseAuthStore.mockImplementation((selector) => selector({ login: jest.fn() }));
    mockedGetUser.mockRejectedValue({
      response: { data: { message: 'Usuario no encontrado' } },
    });

    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByPlaceholderText(/Ingresá tu email/i), 'wrong@test.com');
    await user.type(screen.getByPlaceholderText(/Ingresá tu contraseña/i), '123456');
    await user.click(screen.getByRole('button', { name: /Iniciar sesión/i }));

    expect(await screen.findByText(/Usuario no encontrado/i)).toBeInTheDocument();
  });
}); */




/// <reference types="@testing-library/jest-dom" />

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';
import { getUser } from '../services/getUser';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// Mocks
jest.mock('../services/getUser', () => ({
  getUser: jest.fn(),
}));

jest.mock('@/store/useAuthStore', () => ({
  useAuthStore: jest.fn(),
}));

// Mock del router para solucionar el error "invariant expected app router to be mounted"
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(), // Mockeamos error también para ser completos
  },
}));

// Asignamos tipos a los mocks para mayor seguridad y autocompletado
const mockedUseAuthStore = useAuthStore as unknown as jest.Mock;
const mockedUseRouter = useRouter as unknown as jest.Mock;
const mockedGetUser = getUser as unknown as jest.Mock;
const mockedToast = toast as jest.Mocked<typeof toast>;

// Definimos un tipo para el estado simulado de la store, para evitar usar 'any' y
// satisfacer las reglas de linting.
interface MockAuthState {
  login: (user: { id: number; email: string }) => void;
  user?: { id: number; email: string } | null;
  isLoggedIn?: boolean;
  isLoadingUser?: boolean;
}

describe('LoginForm', () => {
  // Setup antes de cada test
  beforeEach(() => {
    jest.clearAllMocks();

    // Implementación por defecto del mock del router
    mockedUseRouter.mockReturnValue({
      push: jest.fn(),
    });
  });

  // Tests
  test('renderiza correctamente el formulario', () => {
    // Usamos mockImplementation para ser consistentes y robustos
    mockedUseAuthStore.mockImplementation((selector) => selector({ login: jest.fn() }));
    render(<LoginForm />);

    expect(screen.getByRole('heading', { level: 2, name: /Iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ingresá tu email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ingresá tu contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar sesión/i })).toBeInTheDocument();
  });

  test('muestra errores de validación si los campos están vacíos', async () => {
    // Usamos mockImplementation para ser consistentes y robustos
    mockedUseAuthStore.mockImplementation((selector) => selector({ login: jest.fn() }));
    const user = userEvent.setup();
    render(<LoginForm />);

    const submitButton = screen.getByRole('button', { name: /Iniciar sesión/i });
    await user.click(submitButton);

    expect(await screen.findByText(/El email es obligatorio/i)).toBeInTheDocument();
    expect(await screen.findByText(/La contraseña es obligatoria/i)).toBeInTheDocument();
  });

  test('login exitoso llama a las funciones correctas y redirige', async () => {
    // Hacemos que el mock de login sea una función asíncrona que resuelve una promesa.
    // Esto simula el caso en que el componente podría hacer `await login(user)`
    // antes de redirigir.
    const loginMock = jest.fn().mockResolvedValue(undefined);
    const pushMock = jest.fn();

    // CORRECCIÓN CLAVE: Usamos mockImplementation para que el selector de Zustand funcione.
    // Esto asegura que `useAuthStore(state => state.login)` devuelva `loginMock` correctamente.
    mockedUseAuthStore.mockImplementation((selector) => {
      const state = { login: loginMock, user: null, isLoggedIn: false, isLoadingUser: false };
      // Ejecutamos el selector que el componente usa sobre nuestro estado falso.
      return selector(state);
    });

    mockedUseRouter.mockReturnValue({ push: pushMock });

    // CORRECCIÓN FINAL: El componente espera un objeto con una propiedad `user` anidada.
    mockedGetUser.mockResolvedValue({ user: { id: 1, email: 'test@test.com' } });

    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByPlaceholderText(/Ingresá tu email/i), 'test@test.com');
    await user.type(screen.getByPlaceholderText(/Ingresá tu contraseña/i), '123456');
    await user.click(screen.getByRole('button', { name: /Iniciar sesión/i }));

    await waitFor(() => {
      // Verificamos que todas las acciones post-login se ejecuten correctamente
      expect(mockedGetUser).toHaveBeenCalledWith({ email: 'test@test.com', password: '123456' });
      expect(loginMock).toHaveBeenCalledWith({ id: 1, email: 'test@test.com' });
      expect(mockedToast.success).toHaveBeenCalledWith('Has iniciado sesión correctamente');
      expect(pushMock).toHaveBeenCalledWith('/');
    });
  });

  test('muestra un error del servidor si el login falla', async () => {
    // Usamos mockImplementation para ser consistentes y robustos
    mockedUseAuthStore.mockImplementation(
      (selector: (state: MockAuthState) => unknown) => selector({ login: jest.fn() }),
    );
    (getUser as jest.Mock).mockRejectedValue({
      response: { data: { message: 'Usuario no encontrado' } },
    });

    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByPlaceholderText(/Ingresá tu email/i), 'wrong@test.com');
    await user.type(screen.getByPlaceholderText(/Ingresá tu contraseña/i), '123456');
    await user.click(screen.getByRole('button', { name: /Iniciar sesión/i }));

    expect(await screen.findByText(/Usuario no encontrado/i)).toBeInTheDocument();
  });
});