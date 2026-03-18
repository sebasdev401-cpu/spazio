import { useEffect } from 'react'

export function useSectionTransition() {
  useEffect(() => {
    const sections = document.querySelectorAll('.scroll-section')

    if (sections[0]) {
      sections[0].classList.add('section-visible')
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('section-exit')
            entry.target.classList.add('section-visible')
          } else {
            const rect = entry.target.getBoundingClientRect()
            if (rect.top < 0) {
              entry.target.classList.add('section-exit')
            } else {
              entry.target.classList.remove('section-visible')
              entry.target.classList.remove('section-exit')
            }
          }
        })
      },
      {
        // 0.25 = la transición completa cuando el 25% de la sección es visible
        // Sube a 0.4 si quieres que espere más antes de completar
        threshold: 0.25,
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])
}