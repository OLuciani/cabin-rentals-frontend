"use client";

import { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

const ContactLayout = () => {
  const [submitted, setSubmitted] = useState(false);

  // Este useEffect asegura que el componente se muestre scrolleado al inicio cada vez que se monta en el dashboard src/dashboardAppAdmin/page.tsx.
  useEffect(() => {
    // Intentamos scroll en main y también en body/html por si acaso
    const main = document.getElementById("dashboard-scroll-container");
    if (main) {
      main.scrollTop = 0;
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white pt-4 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Contacto</h1>
        <p className="mb-10 text-center">
          ¿Tenés preguntas, sugerencias o querés comunicarte con nosotros?
          Completá el formulario y te responderemos pronto.
        </p>

        <div className="bg-gray-100 dark:bg-gray-800 p-6 md:p-10 rounded-lg shadow-md grid md:grid-cols-2 gap-10">
          <div className="space-y-6 flex flex-col justify-between">
            {submitted ? (
              <div className="text-green-600 font-medium text-center md:text-left">
                ¡Gracias por tu mensaje! Te responderemos a la brevedad.
              </div>
            ) : (
              <ContactForm onSubmit={() => setSubmitted(true)} />
            )}
          </div>

          <ContactInfo />
        </div>
      </div>
    </div>
  );
};

export default ContactLayout;
