/// <reference types="@testing-library/jest-dom" />

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewBookingPage from "./NewBookingPageClient";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "../../../../store/useAuthStore";
import { useCreateBooking } from "../hooks/useCreateBooking";

// --- Mocks ---

// Mock de Next.js navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Mock del store de autenticación (Zustand)
jest.mock("../../../../store/useAuthStore");

// Mock del custom hook para crear la reserva
jest.mock("../hooks/useCreateBooking");

// Mock del modal de éxito para verificar que se abre
jest.mock("../../../../components/modals/BookingSuccessModal", () => {
  return jest.fn(({ open, confirmationCode }) => {
    if (!open) return null;
    return (
      <div data-testid="booking-success-modal">
        <p>Modal de Éxito</p>
        <p>Código: {confirmationCode}</p>
      </div>
    );
  });
});

// Tipamos los mocks para tener autocompletado y seguridad
const mockedUseRouter = useRouter as jest.Mock;
const mockedUseSearchParams = useSearchParams as jest.Mock;
const mockedUseAuthStore = useAuthStore as unknown as jest.Mock;
const mockedUseCreateBooking = useCreateBooking as jest.Mock;

// Definimos tipos más específicos para nuestros mocks para evitar el uso de 'any'
// y satisfacer las reglas de linting.
interface MockUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
}

type MockAuthState = { user: MockUser | null };

describe("NewBookingPage", () => {
  const mockPush = jest.fn();
  const mockSubmitBooking = jest.fn();

  // Datos de prueba consistentes
  const mockUser = {
    id: "user-123",
    name: "Laura",
    lastName: "Prueba",
    email: "laura@test.com",
  };

  const mockSearchParams = new URLSearchParams({
    cabinId: "cabin-001",
    cabinName: "Cabaña del Lago",
    startDate: "2024-12-24T00:00:00.000Z",
    endDate: "2024-12-28T00:00:00.000Z",
    guests: "2",
  });

  beforeEach(() => {
    // Limpiamos los mocks antes de cada test
    jest.clearAllMocks();

    // Configuración por defecto de los mocks
    mockedUseRouter.mockReturnValue({ push: mockPush });
    mockedUseSearchParams.mockReturnValue(mockSearchParams);
    // Usamos mockImplementation para que el selector `state => state.user` funcione
    mockedUseAuthStore.mockImplementation(
      (selector: (state: MockAuthState) => unknown) =>
        selector({ user: mockUser })
    );
    mockedUseCreateBooking.mockReturnValue({
      loading: false,
      feedback: null,
      error: null,
      confirmationCode: null,
      submitBooking: mockSubmitBooking,
    });
  });

  test("renderiza los detalles de la reserva y los datos del usuario correctamente", () => {
    render(<NewBookingPage />);

    // Verifica el título
    expect(screen.getByRole("heading", { name: /confirmar reserva/i })).toBeInTheDocument();

    // Verifica los detalles de la reserva
    expect(screen.getByText("Cabaña del Lago")).toBeInTheDocument();
    // Ajustamos la fecha esperada debido a la conversión de zona horaria (UTC a local)
    // 2024-12-24T00:00:00.000Z es el 23/12 en la mayoría de las zonas horarias de América
    expect(screen.getByText("23/12/2024")).toBeInTheDocument();
    expect(screen.getByText("27/12/2024")).toBeInTheDocument();

    // Verifica los datos del usuario
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.lastName)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();

    // Verifica que el input de huéspedes tiene el valor inicial de los parámetros
    expect(screen.getByLabelText(/cantidad de huéspedes/i)).toHaveValue(2);
  });

  test("permite al usuario cambiar el número de huéspedes", async () => {
    const user = userEvent.setup();
    render(<NewBookingPage />);

    const guestsInput = screen.getByLabelText(/cantidad de huéspedes/i);
    await user.clear(guestsInput);
    await user.type(guestsInput, "4");

    expect(guestsInput).toHaveValue(4);
  });

  test("llama a submitBooking con los datos correctos y muestra el modal de éxito", async () => {
    const user = userEvent.setup();
    // Configuramos el hook para simular una respuesta exitosa
    mockedUseCreateBooking.mockReturnValue({
      loading: false,
      feedback: null,
      error: null,
      confirmationCode: "BOOK-12345", // Código que abrirá el modal
      submitBooking: mockSubmitBooking,
    });

    render(<NewBookingPage />);

    // El usuario cambia el número de huéspedes
    const guestsInput = screen.getByLabelText(/cantidad de huéspedes/i);
    await user.clear(guestsInput);
    await user.type(guestsInput, "3");

    // El usuario confirma la reserva
    await user.click(screen.getByRole("button", { name: /confirmar reserva/i }));

    // Verificamos que la función de submit fue llamada con el payload correcto
    await waitFor(() => {
      expect(mockSubmitBooking).toHaveBeenCalledWith({
        cabinId: "cabin-001",
        userId: "user-123",
        startDate: new Date("2024-12-24T00:00:00.000Z"),
        endDate: new Date("2024-12-28T00:00:00.000Z"),
        numberOfGuests: 3, // El nuevo valor
      });
    });

    // Verificamos que el modal de éxito se muestra con el código correcto
    expect(screen.getByTestId("booking-success-modal")).toBeInTheDocument();
    expect(screen.getByText("Código: BOOK-12345")).toBeInTheDocument();
  });

  test("muestra un mensaje de error si la reserva falla", async () => {
    // Configuramos el hook para simular un error
    mockedUseCreateBooking.mockReturnValue({
      loading: false,
      feedback: null,
      error: "La cabaña no está disponible en esas fechas.",
      confirmationCode: null,
      submitBooking: mockSubmitBooking,
    });

    render(<NewBookingPage />);

    // El usuario intenta confirmar
    await userEvent.click(screen.getByRole("button", { name: /confirmar reserva/i }));

    // Verificamos que el mensaje de error se muestra
    expect(await screen.findByText("La cabaña no está disponible en esas fechas.")).toBeInTheDocument();
  });
});