'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, Star, GitFork, ExternalLink, Clock, Code2 } from 'lucide-react'

interface Repo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  topics: string[]
  fork: boolean
}

const languageColors: Record<string, string> = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  PHP: '#4F5D95',
  default: '#9333ea',
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 30) return `${days}d ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return `${Math.floor(days / 365)}y ago`
}

export default function GitHubProjects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [stats, setStats] = useState({ stars: 0, forks: 0, repos: 0 })

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          'https://api.github.com/users/KanwalNoor23/repos?sort=updated&per_page=30',
          { headers: { Accept: 'application/vnd.github.v3+json' } }
        )
        if (!res.ok) throw new Error('Failed')
        const data: Repo[] = await res.json()

        // Filter out forks, sort by stars then updated
        const filtered = data
          .filter(r => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count || 
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())

        setRepos(filtered)
        setStats({
          stars: data.reduce((s, r) => s + r.stargazers_count, 0),
          forks: data.reduce((s, r) => s + r.forks_count, 0),
          repos: data.filter(r => !r.fork).length,
        })
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchRepos()
  }, [])

  return (
    <section id="github" className="relative py-32 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none" />

      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-3">
            Live from GitHub
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="font-display text-5xl md:text-6xl font-bold text-white">
              My Repositories
            </h2>
            <a
              href="https://github.com/KanwalNoor23/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-purple-600/30 text-purple-300 text-sm hover:bg-purple-900/20 transition-all duration-200 self-start sm:self-auto"
            >
              <Github size={16} />
              View Profile
              <ExternalLink size={12} />
            </a>
          </div>
          <p className="text-white/35 mt-3 text-sm">
            Auto-updates whenever you push to GitHub ✦ No manual edits needed
          </p>
        </motion.div>

        {/* Stats bar */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-4 mb-10"
          >
            {[
              { label: 'Public Repos', value: stats.repos },
              { label: 'Total Stars', value: stats.stars },
              { label: 'Total Forks', value: stats.forks },
            ].map(stat => (
              <div
                key={stat.label}
                className="card-glass rounded-xl px-5 py-3 flex items-center gap-3"
              >
                <span className="font-display text-2xl font-bold text-purple-300">{stat.value}</span>
                <span className="text-white/30 text-xs">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-glass rounded-2xl p-6 animate-pulse">
                <div className="h-4 bg-white/10 rounded mb-3 w-2/3" />
                <div className="h-3 bg-white/5 rounded mb-2 w-full" />
                <div className="h-3 bg-white/5 rounded mb-4 w-4/5" />
                <div className="h-3 bg-white/5 rounded w-1/3" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="card-glass rounded-2xl p-10 text-center">
            <Github size={40} className="text-white/20 mx-auto mb-4" />
            <p className="text-white/40 mb-2">Couldn't load repositories right now</p>
            <a
              href="https://github.com/KanwalNoor23/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 text-sm hover:text-purple-300 transition-colors"
            >
              View directly on GitHub →
            </a>
          </div>
        )}

        {/* Repos grid */}
        {!loading && !error && repos.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="card-glass rounded-2xl p-5 hover:border-purple-500/40 transition-all duration-300 group flex flex-col"
                whileHover={{ y: -3 }}
              >
                {/* Top */}
                <div className="flex items-start justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-900/40 flex items-center justify-center group-hover:bg-purple-800/50 transition-colors">
                    <Code2 size={15} className="text-purple-400" />
                  </div>
                  <ExternalLink
                    size={14}
                    className="text-white/15 group-hover:text-purple-400 transition-colors mt-1"
                  />
                </div>

                {/* Name */}
                <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-purple-200 transition-colors leading-snug">
                  {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
                </h3>

                {/* Description */}
                <p className="text-white/35 text-xs leading-relaxed mb-4 flex-1">
                  {repo.description || 'No description provided'}
                </p>

                {/* Topics */}
                {repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {repo.topics.slice(0, 3).map(topic => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 text-xs rounded-md bg-purple-900/30 text-purple-400 border border-purple-800/30"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-3 text-white/25 text-xs">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor:
                              languageColors[repo.language] || languageColors.default,
                          }}
                        />
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1">
                        <Star size={11} />
                        {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="flex items-center gap-1">
                        <GitFork size={11} />
                        {repo.forks_count}
                      </span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-white/20 text-xs">
                    <Clock size={10} />
                    {timeAgo(repo.updated_at)}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && repos.length === 0 && (
          <div className="card-glass rounded-2xl p-10 text-center">
            <p className="text-white/40">No public repositories found yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}
