'use client'

import '../styles/Contacto.css'

const content: Record<string, {
  eyebrow: string
  titulo: string
  subtitulo: string
  botones: { label: string; href: string; icon: string }[]
}> = {
  es: {
    eyebrow: 'Contacto',
    titulo: 'Hablemos.',
    subtitulo: 'Si tu negocio gastronómico necesita resultados reales, este es el primer paso.',
    botones: [
      { label: 'WhatsApp',  href: 'https://wa.me/541169007122',                              icon: 'WA' },
      { label: 'Email',     href: 'mailto:vsscatturice@gmail.com',                           icon: '@' },
      { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/sebastianscatturice',         icon: 'in' },
    ],
  },
  en: {
    eyebrow: 'Contact',
    titulo: "Let's talk.",
    subtitulo: "If your gastronomic business needs real results, this is the first step.",
    botones: [
      { label: 'WhatsApp',  href: 'https://wa.me/541169007122',                              icon: 'WA' },
      { label: 'Email',     href: 'mailto:vsscatturice@gmail.com',                           icon: '@' },
      { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/sebastianscatturice',         icon: 'in' },
    ],
  },
}

export default function Contacto({ locale }: { locale: string }) {
  const t = content[locale as keyof typeof content] || content.es

  return (
    <section className="contacto" id="contacto">
      <div className="contacto__inner">

        <div className="contacto__header">
          <p className="contacto__eyebrow">{t.eyebrow}</p>
          <h2 className="contacto__titulo">{t.titulo}</h2>
          <p className="contacto__subtitulo">{t.subtitulo}</p>
        </div>

        <div className="contacto__botones">
          {t.botones.map((b) => (
            <a
              key={b.label}
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contacto__btn"
            >
              <span className="contacto__btn-icon">{b.icon}</span>
              <span className="contacto__btn-label">{b.label}</span>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
