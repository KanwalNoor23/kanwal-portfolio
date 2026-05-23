'use client'

import { Github, Linkedin, Mail, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 mt-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white/25 text-sm text-center sm:text-left">
            <span className="font-display text-white/40">Kanwal Noor ul Ain</span>
            <span className="mx-2">·</span>
            Built with Next.js & Tailwind
            <span className="inline-flex items-center gap-1 ml-1">
              <Heart size={12} className="text-purple-500 inline" fill="currentColor" />
            </span>
          </div>

          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: 'https://github.com/KanwalNoor23/', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/kanwal-noor-ul-ain-b6ab5334', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:kanwalnoor903@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/8 text-white/25 hover:text-purple-300 hover:border-purple-500/40 transition-all duration-200"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
