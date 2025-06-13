export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="w-full bg-primary dark:bg-darkPrimary font-semibold text-white dark:text-gray-200 px-4 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg text-center">
        {/* Fondo gris oscuro */}
        <p>
          &copy; Todos los derechos reservados {currentYear}.
        </p>
      </footer>
    );
  }
