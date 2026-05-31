import Hero from '../components/Hero'
import About from '../components/About'
import Servicios from '../components/Servicios'
import Skills from '../components/Skills'
import Proceso from '../components/Proceso'
import Testimonios from '../components/Testimonios'
import Contacto from '../components/Contacto'
import Proyectos from '../components/Proyectos' 

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <main>
      <Hero locale={locale} />
      <About locale={locale} />
      <Servicios locale={locale} />
      <Proyectos locale={locale} />
      <Skills locale={locale} />
      <Proceso locale={locale} />
      <Testimonios locale={locale} />
      <Contacto locale={locale} />
    </main>
  )
}