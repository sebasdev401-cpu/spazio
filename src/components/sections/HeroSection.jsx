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
  const [worldOpacity, setWorldOpacity] = useState(1)
  const [countryOpacity, setCountryOpacity] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (textRef.current) textRef.current.classList.add('visible')
      setMapVisible(true)
    }, 300)
    return () => clearTimeout(timeout)
  }, [])

  const handleSelectCountry = (code) => {
    setSelectedCountry(code)
    setDisplayedCountry(code)
    // Fade out WorldMap y fade in CountryMap simultáneamente
    setWorldOpacity(0)
    setCountryOpacity(1)
  }

  const [worldKey, setWorldKey] = useState(0)

  const handleBack = () => {
    setWorldOpacity(1)
    setCountryOpacity(0)
    setWorldKey((prev) => prev + 1) // ← fuerza redibujado
    setTimeout(() => {
      setSelectedCountry(null)
      setDisplayedCountry(null)
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
      id="mapa"
      className="scroll-section"
      position="relative"
      width="100%"
      height="100svh"
      overflow="hidden"
      bg="#0A0A0A"
      display="flex"
      flexDirection="column"
    >
      {/* WorldMap — capa fija */}
      <Box
        position="absolute"
        top="64px"
        left="0"
        right="0"
        bottom="0"
        zIndex={0}
        opacity={mapVisible ? worldOpacity : 0}
        transition="opacity 0.6s ease"
        pointerEvents={selectedCountry ? 'none' : 'auto'}
      >
        <WorldMap key={worldKey} onSelectCountry={handleSelectCountry} />
      </Box>

      {/* CountryMap — capa encima */}
      {displayedCountry && (
        <Box
          position="absolute"
          top="64px"
          left="0"
          right="0"
          bottom="0"
          zIndex={1}
          opacity={countryOpacity}
          transition="opacity 0.6s ease"
          pointerEvents={selectedCountry ? 'auto' : 'none'}
        >
          <CountryMap
            countryCode={displayedCountry}
            onSelectProject={handleSelectProject}
            onBack={handleBack}
          />
        </Box>
      )}

      {/* Overlay */}
      <Box
        position="absolute"
        inset="0"
        zIndex={2}
        pointerEvents="none"
        background="radial-gradient(ellipse at center, rgba(30,30,28,0.1) 0%, rgba(10,10,10,0.5) 100%)"
      />

      {/* Título sección */}
      {!selectedCountry && (
        <Box
          position="absolute"
          top={{ base: '24px', md: '40px' }}
          left={{ base: 6, md: 16, lg: 24 }}
          zIndex={3}
          pointerEvents="none"
        >
          <Text
            fontFamily="body"
            fontSize="9px"
            letterSpacing="0.35em"
            textTransform="uppercase"
            color="whiteAlpha.400"
            mb={2}
          >
            — Presencia global
          </Text>
          <Text
            fontFamily="heading"
            fontSize={{ base: '2xl', md: '4xl' }}
            fontWeight="300"
            fontStyle="italic"
            color="white"
            lineHeight="1.1"
          >
            Nuestros Proyectos<br />en el Mundo
          </Text>
        </Box>
      )}

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

          <Box
            as="img"
            src="/images/renders/SPAZIO_logo.svg"
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