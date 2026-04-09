import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import apiService from "../../api";
import { motion } from "framer-motion";

const ContactUs = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ type: "", text: "" });

    try {
      await apiService.submitContact(formData);
      setStatusMessage({ type: "success", text: "Message sent successfully!" });

      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setStatusMessage({ type: "error", text: "Failed to send message." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white px-6 py-16 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-[120px] top-0 left-0"></div>
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[120px] bottom-0 right-0"></div>

      <div className="max-w-7xl w-full grid lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl relative z-10">

        {/* LEFT SIDE → MAP */}
        <motion.div 
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="relative"
        >
          <iframe
            src="https://www.google.com/maps?q=Delhi,India&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            className="w-full h-full min-h-[500px] grayscale hover:grayscale-0 transition duration-500"
          ></iframe>

          {/* Overlay Info */}
          <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-lg p-6 rounded-xl border border-white/10">
            <h3 className="text-lg font-semibold mb-4">Our Office</h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt /> Delhi, India
              </div>
              <div className="flex items-center gap-2">
                <FaPhoneAlt /> +91 9661034151
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope /> info@siteforceconsultants.com
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE → FORM */}
        <motion.div 
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white/5 backdrop-blur-xl p-12 space-y-10"
        >

          <h2 className="text-3xl font-bold">Contact Us</h2>

          <form onSubmit={handleSubmit} className="space-y-8">

            {["name", "email", "subject"].map((field, i) => (
              <div key={i} className="relative">
                <input
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  value={formData[field]}
                  onChange={handleChange}
                  required={field !== "subject"}
                  className="peer w-full bg-transparent border-b border-white/30 py-3 focus:outline-none focus:border-blue-400"
                />
                <label className="absolute left-0 top-3 text-white/60 text-sm transition-all 
                  peer-focus:-top-3 peer-focus:text-blue-400 peer-focus:text-xs 
                  peer-valid:-top-3 peer-valid:text-xs">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
              </div>
            ))}

            <div className="relative">
              <textarea
                name="message"
                rows="3"
                value={formData.message}
                onChange={handleChange}
                className="peer w-full bg-transparent border-b border-white/30 py-3 focus:outline-none focus:border-blue-400"
              ></textarea>
              <label className="absolute left-0 top-3 text-white/60 text-sm transition-all 
                peer-focus:-top-3 peer-focus:text-blue-400 peer-focus:text-xs 
                peer-valid:-top-3 peer-valid:text-xs">
                Message
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {statusMessage.text && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-center text-sm ${
                  statusMessage.type === "success" ? "text-green-400" : "text-red-400"
                }`}
              >
                {statusMessage.text}
              </motion.div>
            )}

          </form>

        </motion.div>

      </div>

      {/* WhatsApp */}
      <a
        href="https://wa.me/9661034151"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full animate-pulse shadow-lg"
      >
        <FaWhatsapp className="text-white text-2xl" />
      </a>

    </section>
  );
};

export default ContactUs;
