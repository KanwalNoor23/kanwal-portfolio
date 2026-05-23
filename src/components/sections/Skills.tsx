'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const skillGroups = [
  {
    category: 'Web Development',
    color: 'purple',
    skills: [
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 88 },
      { name: 'JavaScript (ES6)', level: 78 },
      { name: 'Responsive Design', level: 85 },
      { name: 'DOM Manipulation', level: 80 },
    ],
  },
  {
    category: 'Programming Languages',
    color: 'violet',
    skills: [
      { name: 'C', level: 75 },
      { name: 'C++', level: 72 },
      { name: 'Java', level: 65 },
      { name: 'SQL', level: 70 },
    ],
  },
  {
    category: 'Tools & Technologies',
    color: 'fuchsia',
    skills: [
      { name: 'Git & GitHub', level: 80 },
      { name: 'VS Code', level: 95 },
      { name: 'XAMPP', level: 72 },
      { name: 'VMware Workstation', level: 60 },
    ],
  },
]

const techBadges = [
  'HTML5', 'CSS3', 'JavaScript', 'Git', 'GitHub',
  'SQL', 'C++', 'Java', 'XAMPP', 'VS Code',
  'Responsive Design', 'DOM API', 'HTTP/DNS', 'TCP/IP', 'VMware'
]

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-900/10 blur-[120px] pointer-events-none" />

      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-3">02 / Skills</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white">
            My Toolkit
          </h2>
        </motion.div>

        {/* Skill groups */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: gi * 0.12 }}
              className="card-glass rounded-2xl p-6 hover:border-purple-600/30 transition-all duration-300"
            >
              <h3 className="text-white font-semibold mb-5 text-sm tracking-wide uppercase">{group.category}</h3>
              <div className="space-y-4">
                {group.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-white/70 text-sm">{skill.name}</span>
                      <span className="text-purple-400 text-xs font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-600 to-violet-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: gi * 0.12 + si * 0.08 + 0.3, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Badge cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-white/30 text-sm font-mono mb-4 tracking-widest uppercase">All Technologies</p>
          <div className="flex flex-wrap gap-2">
            {techBadges.map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.04 }}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-white/8 bg-white/4 text-white/50 hover:border-purple-500/40 hover:text-purple-300 hover:bg-purple-900/20 cursor-default transition-all duration-200"
              >
                {badge}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Certifications / Leadership */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 grid sm:grid-cols-2 gap-4"
        >
          {[
            {
              title: 'General Secretary – STEM Community',
              org: 'FJWU',
              period: '2024 – Present',
              desc: 'Led coding events and STEM workshops to engage students in tech learning.',
            },
            {
              title: 'Campus Ambassador',
              org: 'AI Community of Pakistan',
              period: '2024 – Present',
              desc: 'Bridge between students and tech communities, promoting events and opportunities.',
            },
          ].map((role, i) => (
            <div
              key={i}
              className="card-glass rounded-2xl p-6 border-l-2 border-purple-600 hover:border-purple-400 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-white text-sm">{role.title}</h4>
                <span className="text-xs text-purple-400 font-mono flex-shrink-0 ml-2">{role.period}</span>
              </div>
              <p className="text-purple-300 text-xs font-medium mb-2">{role.org}</p>
              <p className="text-white/40 text-sm leading-relaxed">{role.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
