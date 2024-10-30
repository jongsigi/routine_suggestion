"use client"; // Add this at the very top

import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const { message } = await response.json();
        setError(message || "Failed to send message.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-5 p-4 md:p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl md:text-3xl font-semibold text-center mb-4">Contact Us</h1>
      {submitted ? (
        <div className="text-center text-green-600 text-lg">Thank you for contacting us!</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm md:text-base font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 md:p-3 text-sm md:text-base"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm md:text-base font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 md:p-3 text-sm md:text-base"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm md:text-base font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-2 md:p-3 text-sm md:text-base"
            ></textarea>
          </div>
          {error && <div className="text-red-600 text-center text-sm md:text-base">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 md:py-3 rounded-lg hover:bg-blue-700 transition text-sm md:text-base"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
