'use client'

import { useState } from 'react'
import '../styles/Proyectos.css'

interface Proyecto {
  id: string
  titulo: string
  rol: string
  descripcion: string
  imagen: string
  link?: string
  año: string
}

const content: Record<string, { eyebrow: string; titulo: string; verMas: string; proyectos: Proyecto[] }> = {
  es: {
    eyebrow: 'Proyectos',
    titulo: 'Negocios que construí',
    verMas: 'Ver proyecto',
    proyectos: [
      {
        id: '01',
        titulo: 'Proyecto 1',
        rol: 'Estratega Gastronómico',
        descripcion: 'Descripción del proyecto. Concepto, desafío y resultado.',
        imagen: '/proyectos/proyecto1.jpg',
        link: '',
        año: '2024',
      },
      {
        id: '02',
        titulo: 'Proyecto 2',
        rol: 'Consultor & Chef Ejecutivo',
        descripcion: 'Descripción del proyecto. Concepto, desafío y resultado.',
        imagen: '/proyectos/proyecto2.jpg',
        link: '',
        año: '2023',
      },
      {
        id: '03',
        titulo: 'Proyecto 3',
        rol: 'Diseño de Concepto',
        descripcion: 'Descripción del proyecto. Concepto, desafío y resultado.',
        imagen: '/proyectos/proyecto3.jpg',
        año: '2022',
      },
      {
        id: '04',
        titulo: 'Proyecto 4',
        rol: 'Auditoría & Optimización',
        descripcion: 'Descripción del proyecto. Concepto, desafío y resultado.',
        imagen: '/proyectos/proyecto4.jpg',
        año: '2021',
      },
    ],
  },
  en: {
    eyebrow: 'Projects',
    titulo: 'Businesses I built',
    verMas: 'View project',
    proyectos: [
      {
        id: '01',
        titulo: 'Project 1',
        rol: 'Gastronomic Strategist',
        descripcion: 'Project description. Concept, challenge and result.',
        imagen: '/proyectos/proyecto1.jpg',
        link: '',
        año: '2024',
      },
      {
        id: '02',
        titulo: 'Project 2',
        rol: 'Consultant & Executive Chef',
        descripcion: 'Project description. Concept, challenge and result.',
        imagen: '/proyectos/proyecto2.jpg',
        link: '',
        año: '2023',
      },
      {
        id: '03',
        titulo: 'Project 3',
        rol: 'Concept Design',
        descripcion: 'Project description. Concept, challenge and result.',
        imagen: '/proyectos/proyecto3.jpg',
        año: '2022',
      },
      {
        id: '04',
        titulo: 'Project 4',
        rol: 'Audit & Optimization',
        descripcion: 'Project description. Concept, challenge and result.',
        imagen: '/proyectos/proyecto4.jpg',
        año: '2021',
      },
    ],
  },
}

export default function Proyectos({ locale }: { locale: string }) {
  const t = content[locale as keyof typeof content] || content.es
  const [activeId, setActiveId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setActiveId(prev => prev === id ? null : id)
  }

  return (
    <section className="proyectos" id="proyectos">
      <div className="proyectos__inner">

        <div className="proyectos__header">
          <p className="proyectos__eyebrow">{t.eyebrow}</p>
          <h2 className="proyectos__titulo">{t.titulo}</h2>
        </div>

        <div className="proyectos__grid">
          {t.proyectos.map((p) => {
            const isActive = activeId === p.id
            return (
              <article
                key={p.id}
                className={`proyectos__card ${isActive ? 'proyectos__card--active' : ''}`}
                onClick={() => toggle(p.id)}
              >
                {/* imagen poster */}
                <div className="proyectos__poster">
                  <img
                    src={p.imagen}
                    alt={p.titulo}
                    className="proyectos__img"
                  />
                  <div className="proyectos__overlay" />
                </div>

                {/* info siempre visible abajo */}
                <div className="proyectos__base">
                  <span className="proyectos__año">{p.año}</span>
                  <h3 className="proyectos__card-titulo">{p.titulo}</h3>
                </div>

                {/* info al hover/tap */}
                <div className="proyectos__info">
                  <p className="proyectos__rol">{p.rol}</p>
                  <p className="proyectos__desc">{p.descripcion}</p>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="proyectos__link"
                      onClick={e => e.stopPropagation()}
                    >
                      {t.verMas} →
                    </a>
                  )}
                </div>

              </article>
            )
          })}
        </div>

      </div>
    </section>
  )
}
