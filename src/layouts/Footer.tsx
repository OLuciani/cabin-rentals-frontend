export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="absolute bottom-0 w-[100vw] bg-primary dark:bg-darkPrimary p-4 text-center text-white dark:text-gray-200">
        {/* Fondo gris oscuro */}
        <p>
          &copy; Todos los derechos reservados {currentYear}.
        </p>
      </footer>
    );
  }