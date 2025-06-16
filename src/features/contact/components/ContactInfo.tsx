const ContactInfo = () => {
  return (
    <div className="space-y-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-3">Información de contacto</h2>
        <p><strong>Email:</strong> contacto@cabinrentals.com</p>
        <p><strong>Teléfono:</strong> +54 9 11 1234-5678</p>
        <p><strong>Dirección:</strong> Patagonia, Argentina</p>
        <p><strong>Horario:</strong> Lunes a Viernes de 9 a 18 hs</p>
      </div>

      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3217.507733080555!2d-71.30941392337973!3d-41.133472343429584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x961a751c15c6ab09%3A0x7bb1c96fd043b03a!2sSan%20Carlos%20de%20Bariloche%2C%20R%C3%ADo%20Negro!5e0!3m2!1ses!2sar!4v1710000000000!5m2!1ses!2sar"
          width="100%"
          height="200"
          loading="lazy"
          allowFullScreen
          className="border-0 w-full rounded-md"
        ></iframe>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Nuestras redes</h2>
        <div className="flex gap-6 cursor-pointer">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 dark:bg-white dark:p-2 rounded-md"
          >
            Instagram
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 dark:bg-white dark:p-2 rounded-md"
          >
            Facebook
          </a>
          <a
            href="https://wa.me/5491112345678"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-800 dark:bg-white dark:p-2 rounded-md"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;