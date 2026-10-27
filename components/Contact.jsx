"use client";

import { assets } from "@/assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Send, Mail, CheckCircle2, AlertCircle, Sparkles, Github, Loader2 } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";

const Contact = ({ isDarkMode }) => {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("");
    setIsSubmitting(true);

    const formData = new FormData(event.target);
    formData.append("access_key", process.env.NEXT_PUBLIC_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("success");
        event.target.reset();
        setTimeout(() => setResult(""), 6000);
      } else {
        setResult("error");
        setTimeout(() => setResult(""), 6000);
      }
    } catch (error) {
      console.error("Submission error", error);
      setResult("error");
      setTimeout(() => setResult(""), 6000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 px-6 lg:px-12 scroll-mt-24 relative overflow-hidden"
    >
      {/* Background decoration with cyber-grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 cyber-grid pointer-events-none" />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/60 rounded-full text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300 mb-3 shadow-sm">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect with me</span>
          </div>
          <h2 id="contact-heading" className="fluid-h2 font-extrabold gradient-text mb-4">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mt-5 leading-relaxed font-normal">
            Have a project in mind, an open position, or just want to connect? Send me a message and let's talk.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={onSubmit}
          className="max-w-2xl mx-auto"
          variants={scaleIn}
          noValidate={false}
        >
          <div className="glass-card neon-border-glow cyber-corner p-8 sm:p-10 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl">
            {/* Name and Email Fields */}
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
                >
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="e.g. Alex Smith"
                  required
                  className="w-full px-4 py-3 bg-white/70 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm shadow-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
                >
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="e.g. alex@example.com"
                  required
                  className="w-full px-4 py-3 bg-white/70 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm shadow-sm"
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="mb-6">
              <label
                htmlFor="contact-message"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
              >
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Tell me about your project, timeline, and goals..."
                required
                className="w-full px-4 py-3 bg-white/70 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm shadow-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <MagneticButton strength={0.2}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center justify-center gap-2.5 px-8 py-3.5 min-h-[44px] min-w-[180px] bg-accent text-accent-foreground font-semibold rounded-lg shadow-sm hover:opacity-90 transition-all duration-300 text-sm sm:text-base ${
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
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className={`mt-6 p-4 rounded-xl flex items-center gap-3 border shadow-sm ${
                      result === "success"
                        ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                        : "bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800"
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
                        : "Failed to send message. Please email me directly or try again."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.form>

        {/* Alternative contact methods */}
        <motion.div className="text-center mt-12" variants={fadeUp}>
          <p className="text-xs sm:text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-4">
            Prefer to connect directly?
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <MagneticButton strength={0.2}>
              <a
                href="mailto:niloykumarmohonta@gmail.com"
                aria-label="Send direct email to niloykumarmohonta@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] glass-card rounded-xl text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-800 transition-colors duration-200 text-sm font-medium shadow-sm"
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
                aria-label="View Niloy's GitHub profile"
                className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] glass-card rounded-xl text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-800 transition-colors duration-200 text-sm font-medium shadow-sm"
              >
                <Github className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>GitHub Profile</span>
              </a>
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
