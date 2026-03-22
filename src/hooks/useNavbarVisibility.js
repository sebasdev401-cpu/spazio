import { useState, useEffect } from 'react'

export function useNavbarVisibility() {
  const [activeSection, setActiveSection] = useState('inicio')

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const sections = document.querySelectorAll('.scroll-section')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        threshold: isMobile ? 0.1 : 0.3,
        rootMargin: isMobile ? '0px' : '-10% 0px -10% 0px',
        root: isMobile ? null : document.querySelector('.scroll-container'),
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return { activeSection }
}