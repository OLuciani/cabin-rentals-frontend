"use client";

import { useState } from "react";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

const ContactLayout = () => {
  const [submitted, setSubmitted] = useState(false);

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