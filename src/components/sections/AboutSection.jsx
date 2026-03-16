import { Box, Grid, Text, VStack, HStack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

const team = [
  {
    name: 'Alejandro Mora',
    role: 'Director Creativo',
    image: 'https://placehold.co/400x500/111110/888884?text=render_quienes_1',
  },
  {
    name: 'Valentina Cruz',
    role: 'Arquitecta Senior',
    image: 'https://placehold.co/400x500/1a1a18/888884?text=render_quienes_2',
  },
  {
    name: 'Mateo Ríos',
    role: 'Diseño de Interiores',
    image: 'https://placehold.co/400x500/222220/888884?text=render_quienes_3',
  },
]

const stats = [
  { value: '12+', label: 'Años de experiencia' },
  { value: '80+', label: 'Proyectos completados' },
  { value: '4', label: 'Premios nacionales' },
]

export default function AboutSection() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <Box
      id="quienes"
      className="scroll-section"
      ref={sectionRef}
      minHeight="100vh"
      bg="#0F0F0D"
      py={{ base: 20, md: 28 }}
      px={{ base: 6, md: 12, lg: 20 }}
    >
      {/* Header */}
      <VStack
        align="flex-start"
        mb={20}
        className={`fade-up ${visible ? 'visible' : ''}`}
        style={{ transitionDelay: '0.1s' }}
      >
        <Text
          fontFamily="body"
          fontSize="10px"
          letterSpacing="0.35em"
          textTransform="uppercase"
          color="whiteAlpha.500"
          mb={3}
        >
          — 03
        </Text>
        <Text
          fontFamily="heading"
          fontSize={{ base: '4xl', md: '6xl' }}
          fontWeight="300"
          fontStyle="italic"
          color="white"
          lineHeight="1"
        >
          Quiénes Somos
        </Text>
        <Box width="40px" height="1px" bg="whiteAlpha.300" mt={4} />
      </VStack>

      {/* Bloque principal: texto izquierda + imagen derecha */}
      <Grid
        templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
        gap={16}
        mb={24}
        alignItems="center"
      >
        {/* Texto */}
        <VStack
          align="flex-start"
          spacing={8}
          className={`fade-up ${visible ? 'visible' : ''}`}
          style={{ transitionDelay: '0.2s' }}
        >
          <Text
            fontFamily="heading"
            fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
            fontWeight="300"
            fontStyle="italic"
            color="white"
            lineHeight="1.3"
          >
            Arquitectura que nace del lugar, la luz y quienes la habitan.
          </Text>

          <Text
            fontFamily="body"
            fontSize="sm"
            fontWeight="300"
            lineHeight="2"
            color="whiteAlpha.700"
            maxW="480px"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Text>

          <Text
            fontFamily="body"
            fontSize="sm"
            fontWeight="300"
            lineHeight="2"
            color="whiteAlpha.700"
            maxW="480px"
          >
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde
            omnis iste natus error sit voluptatem accusantium doloremque
            laudantium.
          </Text>

          {/* Stats */}
          <HStack spacing={12} pt={4}>
            {stats.map((stat, i) => (
              <VStack key={i} align="flex-start" spacing={1}>
                <Text
                  fontFamily="heading"
                  fontSize="3xl"
                  fontWeight="300"
                  fontStyle="italic"
                  color="white"
                >
                  {stat.value}
                </Text>
                <Text
                  fontFamily="body"
                  fontSize="10px"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                  color="whiteAlpha.500"
                >
                  {stat.label}
                </Text>
              </VStack>
            ))}
          </HStack>
        </VStack>

        {/* Imagen principal */}
        <Box
          className={`fade-up ${visible ? 'visible' : ''}`}
          style={{ transitionDelay: '0.35s' }}
          position="relative"
          height={{ base: '400px', lg: '580px' }}
          overflow="hidden"
        >
          <Box
            position="absolute"
            inset="0"
            backgroundImage="url('https://placehold.co/900x1100/111110/888884?text=render_quienes_principal')"
            backgroundSize="cover"
            backgroundPosition="center"
            filter="brightness(0.8)"
          />
          {/* Línea decorativa */}
          <Box
            position="absolute"
            top="24px"
            left="24px"
            width="40px"
            height="1px"
            bg="whiteAlpha.400"
          />
        </Box>
      </Grid>

      {/* Equipo */}
      <Box
        className={`fade-up ${visible ? 'visible' : ''}`}
        style={{ transitionDelay: '0.45s' }}
      >
        <Text
          fontFamily="body"
          fontSize="10px"
          letterSpacing="0.3em"
          textTransform="uppercase"
          color="whiteAlpha.400"
          mb={10}
        >
          Nuestro equipo
        </Text>

        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
          gap={6}
        >
          {team.map((member, index) => (
            <Box
              key={index}
              className={`fade-up ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${0.5 + index * 0.12}s` }}
            >
              {/* Foto */}
              <Box
                height="320px"
                overflow="hidden"
                position="relative"
                mb={4}
              >
                <Box
                  position="absolute"
                  inset="0"
                  backgroundImage={`url('${member.image}')`}
                  backgroundSize="cover"
                  backgroundPosition="center"
                  filter="brightness(0.75) grayscale(20%)"
                  transition="transform 0.7s ease, filter 0.7s ease"
                  _groupHover={{ transform: 'scale(1.04)', filter: 'brightness(0.85)' }}
                />
              </Box>

              {/* Info */}
              <VStack align="flex-start" spacing={1}>
                <Text
                  fontFamily="heading"
                  fontSize="lg"
                  fontWeight="300"
                  fontStyle="italic"
                  color="white"
                >
                  {member.name}
                </Text>
                <Text
                  fontFamily="body"
                  fontSize="10px"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                  color="whiteAlpha.500"
                >
                  {member.role}
                </Text>
              </VStack>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}