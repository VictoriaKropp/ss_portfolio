'use client'

import '../styles/About.css'

interface AboutContent {
  eyebrow: string
  titulo: string
  bio: string
  stats: { valor: string; etiqueta: string }[]
}

const content: Record<string, AboutContent> = {
  es: {
    eyebrow: 'Sobre mí',
    titulo: 'No soy un chef.\nSoy el que hace que tu negocio funcione.',
    bio: 'Más de 20 años diseñando, auditando y transformando operaciones gastronómicas. Trabajo en el cruce entre la cocina y la gestión: donde se pierden los márgenes, donde se rompen los equipos, donde los conceptos mueren antes de nacer. Mi valor no está en el plato. Está en el sistema detrás.',
    stats: [
      { valor: '+20', etiqueta: 'Años de experiencia' },
      { valor: '+50', etiqueta: 'Proyectos ejecutados' },
      { valor: '3', etiqueta: 'Países de operación' },
      { valor: '0', etiqueta: 'Soluciones genéricas' },
    ],
  },
  en: {
    eyebrow: 'About',
    titulo: "I'm not a chef.\nI'm the one who makes your business work.",
    bio: 'Over 20 years designing, auditing and transforming gastronomic operations. I work at the intersection of kitchen and management: where margins are lost, where teams break down, where concepts die before they launch. My value is not on the plate. It\'s in the system behind it.',
    stats: [
      { valor: '+20', etiqueta: 'Years of experience' },
      { valor: '+50', etiqueta: 'Projects executed' },
      { valor: '3', etiqueta: 'Countries of operation' },
      { valor: '0', etiqueta: 'Generic solutions' },
    ],
  },
}

export default function About({ locale }: { locale: string }) {
  const t = content[locale as keyof typeof content] || content.es

  return (
    <section className="about" id="about">
      <div className="about__inner">

        <div className="about__header">
          <p className="about__eyebrow">{t.eyebrow}</p>
          <h2 className="about__titulo">
            {t.titulo.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < t.titulo.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>

        <div className="about__body">
          <div className="about__bio">
            <p>{t.bio}</p>
          </div>

          <div className="about__stats">
            {t.stats.map((s, i) => (
              <div className="about__stat" key={i}>
                <span className="about__stat-valor">{s.valor}</span>
                <span className="about__stat-etiqueta">{s.etiqueta}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about__linea" aria-hidden="true" />

      </div>
    </section>
  )
}
