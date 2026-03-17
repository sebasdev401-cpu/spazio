import { Box, Grid, Text, VStack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

const contactInfo = [
  { label: 'Email', value: 'hola@spazio.com', href: 'mailto:hola@spazio.com' },
  { label: 'Teléfono', value: '+593 99 000 0000', href: 'tel:+593990000000' },
  { label: 'Ubicación', value: 'Cuenca, Ecuador', href: null },
]

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/spazio.arch.ec?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
  { label: 'Behance', href: '#' },
  { label: 'LinkedIn', href: '#' },
]

export default function ContactSection() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <Box
      id="contacto"
      className="scroll-section"
      ref={sectionRef}
      minHeight="100svh"
      position="relative"
      overflow="hidden"
    >
      {/* Imagen fondo */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        backgroundImage="url('/images/renders/IMG_5750.JPG')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        filter="brightness(0.35)"
      />

      {/* Overlay */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        background="linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 60%, rgba(10,10,10,0.2) 100%)"
      />

      {/* Contenido */}
      <Box
        position="relative"
        zIndex={1}
        minHeight="100svh"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        px={{ base: 6, md: 12, lg: 20 }}
        pt={{ base: 24, md: 20 }}
        pb={{ base: 16, md: 20 }}
      >
        <Grid
          templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
          gap={{ base: 12, lg: 16 }}
          alignItems="flex-end"
        >
          {/* Izquierda */}
          <VStack
            align="flex-start"
            spacing={{ base: 6, md: 8 }}
            className={`fade-up ${visible ? 'visible' : ''}`}
            style={{ transitionDelay: '0.1s' }}
          >
            <Text
              fontFamily="body"
              fontSize="10px"
              letterSpacing="0.35em"
              textTransform="uppercase"
              color="whiteAlpha.500"
            >
              — 05
            </Text>

            <Text
              fontFamily="heading"
              fontSize={{ base: '5xl', md: '7xl', lg: '8xl' }}
              fontWeight="300"
              fontStyle="italic"
              color="white"
              lineHeight="0.9"
            >
              Hablemos.
            </Text>

            <Text
              fontFamily="body"
              fontSize={{ base: 'xs', md: 'sm' }}
              fontWeight="300"
              lineHeight="2"
              color="whiteAlpha.600"
              maxW="400px"
            >
              Cada gran proyecto comienza con una conversación.
              Estamos listos para escucharte.
            </Text>

            <Box width="40px" height="1px" bg="whiteAlpha.300" />

            <VStack align="flex-start" spacing={5}>
              {contactInfo.map((item, i) => (
                <Box
                  key={i}
                  className={`fade-up ${visible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
                >
                  <Text
                    fontFamily="body"
                    fontSize="9px"
                    letterSpacing="0.3em"
                    textTransform="uppercase"
                    color="whiteAlpha.400"
                    mb={1}
                  >
                    {item.label}
                  </Text>
                  {item.href ? (
                    <Text
                      as="a"
                      href={item.href}
                      fontFamily="body"
                      fontSize={{ base: 'xs', md: 'sm' }}
                      fontWeight="300"
                      color="white"
                      letterSpacing="0.05em"
                      opacity={0.85}
                      _hover={{ opacity: 1 }}
                      transition="opacity 0.3s ease"
                      textDecoration="none"
                      display="block"
                    >
                      {item.value}
                    </Text>
                  ) : (
                    <Text
                      fontFamily="body"
                      fontSize={{ base: 'xs', md: 'sm' }}
                      fontWeight="300"
                      color="white"
                      letterSpacing="0.05em"
                      opacity={0.85}
                    >
                      {item.value}
                    </Text>
                  )}
                </Box>
              ))}
            </VStack>
          </VStack>

          {/* Derecha — redes */}
          <VStack
            align={{ base: 'flex-start', lg: 'flex-end' }}
            spacing={4}
            className={`fade-up ${visible ? 'visible' : ''}`}
            style={{ transitionDelay: '0.4s' }}
          >
            <Text
              fontFamily="body"
              fontSize="9px"
              letterSpacing="0.3em"
              textTransform="uppercase"
              color="whiteAlpha.400"
              mb={2}
            >
              Síguenos
            </Text>
            {socials.map((social, i) => (
              <Text
                key={i}
                as="a"
                href={social.href}
                fontFamily="heading"
                fontSize={{ base: '2xl', md: '3xl' }}
                fontWeight="300"
                fontStyle="italic"
                target="_blank"
                color="white"
                opacity={0.6}
                textDecoration="none"
                _hover={{ opacity: 1 }}
                transition="opacity 0.4s ease"
                display="block"
              >
                {social.label}
              </Text>
            ))}
          </VStack>
        </Grid>
      </Box>
    </Box>
  )
}