import { useState, useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import PhotoRoulette from '../components/sections/PhotoRoulette'
import HeroSection from '../components/sections/HeroSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import AboutSection from '../components/sections/AboutSection'
import ProformaSection from '../components/sections/ProformaSection'
import ContactSection from '../components/sections/ContactSection'
import ProjectViewer from '../components/projects/ProjectViewer'
import { allProjects } from '../data/all-projects'
import { useSectionTransition } from '../hooks/useSectionTransition'

export default function Landing() {
  const [selectedProject, setSelectedProject] = useState(null)
  useSectionTransition()

  useEffect(() => {
    // Detecta hash (#proforma) O parámetro (?section=proforma)
    const hash = window.location.hash
    const params = new URLSearchParams(window.location.search)
    const section = params.get('section')
    const targetId = hash ? hash : section ? `#${section}` : null

    if (!targetId) return

    const scrollTo = () => {
      const target = document.querySelector(targetId)
      if (!target) return
      const container = document.querySelector('.scroll-container')
      if (container && container.scrollHeight > container.clientHeight) {
        container.scrollTo({ top: target.offsetTop, behavior: 'smooth' })
      } else {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }

    // Dos intentos — el segundo cubre webviews lentos como Instagram
    const timeout1 = setTimeout(scrollTo, 800)
    const timeout2 = setTimeout(scrollTo, 1500)

    return () => {
      clearTimeout(timeout1)
      clearTimeout(timeout2)
    }
  }, [])

  const handleOpenProject = (projectId) => {
    const project = allProjects.find((p) => p.id === projectId)
    if (project) setSelectedProject(project)
  }

  return (
    <div className="scroll-container">
      <Navbar />
      <PhotoRoulette />
      <HeroSection onOpenProject={handleOpenProject} />
      <ProjectsSection />
      <AboutSection />
      <ProformaSection />
      <ContactSection />
      <Footer />
      {selectedProject && (
        <ProjectViewer
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}