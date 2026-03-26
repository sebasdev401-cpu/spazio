import { Box, Flex, VStack, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useNavbarVisibility } from '../../hooks/useNavbarVisibility'

const links = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Proyectos en el Mundo', href: '#mapa' },
  { label: 'Arquitectónicos', href: '#arquitectonicos' },
  { label: 'Interiores', href: '#interiores' },
  //{ label: 'Inmobiliarios', href: '#inmobiliarios' },
  { label: 'Quiénes Somos', href: '#quienes' },
  { label: 'Proforma', href: '#proforma' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const { activeSection } = useNavbarVisibility()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleMenu = () => setMenuOpen((prev) => !prev)

  const handleClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      if (isMobile) {
        target.scrollIntoView({ behavior: 'smooth' })
      } else {
        const container = document.querySelector('.scroll-container')
        if (container) {
          container.scrollTo({ top: target.offsetTop, behavior: 'smooth' })
        }
      }
    }
    if (isMobile) toggleMenu()
  }

  const activeLink = links.find(l => l.href.replace('#', '') === activeSection)
  const activeLinkIndex = links.findIndex(l => l.href.replace('#', '') === activeSection)

  // ── MOBILE — renderizado via portal directamente en document.body
  const mobileNavbar = (
    <>
      {/* Barra superior */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99999,
        background: 'rgba(10,10,10,0.95)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        maxWidth: '100vw',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 20px',
          width: '100%',
        }}>
          {/* Logo */}
          <img
            src="/images/renders/SPAZIO_texto.svg"
            alt="Spazio"
            style={{
              height: '18px',
              width: 'auto',
              filter: 'brightness(0) invert(1)',
              opacity: 0.9,
              flexShrink: 0,
            }}
            onClick={(e) => handleClick(e, '#inicio')}
          />

          {/* Derecha */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexShrink: 0,
            maxWidth: '60%',
          }}>
            {/* Sección activa */}
            {activeLink && !menuOpen && (
              <span style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '7px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '80px',
              }}>
                {activeLink.label}
              </span>
            )}

            {/* Hamburguesa */}
            <div
              onClick={toggleMenu}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '5px',
                width: '44px',
                height: '44px',
                flexShrink: 0,
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: '20px',
                height: '1px',
                background: 'white',
                transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(45deg) translateY(3px)' : 'none',
                transformOrigin: 'center',
              }} />
              <div style={{
                width: '20px',
                height: '1px',
                background: 'white',
                transition: 'all 0.3s ease',
                opacity: menuOpen ? 0 : 1,
              }} />
              <div style={{
                width: '20px',
                height: '1px',
                background: 'white',
                transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(-45deg) translateY(-3px)' : 'none',
                transformOrigin: 'center',
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Menú fullscreen */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99998,
        background: 'rgba(10,10,10,0.98)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '0 32px',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'all' : 'none',
        transition: 'opacity 0.4s ease',
      }}>
        <img
          src="/images/renders/SPAZIO_texto.svg"
          alt="Spazio"
          style={{
            height: '18px',
            width: 'auto',
            marginBottom: '48px',
            opacity: 0.4,
            filter: 'brightness(0) invert(1)',
          }}
        />

        <div style={{ width: '100%' }}>
          {links.map((link, i) => {
            const sectionId = link.href.replace('#', '')
            const isActive = activeSection === sectionId

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  width: '100%',
                  padding: '12px 0',
                  textDecoration: 'none',
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.4s ease ${i * 0.06}s`,
                  borderBottom: `1px solid ${isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)'}`,
                }}
              >
                {/* Indicador */}
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: isActive ? 'white' : 'transparent',
                  border: `1px solid ${isActive ? 'white' : 'rgba(255,255,255,0.3)'}`,
                  flexShrink: 0,
                  transition: 'all 0.3s ease',
                }} />

                <span style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '11px',
                  fontWeight: 300,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: isActive ? 'white' : 'rgba(255,255,255,0.6)',
                  transition: 'color 0.3s ease',
                  flex: 1,
                }}>
                  {link.label}
                </span>

                {isActive && (
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px' }}>→</span>
                )}
              </a>
            )
          })}
        </div>

        <span style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '9px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
          marginTop: '40px',
        }}>
          {String(activeLinkIndex + 1).padStart(2, '0')} / {String(links.length).padStart(2, '0')}
        </span>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile — portal directo en body, evita el overflow del scroll-container */}
      {isMobile && mounted && createPortal(mobileNavbar, document.body)}

      {/* Desktop — igual que antes */}
      {!isMobile && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          zIndex={1000}
          px={12}
          py={5}
          background="linear-gradient(to bottom, rgba(10,10,10,0.9) 0%, transparent 100%)"
          backdropFilter="blur(4px)"
        >
          <Flex justify="space-between" align="center">
            <Box
              as="img"
              src="/images/renders/SPAZIO_texto.svg"
              alt="Spazio"
              height="24px"
              width="auto"
              style={{ filter: 'brightness(0) invert(1)' }}
              cursor="pointer"
              onClick={(e) => handleClick(e, '#inicio')}
              opacity={0.9}
            />

            <Flex gap={8} align="center">
              {links.map((link) => {
                const sectionId = link.href.replace('#', '')
                const isActive = activeSection === sectionId

                return (
                  <Box
                    key={link.label}
                    as="a"
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    position="relative"
                    fontFamily="body"
                    fontSize="10px"
                    fontWeight="400"
                    letterSpacing="0.2em"
                    textTransform="uppercase"
                    color="white"
                    opacity={isActive ? 1 : 0.45}
                    cursor="none"
                    textDecoration="none"
                    _hover={{ opacity: 1 }}
                    transition="opacity 0.3s ease"
                    pb="4px"
                  >
                    {link.label}
                    <Box
                      position="absolute"
                      bottom="0"
                      left="0"
                      right="0"
                      height="1px"
                      bg="white"
                      opacity={isActive ? 1 : 0}
                      transform={isActive ? 'scaleX(1)' : 'scaleX(0)'}
                      transformOrigin="left"
                      transition="all 0.4s ease"
                    />
                  </Box>
                )
              })}
            </Flex>
          </Flex>
        </Box>
      )}
    </>
  )
}