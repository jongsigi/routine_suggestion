"use client";

import { useState } from "react";
import emailjs from "emailjs-com";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // To track the loading state

  // Handle changes in form inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Set loading to true when submitting

    // Ensure environment variables are available
    const serviceKey = process.env.NEXT_PUBLIC_MAIL_SERVER_SERVICE_KEY;
    const templateKey = process.env.NEXT_PUBLIC_MAIL_SERVER_TEMPLATE_KEY;
    const userKey = process.env.NEXT_PUBLIC_MAIL_SERVER_USER_KEY;

    if (!serviceKey || !templateKey || !userKey) {
      setError("EmailJS configuration is missing. Please check your environment variables.");
      setLoading(false); // Reset loading state if there is an error
      return;
    }

    try {
      const result = await emailjs.send(
        serviceKey,
        templateKey,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        userKey
      );

      if (result.status === 200) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" }); // Clear form on successful submit
      } else {
        setError("Failed to send the message. Please try again.");
      }
    } catch (error) {
      console.error("Error while sending email:", error); // Log the full error for debugging
      setError("An error occurred while sending the email. Please try again.");
    } finally {
      setLoading(false); // Reset loading state after the request
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
            disabled={loading} // Disable the button while loading
            className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white font-medium py-2 md:py-3 rounded-lg hover:bg-blue-700 transition text-sm md:text-base`}
          >
            {loading ? "Sending..." : "Send Message"} {/* Show loading text */}
          </button>
        </form>
      )}
    </div>
  );
}
