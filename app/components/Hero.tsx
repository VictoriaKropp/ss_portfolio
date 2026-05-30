import '../styles/Hero.css'

export default function Hero({ locale }: { locale: string }) {
    const content = {
        es: {
            titulo: 'Víctor Sebastián Scatturice',
            subtitulo: 'Estratega Gastronómico & Chef Ejecutivo',
            descripcion: 'Más de 20 años transformando cocinas en negocios rentables. Diseño, auditoría y optimización de operaciones gastronómicas.',
            cta: 'Conocé mi trabajo',
            cta2: 'Contactame',
        },
        en: {
            titulo: 'Víctor Sebastián Scatturice',
            subtitulo: 'Gastronomic Strategist & Executive Chef',
            descripcion: 'Over 20 years turning kitchens into profitable businesses. Design, audit and optimization of gastronomic operations.',
            cta: 'See my work',
            cta2: 'Contact me',
        }
    }

    const t = content[locale as keyof typeof content] || content.es

    return (
        <section className="hero" id="hero">
            <div className="hero__content">
                <p className="hero__eyebrow">Buenos Aires, Argentina</p>
                <h1 className="hero__titulo">{t.titulo}</h1>
                <p className="hero__subtitulo">{t.subtitulo}</p>
                <p className="hero__descripcion">{t.descripcion}</p>
            </div>
            <div className="hero__decoration">
                <div className="hero__line" />
            </div>
        </section>
    )
}