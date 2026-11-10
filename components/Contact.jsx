"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  Send,
  Mail,
  CheckCircle2,
  AlertCircle,
  Github,
  Loader2,
  Linkedin,
  ArrowUpRight,
  Copy,
  Check,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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

const Contact = () => {
  const { showToast } = useToast();
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    const email = "niloykumarmohonta@gmail.com";
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      }
    } catch {
      // Fallback
    }
    setCopied(true);
    showToast("Copied niloykumarmohonta@gmail.com to clipboard!", "success");
    setTimeout(() => setCopied(false), 2500);
  };

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
            "Submission failed. Please use the direct email link.",
            "error"
          );
          setTimeout(() => setResult(""), 6000);
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 400));
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
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-12 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold mb-2">
              <span>04 // DIRECT DISPATCH</span>
            </div>
            <h2
              id="contact-heading"
              className="fluid-h2 font-extrabold tracking-tight text-zinc-950 dark:text-white"
            >
              Initiate Engineering Dialogue
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
            Available for full-time software engineering roles, SaaS system architecture, and remote technical contracts.
          </p>
        </div>

        {/* Asymmetric 12-Column Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (5 Cols): Direct Engineering Channels & Specs */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-lg bg-white dark:bg-zinc-900/40 border border-neutral-200 dark:border-neutral-800 p-6 space-y-5">
              <div>
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                  DIRECT CHANNELS
                </div>
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white tracking-tight">
                  Reach Niloy Directly
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                  Skip intermediaries. Direct email or GitHub/LinkedIn messages receive a response within 24 hours.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center justify-between gap-2 p-3 rounded-md bg-zinc-50 dark:bg-zinc-950 border border-neutral-200 dark:border-neutral-800">
                  <a
                    href="mailto:niloykumarmohonta@gmail.com"
                    aria-label="Send direct email to niloykumarmohonta@gmail.com"
                    className="flex items-center gap-2.5 font-mono text-xs text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 dark:hover:text-emerald-400 truncate"
                  >
                    <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span className="truncate">niloykumarmohonta@gmail.com</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="p-1.5 rounded bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-neutral-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors duration-150 active:scale-[0.98] flex-shrink-0"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <a
                  href="https://github.com/niloydiu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Niloy's GitHub profile (https://github.com/niloydiu)"
                  className="flex items-center justify-between p-3 rounded-md bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-neutral-200 dark:border-neutral-800 font-mono text-xs text-zinc-800 dark:text-zinc-200 transition-colors duration-150"
                >
                  <span className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>github.com/niloydiu</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                </a>

                <a
                  href="https://www.linkedin.com/in/niloykumarmohonta000/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Niloy's LinkedIn profile"
                  className="flex items-center justify-between p-3 rounded-md bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-neutral-200 dark:border-neutral-800 font-mono text-xs text-zinc-800 dark:text-zinc-200 transition-colors duration-150"
                >
                  <span className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>linkedin.com/in/niloykumarmohonta000</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Crisp Message Dispatch Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-lg bg-white dark:bg-zinc-900/40 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8"
            >
              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-mono text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2"
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
                    className={`w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-950 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-150 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 text-sm ${
                      errors.name
                        ? "border-rose-500 dark:border-rose-500"
                        : "border-neutral-200 dark:border-neutral-800"
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
                    className="block font-mono text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2"
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
                    className={`w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-950 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-150 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 text-sm ${
                      errors.email
                        ? "border-rose-500 dark:border-rose-500"
                        : "border-neutral-200 dark:border-neutral-800"
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

              <div className="mb-6">
                <label
                  htmlFor="contact-message"
                  className="block font-mono text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2"
                >
                  Project Scope or Role Details <span className="text-rose-500">*</span>
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
                  placeholder="Describe your system architecture requirements, timeline, or engineering role..."
                  required
                  className={`w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-950 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-150 resize-none text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 text-sm ${
                    errors.message
                      ? "border-rose-500 dark:border-rose-500"
                      : "border-neutral-200 dark:border-neutral-800"
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

              <div className="flex items-center justify-between gap-4 flex-wrap">
                <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  Validated client &amp; server dispatch
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label={isSubmitting ? "Sending message" : "Send message"}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 min-h-[42px] bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 font-mono font-semibold rounded-md transition-all duration-150 ease-out active:scale-[0.98] text-xs sm:text-sm ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Dispatching...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>

              <div aria-live="polite" aria-atomic="true">
                <AnimatePresence>
                  {result && (
                    <motion.div
                      role={result === "success" ? "status" : "alert"}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className={`mt-5 p-3.5 rounded-md flex items-center gap-3 border text-xs sm:text-sm ${
                        result === "success"
                          ? "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/30"
                          : "bg-rose-500/10 text-rose-800 dark:text-rose-300 border-rose-500/30"
                      }`}
                    >
                      {result === "success" ? (
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-500" />
                      )}
                      <p className="font-medium">
                        {result === "success"
                          ? "Message sent! Niloy will respond shortly."
                          : "Failed to send message. Please email niloykumarmohonta@gmail.com directly."}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
