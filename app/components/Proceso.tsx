'use client'

import { useRef, useState } from 'react'
import '../styles/Proceso.css'

interface Paso {
  numero: string
  titulo: string
  descripcion: string
}

const content: Record<string, { eyebrow: string; titulo: string; pasos: Paso[] }> = {
  es: {
    eyebrow: 'Cómo trabajo',
    titulo: 'El método',
    pasos: [
      {
        numero: '01',
        titulo: 'Diagnóstico',
        descripcion: 'Antes de tocar nada, entiendo qué está pasando. Audito procesos, costos, flujos y personas. Sin suposiciones.',
      },
      {
        numero: '02',
        titulo: 'Análisis',
        descripcion: 'Los números no mienten. Descompongo el P&L, identifico las fugas y calculo el impacto real de cada problema.',
      },
      {
        numero: '03',
        titulo: 'Estrategia',
        descripcion: 'Diseño un plan específico para tu negocio. No hay soluciones genéricas. Cada intervención es quirúrgica.',
      },
      {
        numero: '04',
        titulo: 'Ejecución',
        descripcion: 'Implemento, acompaño y mido. El trabajo no termina con el plan — termina cuando los resultados son sostenibles.',
      },
    ],
  },
  en: {
    eyebrow: 'How I work',
    titulo: 'The method',
    pasos: [
      {
        numero: '01',
        titulo: 'Diagnosis',
        descripcion: 'Before touching anything, I understand what\'s happening. I audit processes, costs, flows and people. No assumptions.',
      },
      {
        numero: '02',
        titulo: 'Analysis',
        descripcion: 'Numbers don\'t lie. I break down the P&L, identify the leaks and calculate the real impact of each problem.',
      },
      {
        numero: '03',
        titulo: 'Strategy',
        descripcion: 'I design a plan specific to your business. No generic solutions. Every intervention is surgical.',
      },
      {
        numero: '04',
        titulo: 'Execution',
        descripcion: 'I implement, accompany and measure. The work doesn\'t end with the plan — it ends when results are sustainable.',
      },
    ],
  },
}

export default function Proceso({ locale }: { locale: string }) {
  const t    = content[locale as keyof typeof content] || content.es
  const [active, setActive] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const startX   = useRef(0)
  const dragging = useRef(false)

  const goTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(idx, t.pasos.length - 1))
    setActive(clamped)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current  = e.touches[0].clientX
    dragging.current = true
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!dragging.current) return
    const diff = startX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) goTo(active + (diff > 0 ? 1 : -1))
    dragging.current = false
  }

  const onMouseDown = (e: React.MouseEvent) => {
    startX.current   = e.clientX
    dragging.current = true
  }

  const onMouseUp = (e: React.MouseEvent) => {
    if (!dragging.current) return
    const diff = startX.current - e.clientX
    if (Math.abs(diff) > 40) goTo(active + (diff > 0 ? 1 : -1))
    dragging.current = false
  }

  return (
    <section className="proceso" id="proceso">
      <div className="proceso__inner">

        <div className="proceso__header">
          <p className="proceso__eyebrow">{t.eyebrow}</p>
          <h2 className="proceso__titulo">{t.titulo}</h2>
        </div>

        {/* carousel */}
        <div
          className="proceso__track-wrap"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          <div
            className="proceso__track"
            ref={trackRef}
            style={{ transform: `translateX(calc(-${active} * (var(--card-w) + var(--card-gap))))` }}
          >
            {t.pasos.map((paso, i) => (
              <article
                key={paso.numero}
                className={`proceso__card ${i === active ? 'proceso__card--active' : ''}`}
                onClick={() => goTo(i)}
              >
                <span className="proceso__card-numero">{paso.numero}</span>
                <h3 className="proceso__card-titulo">{paso.titulo}</h3>
                <p className="proceso__card-desc">{paso.descripcion}</p>
                <div className="proceso__card-linea" />
              </article>
            ))}
          </div>
        </div>

        {/* dots */}
        <div className="proceso__dots">
          {t.pasos.map((_, i) => (
            <button
              key={i}
              className={`proceso__dot ${i === active ? 'proceso__dot--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Paso ${i + 1}`}
            />
          ))}
        </div>

        {/* nav desktop */}
        <div className="proceso__nav">
          <button
            className="proceso__nav-btn"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Anterior"
          >
            ←
          </button>
          <button
            className="proceso__nav-btn"
            onClick={() => goTo(active + 1)}
            disabled={active === t.pasos.length - 1}
            aria-label="Siguiente"
          >
            →
          </button>
        </div>

      </div>
    </section>
  )
}
