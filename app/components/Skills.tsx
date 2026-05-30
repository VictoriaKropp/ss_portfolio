'use client'

import { useEffect, useRef } from 'react'
import '../styles/Skills.css'

interface Skill {
  name: string
  desc: string
  x: number
  y: number
}

const skills: Record<string, Skill[]> = {
  es: [
    { name: 'Ingeniería de Menú',  desc: 'Food cost, rentabilidad por plato. El menú como herramienta financiera.',    x: 18, y: 22 },
    { name: 'Auditoría Operativa', desc: 'Diagnóstico de procesos, costos y flujos. Donde se pierde el dinero.',       x: 32, y: 30 },
    { name: 'P&L / Rentabilidad',  desc: 'Control de márgenes y estructura de costos. Negocios que dejan de sangrar.', x: 46, y: 22 },
    { name: 'BPM / POES',          desc: 'Estandarización de procesos. Sistemas que funcionan sin el chef.',           x: 60, y: 30 },
    { name: 'Control de Mermas',   desc: 'Optimización de materia prima. Cada gramo cuenta.',                          x: 72, y: 20 },
    { name: 'Diseño de Conceptos', desc: 'De la idea a la operación viable. Identidad, menú y modelo de negocio.',     x: 38, y: 48 },
    { name: 'Gestión de Equipos',  desc: 'Liderazgo de brigadas en alta demanda. Protocolos, cultura, performance.',   x: 55, y: 52 },
    { name: 'Aperturas',           desc: 'Del proyecto a la operación estable. Sin improvisación.',                    x: 26, y: 62 },
    { name: 'Proveedores',         desc: 'Negociación, auditoría de recepción y cadena de suministro.',                x: 50, y: 68 },
    { name: 'Sous Vide & Técnica', desc: 'Cocina de precisión al servicio de la estandarización.',                    x: 80, y: 44 },
    { name: 'Alta Demanda',        desc: 'Operaciones de alto volumen con estándares sostenidos.',                     x: 88, y: 56 },
  ],
  en: [
    { name: 'Menu Engineering',      desc: 'Food cost, profitability per dish. The menu as a financial tool.',         x: 18, y: 22 },
    { name: 'Operational Audit',     desc: 'Process, cost and flow diagnosis. Where money is lost.',                  x: 32, y: 30 },
    { name: 'P&L / Profitability',   desc: 'Margin control and cost structure. Businesses that stop bleeding.',       x: 46, y: 22 },
    { name: 'BPM / SOPs',            desc: 'Process standardization. Systems that work without the chef.',            x: 60, y: 30 },
    { name: 'Waste Control',         desc: 'Raw material optimization. Every gram counts.',                           x: 72, y: 20 },
    { name: 'Concept Design',        desc: 'From idea to viable operation. Identity, menu and business model.',       x: 38, y: 48 },
    { name: 'Team Management',       desc: 'Brigade leadership under high demand. Protocols, culture, performance.',  x: 55, y: 52 },
    { name: 'Openings',              desc: 'From project to stable operation. No improvisation.',                     x: 26, y: 62 },
    { name: 'Suppliers',             desc: 'Negotiation, receiving audit and supply chain management.',               x: 50, y: 68 },
    { name: 'Sous Vide & Technique', desc: 'Precision cooking in service of standardization.',                       x: 80, y: 44 },
    { name: 'High Volume',           desc: 'High-volume operations with sustained standards.',                        x: 88, y: 56 },
  ],
}

const connections = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 7], [7, 8], [8, 5], [5, 6],
  [1, 5], [2, 5], [3, 6], [4, 6],
  [4, 9], [9, 10],
  [6, 9],
]

const labels: Record<string, { eyebrow: string; titulo: string }> = {
  es: { eyebrow: 'Competencias', titulo: 'El arsenal' },
  en: { eyebrow: 'Competencies', titulo: 'The arsenal' },
}

type Node = Skill & { px: number; py: number }

