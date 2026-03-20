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
    const hash = window.location.hash
    if (!hash) return
    const timeout = setTimeout(() => {
      const target = document.querySelector(hash)
      if (!target) return
      const container = document.querySelector('.scroll-container')
      if (container && container.scrollHeight > container.clientHeight) {
        container.scrollTo({ top: target.offsetTop, behavior: 'smooth' })
      } else {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }, 800)
    return () => clearTimeout(timeout)
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