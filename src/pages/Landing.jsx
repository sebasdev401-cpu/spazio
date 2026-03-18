import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
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

  const handleOpenProject = (projectId) => {
    const project = allProjects.find((p) => p.id === projectId)
    if (project) setSelectedProject(project)
  }

  return (
    <div className="scroll-container">
      <Navbar />
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