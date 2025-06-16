/* "use client";

import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Contacto</h1>
        <p className="mb-10 text-center">
          ¿Tenés preguntas, sugerencias o querés comunicarte con nosotros? Completá el formulario y te responderemos pronto.
        </p>

        <div className="bg-gray-100 dark:bg-gray-800 p-6 md:p-10 rounded-lg shadow-md grid md:grid-cols-2 gap-10">
          
          <div className="space-y-6 flex flex-col justify-between">
            {submitted ? (
              <div className="text-green-600 font-medium text-center md:text-left">
                ¡Gracias por tu mensaje! Te responderemos a la brevedad.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium" htmlFor="name">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium" htmlFor="email">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium" htmlFor="message">
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-accent dark:bg-darkAccent hover:bg-darkAccent dark:hover:bg-accent text-white font-bold py-2 px-4 rounded transition"
                >
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>

          
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
                  className="text-blue-600 hover:text-blue-800"
                >
                  Instagram
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Facebook
                </a>
                <a
                  href="https://wa.me/5491112345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; */



"use client";

import ContactLayout from "../../features/contact/components/ContactLayout";

export default function ContactPage() {
  return <ContactLayout />;
}