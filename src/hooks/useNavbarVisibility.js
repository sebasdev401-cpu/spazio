import { useState, useEffect } from 'react'

export function useNavbarVisibility() {
  const [activeSection, setActiveSection] = useState('inicio')

  useEffect(() => {
    const sections = document.querySelectorAll('.scroll-section')
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return { activeSection }
}