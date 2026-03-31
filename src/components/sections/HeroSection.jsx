import { Box, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import WorldMap from '../hero/WorldMap'
import ScrollIndicator from '../ui/ScrollIndicator'

export default function HeroSection({ onOpenProject }) {
  const textRef = useRef(null)
  const [activeCountry, setActiveCountry] = useState(null)
  const isMobile = window.innerWidth < 768

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (textRef.current) textRef.current.classList.add('visible')
    }, 300)
    return () => clearTimeout(timeout)
  }, [])

  const handleScrollDown = () => {
    const next = document.querySelector('#arquitectonicos')
    if (!next) return
    const container = document.querySelector('.scroll-container')
    if (container && container.scrollHeight > container.clientHeight) {
      container.scrollTo({ top: next.offsetTop, behavior: 'smooth' })
    } else {
      const rect = next.getBoundingClientRect()
      window.scrollTo({ top: window.scrollY + rect.top, behavior: 'smooth' })
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
    >
      {/* Mapa — con scroll horizontal en mobile */}
      <Box
        position="absolute"
        top="64px"
        left="0"
        right="0"
        bottom="0"
        zIndex={0}
        overflowX={activeCountry ? 'hidden' : { base: 'auto', md: 'hidden' }}
        overflowY="hidden"
      >
        <Box
          width={activeCountry ? '100%' : { base: '900px', md: '100%' }}
          height="100%"
          transition="width 0s"
        >
          <WorldMap
            onSelectProject={onOpenProject}
            onCountryChange={setActiveCountry}
          />
        </Box>
      </Box>

      {/* Overlay visual */}
      <Box
        position="absolute"
        inset="0"
        zIndex={1}
        pointerEvents="none"
        background="radial-gradient(ellipse at center, rgba(30,30,28,0.1) 0%, rgba(10,10,10,0.4) 100%)"
      />

      {/* Título — oculto cuando hay país activo */}
      {!activeCountry && (
        <Box
          ref={textRef}
          position="absolute"
          top={{ base: '24px', md: '40px' }}
          left={{ base: 6, md: 16, lg: 24 }}
          zIndex={3}
          className="fade-up"
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
            color="white"
            lineHeight="1.1"
          >
            Nuestros Proyectos<br />en el Mundo
          </Text>
        </Box>
      )}

      {/* Zona inferior — oculta cuando hay país activo */}
      {!activeCountry && (
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