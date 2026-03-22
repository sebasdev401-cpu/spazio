import { Box, Grid, Text, VStack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import ProformaForm from '../forms/ProformaForm'

export default function ProformaSection() {
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
      id="proforma"
      className="scroll-section"
      ref={sectionRef}
      minHeight="100vh"
      bg="#0A0A0A"
      py={{ base: 20, md: 28 }}
      px={{ base: 6, md: 12, lg: 20 }}
    >
      <Grid
        templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
        gap={20}
        alignItems="flex-start"
      >
        {/* Columna izquierda — texto */}
        <VStack
          align="flex-start"
          spacing={8}
          position={{ lg: 'sticky' }}
          top={{ lg: '120px' }}
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
            — 06
          </Text>

          <Text
            fontFamily="heading"
            fontSize={{ base: '4xl', md: '6xl' }}
            fontWeight="300"
            
            color="white"
            lineHeight="1"
          >
            Proforma
          </Text>

          <Box width="40px" height="1px" bg="whiteAlpha.300" />

          <Text
            fontFamily="heading"
            fontSize={{ base: 'xl', md: '2xl' }}
            fontWeight="300"
            
            color="white"
            lineHeight="1.4"
            maxW="380px"
          >
            Cuéntanos tu visión. Nosotros le damos forma.
          </Text>

          <Text
            fontFamily="body"
            fontSize="sm"
            fontWeight="300"
            lineHeight="2"
            color="whiteAlpha.600"
            maxW="380px"
          >
            Completa el formulario y nuestro equipo preparará una propuesta
            inicial personalizada para tu proyecto. Sin compromisos.
          </Text>

          {/* Imagen decorativa */}
          <Box
            width="100%"
            maxWidth={{ base: '100%', md: '650px' }}
            overflow="hidden"
            position="relative"
            mt={4}
          >
            <Box
              as="img"
              src="/images/renders/27_KITCHEN PLANS.pdf.jpg"
              alt="Kitchen Plans"
              width="100%"
              height="auto"
              display="block"
              style={{ filter: 'brightness(0.6)' }}
            />
          </Box>
        </VStack>

        {/* Columna derecha — formulario */}
        <Box
          className={`fade-up ${visible ? 'visible' : ''}`}
          style={{ transitionDelay: '0.25s' }}
          pt={{ base: 0, lg: 12 }}
        >
          <ProformaForm />
        </Box>
      </Grid>
    </Box>
  )
}