'use client'

import { useRef, useState } from 'react'
import '../styles/Testimonios.css'

interface Testimonio {
  tipo: 'texto' | 'youtube' | 'tiktok'
  nombre: string
  cargo: string
  empresa: string
  pais: string
  foto?: string
  videoId?: string  // YouTube: ID del video | TikTok: ID del video
  testimonio?: string
}

const content: Record<string, { eyebrow: string; titulo: string; testimonios: Testimonio[] }> = {
  es: {
    eyebrow: 'Testimonios',
    titulo: 'Lo que dicen',
    testimonios: [
      {
        tipo: 'texto',
        nombre: 'Martín Rodríguez',
        cargo: 'Dueño',
        empresa: 'Bodegón Central',
        pais: 'Argentina',
        foto: '/testimonios/martin.jpg',
        testimonio: 'En tres meses redujo nuestros costos un 18% sin tocar la calidad. Yo llevaba dos años mirando los números sin entender qué pasaba. Seba entró, lo vio en una semana y lo resolvió en dos meses.',
      },
      {
        tipo: 'youtube',
        nombre: 'Carolina Méndez',
        cargo: 'Socia fundadora',
        empresa: 'Taberna Torremolinos',
        pais: 'Argentina',
        foto: '/testimonios/carolina.jpg',
        videoId: 'YOUTUBE_VIDEO_ID',
      },
      {
        tipo: 'tiktok',
        nombre: 'Jorge Almada',
        cargo: 'Director de Operaciones',
        empresa: 'Soleiljohn Eventos',
        pais: 'Argentina',
        foto: '/testimonios/jorge.jpg',
        videoId: 'TIKTOK_VIDEO_ID',
      },
    ],
  },
  en: {
    eyebrow: 'Testimonials',
    titulo: 'What they say',
    testimonios: [
      {
        tipo: 'texto',
        nombre: 'Martín Rodríguez',
        cargo: 'Owner',
        empresa: 'Bodegón Central',
        pais: 'Argentina',
        foto: '/testimonios/martin.jpg',
        testimonio: 'In three months he reduced our costs by 18% without touching quality. I had been staring at the numbers for two years without understanding what was happening. Seba walked in, saw it in a week and fixed it in two months.',
      },
      {
        tipo: 'youtube',
        nombre: 'Carolina Méndez',
        cargo: 'Co-founder',
        empresa: 'Taberna Torremolinos',
        pais: 'Argentina',
        foto: '/testimonios/carolina.jpg',
        videoId: 'YOUTUBE_VIDEO_ID',
      },
      {
        tipo: 'tiktok',
        nombre: 'Jorge Almada',
        cargo: 'Operations Director',
        empresa: 'Soleiljohn Eventos',
        pais: 'Argentina',
        foto: '/testimonios/jorge.jpg',
        videoId: 'TIKTOK_VIDEO_ID',
      },
    ],
  },
}

function AutorRow({ t }: { t: Testimonio }) {
  return (
    <div className="testimonios__autor">
      {t.foto && (
        <div className="testimonios__foto-wrap">
          <img src={t.foto} alt={t.nombre} className="testimonios__foto" />
        </div>
      )}
      <div className="testimonios__autor-info">
        <span className="testimonios__nombre">{t.nombre}</span>
        <span className="testimonios__meta">{t.cargo} · {t.empresa} · {t.pais}</span>
      </div>
    </div>
  )
}

export default function Testimonios({ locale }: { locale: string }) {
  const t = content[locale as keyof typeof content] || content.es
  const [active, setActive] = useState(0)
  const startX   = useRef(0)
  const dragging = useRef(false)

  const goTo = (idx: number) => {
    setActive(Math.max(0, Math.min(idx, t.testimonios.length - 1)))
  }

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current   = e.touches[0].clientX
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

  const current = t.testimonios[active]

  return (
    <section className="testimonios" id="testimonios">
      <div className="testimonios__inner">

        <div className="testimonios__header">
          <p className="testimonios__eyebrow">{t.eyebrow}</p>
          <h2 className="testimonios__titulo">{t.titulo}</h2>
        </div>

        <div
          className="testimonios__stage"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          <div className="testimonios__card" key={active}>

            {/* texto */}
            {current.tipo === 'texto' && (
              <>
                <p className="testimonios__quote">{current.testimonio}</p>
                <AutorRow t={current} />
              </>
            )}

            {/* youtube */}
            {current.tipo === 'youtube' && (
              <>
                <div className="testimonios__embed-wrap">
                  <iframe
                    className="testimonios__embed"
                    src={`https://www.youtube.com/embed/${current.videoId}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <AutorRow t={current} />
              </>
            )}

            {/* tiktok */}
            {current.tipo === 'tiktok' && (
              <>
                <div className="testimonios__embed-wrap testimonios__embed-wrap--tiktok">
                  <iframe
                    className="testimonios__embed"
                    src={`https://www.tiktok.com/embed/${current.videoId}`}
                    allow="autoplay"
                    allowFullScreen
                  />
                </div>
                <AutorRow t={current} />
              </>
            )}

          </div>
        </div>

        {/* dots */}
        <div className="testimonios__dots">
          {t.testimonios.map((_, i) => (
            <button
              key={i}
              className={`testimonios__dot ${i === active ? 'testimonios__dot--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Testimonio ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
