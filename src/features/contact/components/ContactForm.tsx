"use client";

import { useState } from "react";
import { ContactFormData } from "../types/contact";

interface ContactFormProps {
  onSubmit: () => void;
}

const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

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
    onSubmit();
  };

  return (
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
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
      >
        Enviar mensaje
      </button>
    </form>
  );
};

export default ContactForm;