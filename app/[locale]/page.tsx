import Hero from '../components/Hero'
import About from '../components/About'
import Servicios from '../components/Servicios'
import Skills from '../components/Skills'

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
      <Skills locale={locale} />
    </main>
  )
}