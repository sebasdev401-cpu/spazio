import { Box, Grid, Text, VStack, HStack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

const team = [
  {
    name: 'Mónica García, Arq. MSc',
    role: 'Arquitecta',
    description: [
      'Arquitecta ecuatoriana con formación y experiencia internacionales en Europa. Máster en Arquitectura para la Sustentabilidad del Politecnico de Torino, graduada con Summa cum laude (110/100).',
      'Su trabajo se centra en proyectos residenciales e interiores, combinando estética, funcionalidad y sostenibilidad, desarrollando proyectos de forma remota para clientes de distintos países.',
    ],
    image: 'images/renders/Foto_monica.jpg',
  },
  {
    name: 'Francisco Serrano, Arq. M.Arch / M.I.D.',
    role: 'Arquitecto',
    description: [
      'Arquitecto ecuatoriano, máster en Diseño de Interiores y Mobiliario por la Escuela de Diseño de Florencia. Su enfoque se basa en espacios funcionales, coherentes y atemporales.',
      'Cuenta con experiencia en proyectos residenciales e interiores, con especial atención al diseño a medida, materiales, iluminación y confort, trabajando a nivel internacional.',
    ],
    image: 'images/renders/Foto_francisco.jpg',
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

      {/* Bloque principal */}
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
            Diseño con esencia italiana, creado para el mundo.
          </Text>

          <Text
            fontFamily="body"
            fontSize="sm"
            fontWeight="300"
            lineHeight="2"
            color="whiteAlpha.700"
            maxW="480px"
          >
            Somos un estudio remoto de arquitectura e interiorismo que trabaja a nivel internacional.
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
            backgroundImage="url('images/renders/Florence%20proposal%20photoshoot-71.jpg')"
            backgroundSize="cover"
            backgroundPosition="center"
            filter="brightness(0.8)"
          />
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
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
          gap={{ base: 16, md: 12 }}
        >
          {team.map((member, index) => (
            <Box
              key={index}
              className={`fade-up ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${0.5 + index * 0.15}s` }}
            >
              {/* Foto */}
              <Box
                height={{ base: '340px', md: '420px' }}
                overflow="hidden"
                position="relative"
                mb={6}
              >
                <Box
                  position="absolute"
                  inset="0"
                  backgroundImage={`url('${member.image}')`}
                  backgroundSize="cover"
                  backgroundPosition="center"
                  filter="brightness(0.75) grayscale(20%)"
                />
              </Box>

              {/* Info */}
              <VStack align="flex-start" spacing={3}>
                <Text
                  fontFamily="heading"
                  fontSize={{ base: 'xl', md: '2xl' }}
                  fontWeight="300"
                  fontStyle="italic"
                  color="white"
                  lineHeight="1.2"
                >
                  {member.name}
                </Text>
                <Text
                  fontFamily="body"
                  fontSize="9px"
                  letterSpacing="0.25em"
                  textTransform="uppercase"
                  color="whiteAlpha.500"
                >
                  {member.role}
                </Text>
                <Box width="30px" height="1px" bg="whiteAlpha.200" my={1} />

                {/* Descripción en párrafos separados */}
                <VStack align="flex-start" spacing={3}>
                  {member.description.map((paragraph, i) => (
                    <Text
                      key={i}
                      fontFamily="body"
                      fontSize="xs"
                      fontWeight="300"
                      lineHeight="1.85"
                      color="whiteAlpha.550"
                    >
                      {paragraph}
                    </Text>
                  ))}
                </VStack>
              </VStack>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}