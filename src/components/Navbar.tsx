'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('Home')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#070709]/90 backdrop-blur-xl border-b border-purple-900/30'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#hero"
          className="font-display text-xl font-bold"
          whileHover={{ scale: 1.02 }}
        >
          <span className="text-white">K</span>
          <span className="text-purple-400">.</span>
          <span className="text-white/60 text-sm font-body font-normal ml-1">Kanwal</span>
        </motion.a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <motion.a
                href={item.href}
                onClick={() => setActive(item.label)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg group ${
                  active === item.label ? 'text-purple-300' : 'text-white/50 hover:text-white/90'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                {active === item.label && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-purple-900/30 rounded-lg border border-purple-700/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </motion.a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:flex items-center gap-2 px-5 py-2 text-sm font-medium bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-purple-600/30"
        >
          Hire Me
        </a>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white/70 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-[#0d0d14]/95 backdrop-blur-xl border-b border-purple-900/30"
          >
            <ul className="px-6 py-4 space-y-1">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <a
                    href={item.href}
                    className="block py-3 text-sm text-white/60 hover:text-purple-300 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
