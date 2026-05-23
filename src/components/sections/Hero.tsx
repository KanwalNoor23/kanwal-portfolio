'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowDown, Sparkles, Download } from 'lucide-react'
import { useState } from 'react'
import CVDownloadModal from '@/components/CVDownloadModal'

export default function Hero() {
  const [cvOpen, setCvOpen] = useState(false)

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Rich layered background */}
      <div className="absolute inset-0" style={{background:'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.18) 0%, transparent 70%)'}} />
      <div className="absolute inset-0" style={{background:'radial-gradient(ellipse 50% 40% at 80% 80%, rgba(232,121,249,0.10) 0%, transparent 60%)'}} />
      <div className="absolute inset-0" style={{background:'radial-gradient(ellipse 40% 30% at 10% 60%, rgba(96,165,250,0.08) 0%, transparent 60%)'}} />

      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{backgroundImage:'linear-gradient(rgba(168,85,247,1) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,1) 1px,transparent 1px)',backgroundSize:'60px 60px'}} />

      {/* Floating orbs */}
      {[
        { size:300, top:'8%',  left:'5%',  color:'rgba(139,92,246,0.12)', dur:7  },
        { size:200, top:'60%', left:'80%', color:'rgba(232,121,249,0.10)', dur:9  },
        { size:150, top:'80%', left:'15%', color:'rgba(96,165,250,0.08)',  dur:6  },
        { size:120, top:'30%', left:'70%', color:'rgba(45,212,191,0.07)',  dur:11 },
      ].map((orb,i) => (
        <motion.div key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ width:orb.size, height:orb.size, top:orb.top, left:orb.left, background:orb.color, filter:'blur(60px)' }}
          animate={{ y:[0,-25,0], scale:[1,1.1,1] }}
          transition={{ duration:orb.dur, repeat:Infinity, ease:'easeInOut', delay:i*1.2 }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        {/* Badge */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-purple-500/35 bg-purple-900/25 text-purple-300 text-sm font-medium">
          <Sparkles size={14} className="text-fuchsia-400" />
          Open to Internship Opportunities
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </motion.div>

        {/* Name */}
        <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.1}}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-bold mb-4 leading-none tracking-tight">
          <span className="text-white">Kanwal</span><br />
          <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-violet-400 bg-clip-text text-transparent glow-text">
            Noor ul Ain
          </span>
        </motion.h1>

        {/* Animated role chips */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.25}}
          className="flex flex-wrap justify-center gap-2 mb-6">
          {[
            { label:'Web Developer', color:'from-purple-600/30 to-purple-800/20 border-purple-500/30 text-purple-300' },
            { label:'CS Student',    color:'from-fuchsia-600/30 to-fuchsia-800/20 border-fuchsia-500/30 text-fuchsia-300' },
            { label:'UI/UX Enthusiast', color:'from-violet-600/30 to-violet-800/20 border-violet-500/30 text-violet-300' },
          ].map(chip => (
            <span key={chip.label}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border bg-gradient-to-r ${chip.color}`}>
              {chip.label}
            </span>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.35}}
          className="max-w-2xl mx-auto text-white/50 text-lg leading-relaxed mb-10">
          Computer Science student at FJWU with hands-on frontend internship experience.
          I craft responsive, performant web experiences with clean code and intentional design.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.45}}
          className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <motion.a href="#projects"
            className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-purple-600/30 shine"
            whileHover={{scale:1.03}} whileTap={{scale:0.98}}>
            View My Work
          </motion.a>
          <motion.button onClick={() => setCvOpen(true)}
            className="px-8 py-3.5 border border-fuchsia-500/40 hover:border-fuchsia-400/70 text-white/70 hover:text-fuchsia-300 font-medium rounded-xl transition-all duration-200 hover:bg-fuchsia-900/20 flex items-center gap-2"
            whileHover={{scale:1.03}} whileTap={{scale:0.98}}>
            <Download size={16} />
            Download CV
          </motion.button>
          <motion.a href="#contact"
            className="px-8 py-3.5 border border-white/10 hover:border-white/25 text-white/40 hover:text-white/70 font-medium rounded-xl transition-all duration-200"
            whileHover={{scale:1.03}} whileTap={{scale:0.98}}>
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Socials */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.7,delay:0.6}}
          className="flex items-center justify-center gap-4">
          {[
            { icon:Github,   href:'https://github.com/KanwalNoor23/',                              label:'GitHub'   },
            { icon:Linkedin, href:'https://www.linkedin.com/in/kanwal-noor-ul-ain-b6ab5334',       label:'LinkedIn' },
            { icon:Mail,     href:'mailto:kanwalnoor903@gmail.com',                                label:'Email'    },
          ].map(({ icon:Icon, href, label }) => (
            <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 hover:border-purple-500/60 text-white/35 hover:text-purple-300 bg-white/5 hover:bg-purple-900/30 transition-all duration-200"
              whileHover={{scale:1.12,y:-2}} whileTap={{scale:0.95}}>
              <Icon size={18} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2,duration:0.7}}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div animate={{y:[0,6,0]}} transition={{duration:1.5,repeat:Infinity,ease:'easeInOut'}}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>

      <CVDownloadModal open={cvOpen} onClose={() => setCvOpen(false)} />
    </section>
  )
}
