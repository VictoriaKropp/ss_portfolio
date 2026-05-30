'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import '../styles/Navbar.css'

const links = [
  { key: 'about',        href: '#about' },
  { key: 'services',     href: '#servicios' },
  { key: 'projects',     href: '#proyectos' },
  { key: 'skills',       href: '#skills' },
  { key: 'process',      href: '#proceso' },
  { key: 'testimonials', href: '#testimonios' },
  { key: 'contact',      href: '#contacto' },
]

const labels: Record<string, Record<string, string>> = {
  es: {
    about: 'Sobre mí',
    services: 'Servicios',
    projects: 'Proyectos',
    skills: 'Skills',
    process: 'Proceso',
    testimonials: 'Testimonios',
    contact: 'Contacto',
  },
  en: {
    about: 'About',
    services: 'Services',
    projects: 'Projects',
    skills: 'Skills',
    process: 'Process',
    testimonials: 'Testimonials',
    contact: 'Contact',
  }
}

export default function Navbar() {
  const params = useParams()
  const locale = (params?.locale as string) || 'es'
  const [open, setOpen] = useState(false)
  const otherLocale = locale === 'es' ? 'en' : 'es'

  return (
    <header className="navbar">
      <Link href={`/${locale}`} className="navbar__logo">
        <Image src="/logo.png" alt="Logo" width={48} height={48} priority />
      </Link>

      <nav className={`navbar__menu ${open ? 'navbar__menu--open' : ''}`}>
        {links.map(link => (
          <a
            key={link.key}
            href={link.href}
            className="navbar__link"
            onClick={() => setOpen(false)}
          >
            {labels[locale][link.key]}
          </a>
        ))}
        <Link href={`/${otherLocale}`} className="navbar__lang">
          {otherLocale.toUpperCase()}
        </Link>
      </nav>

      <button
        className={`navbar__risotto ${open ? 'navbar__risotto--open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Menú risotto"
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  )
}