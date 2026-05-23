'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, Download, Eye, EyeOff, CheckCircle, AlertCircle, FileText, Shield } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
}

// ─── SET YOUR PASSWORD HERE ───────────────────────────────────────────────────
const CV_PASSWORD = 'kanwal2345'
// ─────────────────────────────────────────────────────────────────────────────

// CV file URL — replace with your actual hosted CV link (Google Drive, Dropbox, etc.)
const CV_URL = '/cv/Kanwal_Noor_ul_Ain_CV.pdf'

export default function CVDownloadModal({ open, onClose }: Props) {
  const [password, setPassword]   = useState('')
  const [showPass, setShowPass]   = useState(false)
  const [status, setStatus]       = useState<'idle' | 'wrong' | 'correct'>('idle')
  const [attempts, setAttempts]   = useState(0)
  const [locked, setLocked]       = useState(false)
  const [countdown, setCountdown] = useState(0)

  // Reset when modal opens
  useEffect(() => {
    if (open) {
      setPassword('')
      setStatus('idle')
    }
  }, [open])

  // Lockout countdown
  useEffect(() => {
    if (countdown <= 0) { setLocked(false); return }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  const handleSubmit = () => {
    if (locked) return

    if (password === CV_PASSWORD) {
      setStatus('correct')
      setAttempts(0)
      // Trigger download after short delay
      setTimeout(() => {
        const a = document.createElement('a')
        a.href = CV_URL
        a.download = 'Kanwal_Noor_ul_Ain_ATS_CV.pdf'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        setTimeout(onClose, 1500)
      }, 800)
    } else {
      const next = attempts + 1
      setAttempts(next)
      setStatus('wrong')
      setPassword('')
      // Lock after 3 wrong attempts
      if (next >= 3) {
        setLocked(true)
        setCountdown(30)
        setStatus('idle')
      }
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md px-4"
          >
            <div className="card-glass rounded-3xl p-8 border border-purple-500/25 relative overflow-hidden">

              {/* Background glow */}
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-fuchsia-600/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />

              {/* Close */}
              <button onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/10 transition-all">
                <X size={16} />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600/30 to-fuchsia-600/20 border border-purple-500/30 flex items-center justify-center">
                  {status === 'correct'
                    ? <CheckCircle size={30} className="text-emerald-400" />
                    : <FileText size={30} className="text-purple-400" />
                  }
                </div>
              </div>

              {/* Title */}
              <div className="text-center mb-6">
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  {status === 'correct' ? 'Access Granted!' : 'Download CV'}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {status === 'correct'
                    ? 'Your download is starting...'
                    : 'This CV is password protected. Enter the access code to download the ATS-optimised resume.'}
                </p>
              </div>

              {/* CV info chips */}
              {status !== 'correct' && (
                <div className="flex justify-center gap-2 mb-6">
                  {['ATS Optimised', 'PDF Format', 'Latest Version'].map(tag => (
                    <span key={tag}
                      className="px-2.5 py-1 text-xs rounded-full bg-purple-900/30 text-purple-300 border border-purple-700/30">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Form */}
              {status !== 'correct' && (
                <div className="space-y-4">

                  {/* Lockout banner */}
                  {locked && (
                    <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}}
                      className="flex items-center gap-3 p-3 rounded-xl bg-red-900/25 border border-red-700/30 text-red-300 text-sm">
                      <Shield size={16} className="flex-shrink-0" />
                      Too many wrong attempts. Try again in {countdown}s
                    </motion.div>
                  )}

                  {/* Wrong password */}
                  {status === 'wrong' && !locked && (
                    <motion.div initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}}
                      className="flex items-center gap-3 p-3 rounded-xl bg-red-900/25 border border-red-700/30 text-red-300 text-sm">
                      <AlertCircle size={16} className="flex-shrink-0" />
                      Incorrect password. {3 - attempts} attempt{3 - attempts !== 1 ? 's' : ''} remaining.
                    </motion.div>
                  )}

                  {/* Password input */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                      <Lock size={16} />
                    </div>
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password}
                      onChange={e => { setPassword(e.target.value); setStatus('idle') }}
                      onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                      placeholder="Enter access password"
                      disabled={locked}
                      className={`w-full bg-white/5 border rounded-xl pl-10 pr-12 py-3.5 text-sm text-white placeholder-white/20 outline-none transition-all duration-200 ${
                        status === 'wrong'
                          ? 'border-red-500/50 focus:border-red-400/70'
                          : 'border-white/10 hover:border-purple-500/40 focus:border-purple-500 focus:bg-purple-900/10'
                      } disabled:opacity-40 disabled:cursor-not-allowed`}
                    />
                    <button
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                    >
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>

                  {/* Submit */}
                  <motion.button
                    onClick={handleSubmit}
                    disabled={locked || !password}
                    whileHover={!locked && password ? { scale: 1.02 } : {}}
                    whileTap={!locked && password ? { scale: 0.98 } : {}}
                    className="w-full py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white hover:shadow-lg hover:shadow-purple-600/25 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Download size={16} />
                    Download CV
                  </motion.button>

                  <p className="text-center text-white/20 text-xs">
                    Don't have the password? <a href="#contact" onClick={onClose}
                      className="text-purple-400 hover:text-fuchsia-300 transition-colors underline underline-offset-2">
                      Request access
                    </a>
                  </p>
                </div>
              )}

              {/* Success animation */}
              {status === 'correct' && (
                <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
                  className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 rounded-full bg-emerald-900/30 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle size={32} className="text-emerald-400" />
                  </motion.div>
                  <p className="text-emerald-300 font-medium">Downloading your file...</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
