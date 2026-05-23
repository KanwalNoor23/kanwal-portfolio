'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    // Simulate send
    await new Promise(r => setTimeout(r, 1800))
    setStatus('sent')
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  const links = [
    { icon: Mail, label: 'kanwalnoor903@gmail.com', href: 'mailto:kanwalnoor903@gmail.com' },
    { icon: Github, label: 'github.com/KanwalNoor23', href: 'https://github.com/KanwalNoor23/' },
    { icon: Linkedin, label: 'linkedin.com/in/kanwal-noor-ul-ain', href: 'https://www.linkedin.com/in/kanwal-noor-ul-ain-b6ab5334' },
  ]

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/15 via-transparent to-transparent" />

      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-3">04 / Contact</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            Let's Connect
          </h2>
          <p className="text-white/40 max-w-lg">
            I'm actively looking for internship opportunities. Whether you have a project, a role, or just want to chat about web dev — my inbox is open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="card-glass rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-5 text-sm tracking-wide uppercase">Reach Me At</h3>
              <div className="space-y-4">
                {links.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/50 hover:text-purple-300 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-purple-900/30 flex items-center justify-center group-hover:bg-purple-800/50 transition-colors flex-shrink-0">
                      <Icon size={16} className="text-purple-400" />
                    </div>
                    <span className="text-sm break-all">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="card-glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/60 text-sm">Available for work</span>
              </div>
              <p className="text-white/30 text-xs leading-relaxed">
                Currently based in Pakistan · Open to remote roles & on-site internships
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 card-glass rounded-2xl p-8"
          >
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { name: 'name', label: 'Your Name', type: 'text', placeholder: 'e.g. Sara Ahmed' },
                  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'sara@example.com' },
                ].map(field => (
                  <div key={field.name}>
                    <label className="block text-white/50 text-xs font-medium mb-1.5 tracking-wide">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name as keyof typeof form]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full bg-white/5 border border-white/10 hover:border-purple-600/40 focus:border-purple-500 focus:bg-purple-900/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-white/50 text-xs font-medium mb-1.5 tracking-wide">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Internship Opportunity / Project Collaboration"
                  className="w-full bg-white/5 border border-white/10 hover:border-purple-600/40 focus:border-purple-500 focus:bg-purple-900/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-white/50 text-xs font-medium mb-1.5 tracking-wide">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about the opportunity or project..."
                  className="w-full bg-white/5 border border-white/10 hover:border-purple-600/40 focus:border-purple-500 focus:bg-purple-900/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200 resize-none"
                />
              </div>

              <motion.button
                onClick={handleSubmit}
                disabled={status === 'sending' || status === 'sent'}
                whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                className={`w-full py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                  status === 'sent'
                    ? 'bg-green-700/40 text-green-400 border border-green-700/30'
                    : status === 'sending'
                    ? 'bg-purple-800/60 text-purple-300 cursor-wait'
                    : 'bg-purple-600 hover:bg-purple-500 text-white hover:shadow-lg hover:shadow-purple-600/30'
                }`}
              >
                {status === 'idle' && <><Send size={16} /> Send Message</>}
                {status === 'sending' && (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                )}
                {status === 'sent' && <><CheckCircle size={16} /> Message Sent!</>}
                {status === 'error' && <><AlertCircle size={16} /> Try Again</>}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
