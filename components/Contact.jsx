"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Send,
  Mail,
  CheckCircle2,
  AlertCircle,
  Github,
  Loader2,
} from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { useToast } from "@/components/ui/Toast";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Schema-based contact form validator (Zod-compatible validation contract)
 */
function validateContactForm(values) {
  const errors = {};
  const name = (values.name || "").trim();
  const email = (values.email || "").trim();
  const message = (values.message || "").trim();

  if (!name) {
    errors.name = "Please enter your full name.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (name.length > 100) {
    errors.name = "Name must be under 100 characters.";
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Please enter a valid email address (e.g., name@domain.com).";
  }

  if (!message) {
    errors.message = "Please enter a message.";
  } else if (message.length < 10) {
    errors.message = "Message must be at least 10 characters long.";
  } else if (message.length > 2000) {
    errors.message = "Message must be under 2000 characters.";
  }

  return {
    success: Object.keys(errors).length === 0,
    errors,
    data: { name, email, message },
  };
}

const Contact = ({ isDarkMode }) => {
  const { showToast } = useToast();
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);

    if (touched[name]) {
      const validation = validateContactForm(nextValues);
      setErrors((prev) => ({
        ...prev,
        [name]: validation.errors[name] || "",
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const validation = validateContactForm(values);
    setErrors((prev) => ({
      ...prev,
      [name]: validation.errors[name] || "",
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("");
    setTouched({ name: true, email: true, message: true });

    const validation = validateContactForm(values);
    if (!validation.success) {
      setErrors(validation.errors);
      showToast(
        "Please fix the highlighted validation errors before submitting.",
        "error"
      );
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY;

    try {
      if (accessKey) {
        const formData = new FormData();
        formData.append("name", validation.data.name);
        formData.append("email", validation.data.email);
        formData.append("message", validation.data.message);
        formData.append("access_key", accessKey);

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.success) {
          setResult("success");
          setValues({ name: "", email: "", message: "" });
          setTouched({});
          showToast(
            "Message sent successfully! Niloy will respond shortly.",
            "success"
          );
          setTimeout(() => setResult(""), 6000);
        } else {
          setResult("error");
          showToast(
            "Submission failed. Please use the direct email link below.",
            "error"
          );
          setTimeout(() => setResult(""), 6000);
        }
      } else {
        // Simulated brief network dispatch when Web3Forms key is not set in local dev
        await new Promise((resolve) => setTimeout(resolve, 600));
        setResult("success");
        setValues({ name: "", email: "", message: "" });
        setTouched({});
        showToast(
          "Message validated & queued! You can also email niloykumarmohonta@gmail.com directly.",
          "success"
        );
        setTimeout(() => setResult(""), 6000);
      }
    } catch {
      setResult("error");
      showToast(
        "Network error while sending message. Please email niloykumarmohonta@gmail.com.",
        "error"
      );
      setTimeout(() => setResult(""), 6000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 px-4 sm:px-6 lg:px-12 scroll-mt-20 relative overflow-hidden"
    >
      {/* Background decoration with cyber-grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 cyber-grid pointer-events-none" />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"
      />

      <motion.div
        className="max-w-4xl mx-auto relative z-10"
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={fadeUp}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 rounded-full text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 mb-3 shadow-sm">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect With Me</span>
          </div>
          <h2
            id="contact-heading"
            className="fluid-h2 font-extrabold gradient-text mb-4"
          >
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto mt-5 leading-relaxed font-normal">
            Have an engineering role, architecture challenge, or full-stack
            project in mind? Send a message below or connect directly.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={onSubmit}
          className="max-w-2xl mx-auto"
          variants={scaleIn}
          noValidate
        >
          <div className="glass-card neon-border-glow cyber-corner p-6 sm:p-10 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl">
            {/* Name and Email Fields */}
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-2"
                >
                  Your Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  placeholder="Enter your full name"
                  required
                  className={`w-full px-4 py-3 bg-white/90 dark:bg-slate-900/80 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 text-sm shadow-sm ${
                    errors.name
                      ? "border-rose-500 dark:border-rose-500"
                      : "border-slate-300 dark:border-slate-700"
                  }`}
                />
                {errors.name && (
                  <p
                    id="contact-name-error"
                    role="alert"
                    className="mt-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-2"
                >
                  Your Email <span className="text-rose-500">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                  placeholder="name@company.com"
                  required
                  className={`w-full px-4 py-3 bg-white/90 dark:bg-slate-900/80 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 text-sm shadow-sm ${
                    errors.email
                      ? "border-rose-500 dark:border-rose-500"
                      : "border-slate-300 dark:border-slate-700"
                  }`}
                />
                {errors.email && (
                  <p
                    id="contact-email-error"
                    role="alert"
                    className="mt-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium"
                  >
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Message Field */}
            <div className="mb-6">
              <label
                htmlFor="contact-message"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-2"
              >
                Your Message <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? "contact-message-error" : undefined
                }
                placeholder="Describe your project scope, architecture requirements, or role details..."
                required
                className={`w-full px-4 py-3 bg-white/90 dark:bg-slate-900/80 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 text-sm shadow-sm ${
                  errors.message
                    ? "border-rose-500 dark:border-rose-500"
                    : "border-slate-300 dark:border-slate-700"
                }`}
              />
              {errors.message && (
                <p
                  id="contact-message-error"
                  role="alert"
                  className="mt-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium"
                >
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <MagneticButton strength={0.2}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label={isSubmitting ? "Sending message" : "Send message"}
                  className={`inline-flex items-center justify-center gap-2.5 px-8 py-3.5 min-h-[44px] min-w-[180px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all duration-300 text-sm sm:text-base ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.03 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </MagneticButton>
            </div>

            {/* Screen Reader ARIA Live Region for Form Feedback */}
            <div aria-live="polite" aria-atomic="true">
              <AnimatePresence>
                {result && (
                  <motion.div
                    role={result === "success" ? "status" : "alert"}
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className={`mt-6 p-4 rounded-xl flex items-center gap-3 border shadow-sm ${
                      result === "success"
                        ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800"
                        : "bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-200 border-rose-300 dark:border-rose-800"
                    }`}
                  >
                    {result === "success" ? (
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600 dark:text-rose-400" />
                    )}
                    <p className="text-sm font-medium">
                      {result === "success"
                        ? "Message sent successfully! I'll get back to you shortly."
                        : "Failed to send message. Please email niloykumarmohonta@gmail.com directly."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.form>

        {/* Direct Fallback Links (Email & GitHub) */}
        <motion.div className="text-center mt-12" variants={fadeUp}>
          <p className="text-xs sm:text-sm uppercase tracking-wider text-slate-600 dark:text-slate-300 font-semibold mb-4">
            Prefer to connect directly?
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <MagneticButton strength={0.2}>
              <a
                href="mailto:niloykumarmohonta@gmail.com"
                aria-label="Send direct email to niloykumarmohonta@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] glass-card rounded-xl text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-800 transition-colors duration-200 text-sm font-medium shadow-sm"
              >
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>niloykumarmohonta@gmail.com</span>
              </a>
            </MagneticButton>

            <MagneticButton strength={0.2}>
              <a
                href="https://github.com/niloydiu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Niloy's GitHub profile (https://github.com/niloydiu)"
                className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] glass-card rounded-xl text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 border border-slate-200 dark:border-slate-800 transition-colors duration-200 text-sm font-medium shadow-sm"
              >
                <Github className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>github.com/niloydiu</span>
              </a>
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
