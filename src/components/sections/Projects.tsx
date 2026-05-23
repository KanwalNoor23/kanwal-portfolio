'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Code2, Globe, Database, Layers } from 'lucide-react'

const projects = [
  {
    title: 'Responsive Portfolio Website',
    description: 'A personal portfolio showcasing skills and projects with fully responsive design, smooth CSS animations, and accessibility best practices.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Git'],
    icon: Globe,
    category: 'Frontend',
    github: 'https://github.com/KanwalNoor23/',
    featured: true,
    gradient: 'from-purple-600/25 to-fuchsia-700/15',
  },
  {
    title: 'Student Database System',
    description: 'A web-based CRUD application for managing student records. Implemented with relational database design, SQL queries, and a clean PHP backend.',
    tech: ['HTML', 'CSS', 'PHP', 'SQL', 'XAMPP'],
    icon: Database,
    category: 'Full Stack',
    github: 'https://github.com/KanwalNoor23/',
    featured: true,
    gradient: 'from-violet-600/25 to-purple-800/15',
  },
  {
    title: 'UI Component Library',
    description: 'A reusable set of UI components including buttons, cards, modals, and form elements with consistent theming and responsive behavior.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    icon: Layers,
    category: 'Frontend',
    github: 'https://github.com/KanwalNoor23/',
    featured: false,
    gradient: 'from-fuchsia-700/20 to-purple-900/15',
  },
  {
    title: 'STEM Workshop Landing Page',
    description: 'Event landing page built for FJWU STEM Community workshops. Includes registration form, event schedule, and speaker sections.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    icon: Code2,
    category: 'Frontend',
    github: 'https://github.com/KanwalNoor23/',
    featured: false,
    gradient: 'from-pink-700/15 to-violet-900/10',
  },
]

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none" />

      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-3">03 / Projects</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white">
            What I've Built
          </h2>
          <p className="text-white/40 mt-4 max-w-xl">
            A collection of projects from my internship, coursework, and personal exploration.
          </p>
        </motion.div>

        {/* Featured projects */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {projects.filter(p => p.featured).map((project, i) => {
            const Icon = project.icon
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`card-glass rounded-2xl p-8 bg-gradient-to-br ${project.gradient} hover:border-purple-500/40 transition-all duration-300 group relative overflow-hidden gradient-border shine`}
              >
                {/* Glow accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-900/50 border border-purple-700/30 flex items-center justify-center group-hover:bg-purple-800/60 transition-colors">
                    <Icon size={22} className="text-purple-400" />
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-white/30 hover:text-white hover:border-white/30 transition-all duration-200"
                    >
                      <Github size={16} />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-white/30 hover:text-purple-300 hover:border-purple-500/40 transition-all duration-200"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>

                <span className="text-xs font-mono text-purple-400 tracking-widest uppercase">{project.category}</span>
                <h3 className="font-display text-xl font-bold text-white mt-1 mb-3 group-hover:text-purple-100 transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span key={t} className="px-2.5 py-1 text-xs rounded-md bg-white/5 text-white/40 border border-white/8">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Smaller projects */}
        <div className="grid sm:grid-cols-2 gap-4">
          {projects.filter(p => !p.featured).map((project, i) => {
            const Icon = project.icon
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="card-glass rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-900/40 flex items-center justify-center">
                      <Icon size={18} className="text-purple-400" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-purple-400 tracking-widest uppercase">{project.category}</span>
                      <h3 className="text-white text-sm font-semibold">{project.title}</h3>
                    </div>
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/25 hover:text-purple-300 transition-colors"
                  >
                    <ExternalLink size={15} />
                  </a>
                </div>
                <p className="text-white/40 text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map(t => (
                    <span key={t} className="px-2 py-0.5 text-xs rounded bg-white/5 text-white/35 border border-white/8">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/KanwalNoor23/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-purple-300 transition-colors border-b border-white/10 hover:border-purple-500/50 pb-0.5"
          >
            <Github size={16} />
            View all repositories on GitHub
            <ExternalLink size={12} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
