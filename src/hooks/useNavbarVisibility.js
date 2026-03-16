import { useState, useEffect } from 'react'

export function useNavbarVisibility() {
  const isTouchDevice = window.matchMedia('(hover: none)').matches
  const [visible, setVisible] = useState(isTouchDevice ? false : false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (isTouchDevice) return

    const handleMouseMove = (e) => {
      setVisible(e.clientY < 90)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isTouchDevice])

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev)
    setVisible((prev) => !prev)
  }

  return { visible, menuOpen, toggleMenu, isTouchDevice }
}