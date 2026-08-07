'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, Copy, Check, MessageSquare, ExternalLink, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '@/data/portfolioData';

const EarthCanvas = dynamic(() => import('../3d/EarthCanvas'), { ssr: false });

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    try {
      const res = await fetch('https://formsubmit.co/ajax/erandasathsara@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Contact Message from ${formData.name}`,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#e06b3a', '#f59e0b', '#c45528'],
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Fallback to mailto link
        window.location.href = `mailto:erandasathsara@gmail.com?subject=Contact%20from%20${encodeURIComponent(
          formData.name
        )}&body=${encodeURIComponent(formData.message)}`;
      }
    } catch (err) {
      console.error('Email submission error:', err);
      window.location.href = `mailto:erandasathsara@gmail.com?subject=Contact%20from%20${encodeURIComponent(
        formData.name
      )}&body=${encodeURIComponent(formData.message)}`;
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppSend = () => {
    const text = formData.name || formData.message
      ? `Hi Eranda, I'm ${formData.name || 'someone'} reaching out from your portfolio:\n\n${formData.message}`
      : "Hi Eranda! I came across your portfolio and would like to connect.";
    window.open(`https://wa.me/94704006522?text=${encodeURIComponent(text)}`, '_blank');
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden" style={{ background: 'rgba(7,9,14,0.97)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span
            className="text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
            style={{ color: '#f59e0b', background: 'rgba(224,107,58,0.1)', borderColor: 'rgba(224,107,58,0.25)' }}
          >
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
            Let&apos;s Build{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #e06b3a, #f59e0b)' }}
            >
              Something Remarkable
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-xl">
            Have an exciting AI project, full-stack opportunity, or research collaboration? Drop me a message!
          </p>
          <div
            className="w-20 h-1 rounded-full mt-4"
            style={{ background: 'linear-gradient(90deg, #e06b3a, #f59e0b)' }}
          />
        </div>

        {/* Full-Page Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* 3D Unclipped Hologram Globe (Left 5 Cols on Desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 w-full h-[360px] sm:h-[450px] lg:h-[500px] relative flex justify-center items-center overflow-hidden"
          >
            <EarthCanvas />
          </motion.div>

          {/* Expanded Responsive Contact Form Card (Right 7 Cols on Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 w-full glass-card p-6 sm:p-10 rounded-3xl border border-white/10 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <MessageSquare className="w-7 h-7" style={{ color: '#e06b3a' }} />
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-8">
                Fill out the form below to send an email to <span className="text-amber-400 font-semibold">{PERSONAL_INFO.email}</span> or chat directly on WhatsApp.
              </p>

              {submitted ? (
                <div
                  className="p-8 rounded-2xl border text-center space-y-4"
                  style={{ background: 'rgba(224,107,58,0.1)', borderColor: 'rgba(224,107,58,0.3)' }}
                >
                  <div
                    className="w-14 h-14 rounded-full mx-auto flex items-center justify-center font-bold text-white text-xl"
                    style={{ background: '#e06b3a' }}
                  >
                    ✓
                  </div>
                  <h4 className="text-2xl font-bold text-white">Message Sent Successfully!</h4>
                  <p className="text-sm text-gray-300">
                    Thank you for reaching out! Your message has been sent to <strong className="text-amber-400">erandasathsara@gmail.com</strong>. I will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 text-xs font-semibold rounded-xl text-white hover:opacity-90 transition-opacity"
                    style={{ background: '#e06b3a' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono font-semibold text-gray-300 uppercase tracking-wider mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none transition-colors"
                        onFocus={(e) => (e.currentTarget.style.borderColor = '#e06b3a')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-semibold text-gray-300 uppercase tracking-wider mb-2">
                        Your Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none transition-colors"
                        onFocus={(e) => (e.currentTarget.style.borderColor = '#e06b3a')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Eranda, I'd like to discuss a project..."
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none transition-colors resize-none"
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#e06b3a')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="py-4 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-all duration-300 disabled:opacity-50"
                      style={{
                        background: 'linear-gradient(135deg, #c45528, #e06b3a, #f59e0b)',
                        boxShadow: '0 8px 30px rgba(224,107,58,0.35)',
                      }}
                    >
                      {submitting ? (
                        <span className="animate-pulse">Sending Email...</span>
                      ) : (
                        <>
                          <span>Submit via Email</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppSend}
                      className="py-4 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all duration-300 border border-emerald-500/40"
                      style={{
                        background: 'rgba(16, 185, 129, 0.15)',
                        boxShadow: '0 8px 25px rgba(16,185,129,0.2)',
                      }}
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>Send via WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Direct Email / Phone Cards */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <Mail className="w-5 h-5 shrink-0" style={{ color: '#e06b3a' }} />
                  <div className="truncate">
                    <div className="text-[10px] text-gray-400 font-mono uppercase">Direct Email</div>
                    <div className="text-xs sm:text-sm text-white font-medium truncate group-hover:text-amber-400 transition-colors">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    copyToClipboard(PERSONAL_INFO.email, 'email');
                  }}
                  className="p-2 text-gray-400 hover:text-white"
                  title="Copy email"
                >
                  {copiedField === 'email' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </a>

              <a
                href={PERSONAL_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white/5 hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/30 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div className="truncate">
                    <div className="text-[10px] text-gray-400 font-mono uppercase flex items-center gap-1">
                      <span>WhatsApp / Call</span>
                      <ExternalLink className="w-2.5 h-2.5 text-emerald-400" />
                    </div>
                    <div className="text-xs sm:text-sm text-white font-medium truncate group-hover:text-emerald-300 transition-colors">
                      {PERSONAL_INFO.phone}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    copyToClipboard(PERSONAL_INFO.phone, 'phone');
                  }}
                  className="p-2 text-gray-400 hover:text-white"
                  title="Copy WhatsApp Number"
                >
                  {copiedField === 'phone' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
