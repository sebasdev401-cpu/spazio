import { Box, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import WorldMap from '../hero/WorldMap'
import CountryMap from '../hero/CountryMap'
import ScrollIndicator from '../ui/ScrollIndicator'

export default function HeroSection({ onOpenProject }) {
  const textRef = useRef(null)
  const [mapVisible, setMapVisible] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [displayedCountry, setDisplayedCountry] = useState(null)
  const [mapOpacity, setMapOpacity] = useState(1)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (textRef.current) textRef.current.classList.add('visible')
      setMapVisible(true)
    }, 300)
    return () => clearTimeout(timeout)
  }, [])

  const handleSelectCountry = (code) => {
    setMapOpacity(0)
    setTimeout(() => {
      setSelectedCountry(code)
      setDisplayedCountry(code)
      setTimeout(() => setMapOpacity(1), 50)
    }, 600)
  }

  const handleBack = () => {
    setMapOpacity(0)
    setTimeout(() => {
      setSelectedCountry(null)
      setDisplayedCountry(null)
      setTimeout(() => setMapOpacity(1), 50)
    }, 600)
  }

  const handleSelectProject = (projectId) => {
    if (onOpenProject) onOpenProject(projectId)
  }

  const handleScrollDown = () => {
    const next = document.querySelector('#arquitectonicos')
    if (!next) return
    const container = document.querySelector('.scroll-container')
    if (container && container.scrollHeight > container.clientHeight) {
      container.scrollTo({ top: next.offsetTop, behavior: 'smooth' })
    } else {
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
      {/* Mapa */}
      <Box
        position="absolute"
        inset="0"
        zIndex={0}
        opacity={mapVisible ? mapOpacity : 0}
        transition="opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
      >
        {displayedCountry ? (
          <CountryMap
            countryCode={displayedCountry}
            onSelectProject={handleSelectProject}
            onBack={handleBack}
          />
        ) : (
          <WorldMap onSelectCountry={handleSelectCountry} />
        )}
      </Box>

      {/* Overlay */}
      <Box
        position="absolute"
        inset="0"
        zIndex={1}
        pointerEvents="none"
        background="radial-gradient(ellipse at center, rgba(30,30,28,0.1) 0%, rgba(10,10,10,0.5) 100%)"
      />

      {/* Zona inferior */}
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
          background="linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 100%)"
          pt="60px"
          pointerEvents="none"
        >
          {/* Texto */}
          <Box
            pointerEvents="auto"
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
              Arquitectura, Interiorismo y Construcción alrededor del mundo.
            </Text>
          </Box>

          {/* Logo */}
          <Box
            as="img"
            src="/images/renders/SPAZIO.svg"
            alt="Spazio"
            height={{ base: '42px', md: '54px' }}
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