export default function Skills({ locale }: { locale: string }) {
  const t    = locale === 'en' ? 'en' : 'es'
  const data = skills[t]
  const l    = labels[t]

  const wrapRef    = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const rafRef     = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap   = wrapRef.current
    if (!canvas || !wrap) return

    const c: HTMLCanvasElement      = canvas
    const w: HTMLDivElement         = wrap

    const phases = data.map(() => Math.random() * Math.PI * 2)
    const speeds = data.map(() => 0.4 + Math.random() * 0.6)
    const dpr    = window.devicePixelRatio || 1

    let W           = 0
    let H           = 0
    let hoveredIdx  = -1
    let nodes: Node[] = []

    function resize() {
      W = w.offsetWidth
      H = w.offsetHeight
      c.width          = W * dpr
      c.height         = H * dpr
      c.style.width    = W + 'px'
      c.style.height   = H + 'px'
      nodes = data.map(s => ({
        ...s,
        px: (s.x / 100) * W,
        py: (s.y / 100) * H,
      }))
    }

    function draw(ts: number) {
      const ctx = c.getContext('2d')
      if (!ctx) return
      ctx.save()
      ctx.scale(dpr, dpr)
      ctx.clearRect(0, 0, W, H)

      connections.forEach(([a, b]) => {
        if (!nodes[a] || !nodes[b]) return
        const isHov = hoveredIdx === a || hoveredIdx === b
        ctx.beginPath()
        ctx.moveTo(nodes[a].px, nodes[a].py)
        ctx.lineTo(nodes[b].px, nodes[b].py)
        ctx.strokeStyle = isHov ? 'rgba(184,150,90,0.6)' : 'rgba(184,150,90,0.18)'
        ctx.lineWidth   = isHov ? 1 : 0.5
        ctx.stroke()
      })

      nodes.forEach((n, i) => {
        const isHov = hoveredIdx === i
        const pulse = 0.5 + 0.5 * Math.sin(ts / 1000 * speeds[i] + phases[i])
        const baseR = 3.5
        const r     = isHov ? baseR * 1.8 : baseR + pulse * 1.8
        const alpha = isHov ? 1 : 0.4 + pulse * 0.5
        const glow  = isHov ? 0.15 : 0.04 + pulse * 0.08

        ctx.beginPath()
        ctx.arc(n.px, n.py, r * 2.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(184,150,90,${glow})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(n.px, n.py, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(184,150,90,${alpha})`
        ctx.fill()

        ctx.font      = `${isHov ? 500 : 300} ${isHov ? 11 : 10}px 'Jost', sans-serif`
        ctx.fillStyle = isHov ? '#f4efe6' : `rgba(138,138,138,${0.5 + pulse * 0.4})`
        ctx.textAlign = 'center'
        ctx.fillText(n.name, n.px, n.py + r + 13)
      })

      ctx.restore()
      rafRef.current = requestAnimationFrame(draw)
    }

    function findNode(mx: number, my: number): number {
      let found = -1
      nodes.forEach((n, i) => {
        if (Math.hypot(mx - n.px, my - n.py) < 22) found = i
      })
      return found
    }

    function showTooltip(idx: number, mx: number, my: number) {
      const tt = tooltipRef.current
      if (!tt) return
      if (idx < 0) { tt.style.opacity = '0'; return }
      const nameEl = tt.querySelector('.skills__tt-name')
      const descEl = tt.querySelector('.skills__tt-desc')
      if (nameEl) nameEl.textContent = nodes[idx].name
      if (descEl) descEl.textContent = nodes[idx].desc
      tt.style.left    = (mx + 20 + 210 > W ? mx - 210 : mx + 20) + 'px'
      tt.style.top     = Math.max(0, my - 30) + 'px'
      tt.style.opacity = '1'
    }

    function hideTooltip() {
      const tt = tooltipRef.current
      if (tt) tt.style.opacity = '0'
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = c.getBoundingClientRect()
      const mx   = e.clientX - rect.left
      const my   = e.clientY - rect.top
      hoveredIdx = findNode(mx, my)
      showTooltip(hoveredIdx, mx, my)
    }

    const onMouseLeave = () => { hoveredIdx = -1; hideTooltip() }

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      const rect  = c.getBoundingClientRect()
      const touch = e.touches[0]
      const mx    = touch.clientX - rect.left
      const my    = touch.clientY - rect.top
      hoveredIdx  = findNode(mx, my)
      showTooltip(hoveredIdx, mx, my)
    }

    const onTouchEnd = () => {
      setTimeout(() => { hoveredIdx = -1; hideTooltip() }, 2000)
    }

    c.addEventListener('mousemove',  onMouseMove)
    c.addEventListener('mouseleave', onMouseLeave)
    c.addEventListener('touchstart', onTouchStart, { passive: false })
    c.addEventListener('touchend',   onTouchEnd)
    window.addEventListener('resize', resize)

    resize()
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      c.removeEventListener('mousemove',  onMouseMove)
      c.removeEventListener('mouseleave', onMouseLeave)
      c.removeEventListener('touchstart', onTouchStart)
      c.removeEventListener('touchend',   onTouchEnd)
      window.removeEventListener('resize', resize)
    }
  }, [data])

  return (
    <section className="skills" id="skills">
      <div className="skills__inner">
        <div className="skills__header">
          <p className="skills__eyebrow">{l.eyebrow}</p>
          <h2 className="skills__titulo">{l.titulo}</h2>
        </div>
        <div className="skills__canvas-wrap" ref={wrapRef}>
          <canvas ref={canvasRef} className="skills__canvas" />
          <div className="skills__tooltip" ref={tooltipRef}>
            <p className="skills__tt-name"></p>
            <p className="skills__tt-desc"></p>
          </div>
        </div>
      </div>
    </section>
  )
}
