import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kanwal Noor ul Ain — Aspiring Web Developer',
  description: 'Portfolio of Kanwal Noor ul Ain — Computer Science student, frontend developer, and UI/UX enthusiast.',
  keywords: ['web developer', 'frontend', 'portfolio', 'Next.js', 'React'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#070709] text-[#f1f0f7] font-body antialiased">
        {children}
      </body>
    </html>
  )
}
