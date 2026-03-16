import { Box, Text, VStack } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import ScrollIndicator from '../ui/ScrollIndicator'

export default function HeroSection() {
  const textRef = useRef(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (textRef.current) {
        textRef.current.classList.add('visible')
      }
    }, 200)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <Box
      id="inicio"
      className="scroll-section"
      position="relative"
      width="100%"
      height="100svh"
      overflow="hidden"
      bg="brand.black"
    >
      {/* Imagen */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        backgroundImage="url('https://placehold.co/1920x1080/111110/888884?text=render_inicio_1')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        filter="brightness(0.55)"
      />

      {/* Overlay */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        background="linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.1) 50%, rgba(10,10,10,0.7) 100%)"
      />

      {/* Contenido */}
      <VStack
        position="relative"
        zIndex={1}
        height="100%"
        justify="flex-end"
        align="flex-start"
        px={{ base: 6, md: 16, lg: 24 }}
        pb={{ base: '80px', md: '120px' }}
        spacing={4}
      >
        <Box className="fade-up" ref={textRef}>
          <Text
            fontFamily="heading"
            fontSize={{ base: '6xl', md: '7xl', lg: '9xl' }}
            fontWeight="300"
            lineHeight="0.9"
            letterSpacing="-0.02em"
            color="white"
          >
            SPAZIO
          </Text>
        </Box>

        <Box
          className="fade-up"
          maxW={{ base: '100%', md: '480px' }}
          style={{ transitionDelay: '0.3s' }}
        >
          <Text
            fontFamily="body"
            fontSize={{ base: 'xs', md: 'sm' }}
            fontWeight="300"
            lineHeight="1.8"
            letterSpacing="0.05em"
            color="white"
            opacity={0.75}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </Box>
      </VStack>

      <ScrollIndicator />
    </Box>
  )
}