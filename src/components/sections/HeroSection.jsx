import { Box, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import WorldMap from '../hero/WorldMap'
import CountryMap from '../hero/CountryMap'
import ScrollIndicator from '../ui/ScrollIndicator'

export default function HeroSection({ onOpenProject }) {
  const textRef = useRef(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [mapVisible, setMapVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (textRef.current) textRef.current.classList.add('visible')
      setMapVisible(true)
    }, 300)
    return () => clearTimeout(timeout)
  }, [])

  const handleSelectCountry = (code) => setSelectedCountry(code)
  const handleBack = () => setSelectedCountry(null)
  const handleSelectProject = (projectId) => {
    if (onOpenProject) onOpenProject(projectId)
  }

  const handleScrollDown = () => {
    const next = document.querySelector('#arquitectonicos')
    if (!next) return
    
    // Intenta con scroll-container primero
    const container = document.querySelector('.scroll-container')
    if (container && container.scrollHeight > container.clientHeight) {
      container.scrollTo({ top: next.offsetTop, behavior: 'smooth' })
    } else {
      // Mobile — scroll en window
      const rect = next.getBoundingClientRect()
      const absoluteTop = window.scrollY + rect.top
      window.scrollTo({ top: absoluteTop, behavior: 'smooth' })
    }
  }

  return (
    <Box
      id="inicio"
      className="scroll-section"
      position="relative"
      width="100%"
      height="100svh"
      overflow="hidden"
      bg="#0A0A0A"
      display="flex"
      flexDirection="column"
    >
      {/* Mapa — capa base */}
      <Box
        position="absolute"
        inset="0"
        zIndex={0}
        opacity={mapVisible ? 1 : 0}
        transition="opacity 1.2s ease"
      >
        {selectedCountry ? (
          <CountryMap
            countryCode={selectedCountry}
            onSelectProject={handleSelectProject}
            onBack={handleBack}
          />
        ) : (
          <WorldMap onSelectCountry={handleSelectCountry} />
        )}
      </Box>

      {/* Overlay — sin bloquear toques */}
      <Box
        position="absolute"
        inset="0"
        zIndex={1}
        pointerEvents="none"
        background="radial-gradient(ellipse at center, rgba(30,30,28,0.1) 0%, rgba(10,10,10,0.5) 100%)"
      />

      {/* Zona inferior — logo + botón + texto separados */}
      {!selectedCountry && (
        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          zIndex={10}
          display="flex"
          flexDirection="column"
          alignItems="center"
          pb={{ base: '24px', md: '40px' }}
          gap={0}
          // Fondo degradado para legibilidad
          background="linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 100%)"
          pt="60px"
          pointerEvents="none"
        >
          {/* Texto arriba */}
          <Text
            fontFamily="body"
            fontSize={{ base: '8px', md: '9px' }}
            letterSpacing="0.3em"
            textTransform="uppercase"
            color="whiteAlpha.400"
            mb={4}
            ref={textRef}
            className="fade-up"
          >
            Proyectos alrededor del mundo
          </Text>

          {/* Logo */}
          <Box
            as="img"
            src="/images/renders/SPAZIO.svg"
            alt="Spazio"
            height={{ base: '28px', md: '36px' }}
            width="auto"
            style={{ filter: 'brightness(0) invert(1)' }}
            opacity={0.8}
            mb={5}
            pointerEvents="auto"
            cursor="pointer"
            onClick={handleScrollDown}
          />

          {/* Ver proyectos */}
          <Box
            pointerEvents="auto"
            onClick={handleScrollDown}
            cursor="pointer"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            opacity={0.5}
            _hover={{ opacity: 1 }}
            transition="opacity 0.3s ease"
            padding="12px"
          >
            <Text
              fontFamily="body"
              fontSize={{ base: '8px', md: '9px' }}
              letterSpacing="0.35em"
              textTransform="uppercase"
              color="white"
            >
              Ver proyectos
            </Text>
            <ScrollIndicator />
          </Box>
        </Box>
      )}
    </Box>
  )
}