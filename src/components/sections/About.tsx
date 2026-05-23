'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, Briefcase, Award, Users } from 'lucide-react'

const stats = [
  { icon: GraduationCap, label: 'Semester', value: '6th', sub: 'FJWU – CS' },
  { icon: Briefcase, label: 'Internship', value: '2mo', sub: 'DeveloperHub' },
  { icon: Award, label: 'Top Score', value: '#1', sub: 'CS in FSc' },
  { icon: Users, label: 'Roles', value: '2', sub: 'Leadership' },
]

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* BG accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-900/10 blur-[100px] pointer-events-none" />

      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-3">01 / About</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white">
            Who I Am
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <div className="space-y-6">
            {[
              "I'm Kanwal Noor ul Ain — a Computer Science student at Fatima Jinnah Women University (FJWU), currently in my 6th semester. I'm passionate about building things for the web that are both functional and beautiful.",
              "My journey into web development started with curiosity and grew into a real skill set through a 2-month frontend internship at DeveloperHub Cooperation, where I shipped responsive web interfaces on real-world projects.",
              "Beyond coding, I'm the General Secretary of the STEM Community at FJWU, where I organize tech workshops and coding events. I also serve as a Campus Ambassador for the AI Community of Pakistan, bridging students and industry opportunities.",
            ].map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
                className="text-white/55 leading-relaxed text-base"
              >
                {para}
              </motion.p>
            ))}

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-2 pt-2"
            >
              {['Problem Solver', 'Team Leader', 'Detail-Oriented', 'Fast Learner', 'Creative Thinker'].map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium rounded-full border border-purple-600/30 bg-purple-900/20 text-purple-300"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ icon: Icon, label, value, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="card-glass rounded-2xl p-6 group hover:border-purple-600/40 transition-all duration-300 gradient-border"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-900/40 flex items-center justify-center mb-4 group-hover:bg-purple-800/50 transition-colors">
                  <Icon size={20} className="text-purple-400" />
                </div>
                <div className="font-display text-4xl font-bold text-white mb-1">{value}</div>
                <div className="text-purple-300 text-sm font-medium">{label}</div>
                <div className="text-white/30 text-xs mt-1">{sub}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20"
        >
          <h3 className="font-display text-2xl font-bold text-white mb-8">Education</h3>
          <div className="space-y-4">
            {[
              {
                year: '2023 – Present',
                degree: 'B.Sc. Computer Science',
                institution: 'Fatima Jinnah Women University (FJWU)',
                detail: '6th Semester · Data Structures, OOP, Web Dev, Algorithms, DBMS',
                status: 'Current',
              },
              {
                year: '2022 – 2023',
                degree: 'FSc (ICS)',
                institution: 'Munir Intermediate College',
                detail: 'Scored highest marks in Computer Science · CS, Physics, Mathematics',
                status: 'Completed',
              },
            ].map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="flex gap-6 card-glass rounded-2xl p-6 hover:border-purple-600/30 transition-all duration-300"
              >
                <div className="hidden sm:flex flex-col items-center gap-2 pt-1">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  {i === 0 && <div className="w-px flex-1 bg-purple-800/40" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h4 className="font-semibold text-white">{edu.degree}</h4>
                      <p className="text-purple-300 text-sm">{edu.institution}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                        edu.status === 'Current'
                          ? 'bg-green-900/40 text-green-400 border border-green-700/30'
                          : 'bg-white/5 text-white/30 border border-white/10'
                      }`}>
                        {edu.status}
                      </span>
                      <p className="text-white/30 text-xs mt-1 font-mono">{edu.year}</p>
                    </div>
                  </div>
                  <p className="text-white/40 text-sm">{edu.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
