import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/sections/HeroSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import AboutSection from '../components/sections/AboutSection'
import ProformaSection from '../components/sections/ProformaSection'
import ContactSection from '../components/sections/ContactSection'

export default function Landing() {
  return (
    <div className="scroll-container">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ProformaSection />
      <ContactSection />
      <Footer />
    </div>
  )
}