import '../styles/Servicios.css'

interface Servicio {
  numero: string
  titulo: string
  descripcion: string
}

interface ServiciosContent {
  eyebrow: string
  titulo: string
  servicios: Servicio[]
}

const content: Record<string, ServiciosContent> = {
  es: {
    eyebrow: 'Servicios',
    titulo: 'Lo que resuelvo',
    servicios: [
      {
        numero: '01',
        titulo: 'Auditoría Operativa',
        descripcion: 'Diagnóstico profundo de procesos, costos, flujos y equipos. Identifico dónde se pierde el dinero y por qué.',
      },
      {
        numero: '02',
        titulo: 'Diseño de Concepto',
        descripcion: 'Creación de propuestas gastronómicas desde cero: identidad, menú, operación y viabilidad económica.',
      },
      {
        numero: '03',
        titulo: 'Optimización de Costos',
        descripcion: 'Ingeniería de menú, control de mermas, negociación con proveedores y rediseño de estructura de costos.',
      },
      {
        numero: '04',
        titulo: 'Gestión de Equipos',
        descripcion: 'Formación, reorganización y liderazgo de brigadas. Protocolos, cultura y performance sostenida.',
      },
      {
        numero: '05',
        titulo: 'Aperturas & Relanzamientos',
        descripcion: 'Acompañamiento integral desde el proyecto hasta la operación estable. Sin improvisación.',
      },
      {
        numero: '06',
        titulo: 'Consultoría Estratégica',
        descripcion: 'Posicionamiento, escalabilidad y toma de decisiones para negocios gastronómicos que quieren crecer.',
      },
    ],
  },
  en: {
    eyebrow: 'Services',
    titulo: 'What I solve',
    servicios: [
      {
        numero: '01',
        titulo: 'Operational Audit',
        descripcion: 'Deep diagnosis of processes, costs, flows and teams. I identify where money is lost and why.',
      },
      {
        numero: '02',
        titulo: 'Concept Design',
        descripcion: 'Creation of gastronomic proposals from scratch: identity, menu, operations and economic viability.',
      },
      {
        numero: '03',
        titulo: 'Cost Optimization',
        descripcion: 'Menu engineering, waste control, supplier negotiation and cost structure redesign.',
      },
      {
        numero: '04',
        titulo: 'Team Management',
        descripcion: 'Training, reorganization and leadership of brigades. Protocols, culture and sustained performance.',
      },
      {
        numero: '05',
        titulo: 'Openings & Relaunches',
        descripcion: 'Full support from project to stable operation. No improvisation.',
      },
      {
        numero: '06',
        titulo: 'Strategic Consulting',
        descripcion: 'Positioning, scalability and decision-making for gastronomic businesses that want to grow.',
      },
    ],
  },
}

export default function Servicios({ locale }: { locale: string }) {
  const t = content[locale as keyof typeof content] || content.es

  return (
    <section className="servicios" id="servicios">
      <div className="servicios__inner">

        <div className="servicios__header">
          <p className="servicios__eyebrow">{t.eyebrow}</p>
          <h2 className="servicios__titulo">{t.titulo}</h2>
        </div>

        <div className="servicios__grid">
          {t.servicios.map((s) => (
            <article className="servicios__item" key={s.numero}>
              <span className="servicios__numero">{s.numero}</span>
              <h3 className="servicios__item-titulo">{s.titulo}</h3>
              <p className="servicios__item-desc">{s.descripcion}</p>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
