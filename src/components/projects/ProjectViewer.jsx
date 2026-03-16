import { Box, Grid, Text, VStack, HStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export default function ProjectViewer({ project, onClose }) {
  const [visible, setVisible] = useState(false)

  // Entrada animada
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 20)
    return () => clearTimeout(t)
  }, [])

  // Cerrar con Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // Bloquear scroll del body
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 500)
  }

  return (
    <Box
      position="fixed"
      inset="0"
      zIndex={2000}
      opacity={visible ? 1 : 0}
      transition="opacity 0.5s ease"
    >
      {/* Fondo oscuro */}
      <Box
        position="absolute"
        inset="0"
        bg="rgba(10,10,10,0.97)"
        onClick={handleClose}
      />

      {/* Contenido */}
      <Box
        position="absolute"
        inset="0"
        overflowY="auto"
        px={{ base: 5, md: 12, lg: 20 }}
        py={{ base: 20, md: 16 }}
        transform={visible ? 'translateY(0)' : 'translateY(30px)'}
        transition="transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
      >
        {/* Botón cerrar */}
        <Box
          position="fixed"
          top={{ base: '20px', md: '32px' }}
          right={{ base: '20px', md: '40px' }}
          zIndex={10}
          onClick={handleClose}
          cursor="pointer"
          display="flex"
          flexDirection="column"
          gap="6px"
          padding="8px"
          _hover={{ opacity: 0.6 }}
          transition="opacity 0.3s ease"
        >
          <Box
            width="28px"
            height="1px"
            bg="white"
            transform="rotate(45deg) translateY(3.5px)"
          />
          <Box
            width="28px"
            height="1px"
            bg="white"
            transform="rotate(-45deg) translateY(-3.5px)"
          />
        </Box>

        {/* Número + categoría */}
        <HStack
          mb={{ base: 6, md: 10 }}
          spacing={6}
          opacity={0.5}
        >
          <Text
            fontFamily="body"
            fontSize="10px"
            letterSpacing="0.35em"
            textTransform="uppercase"
            color="white"
          >
            {String(project.id).padStart(2, '0')}
          </Text>
          <Box width="30px" height="1px" bg="whiteAlpha.400" />
          <Text
            fontFamily="body"
            fontSize="10px"
            letterSpacing="0.35em"
            textTransform="uppercase"
            color="white"
          >
            {project.category}
          </Text>
        </HStack>

        {/* Título */}
        <Text
          fontFamily="heading"
          fontSize={{ base: '4xl', md: '6xl', lg: '8xl' }}
          fontWeight="300"
          fontStyle="italic"
          color="white"
          lineHeight="0.95"
          mb={{ base: 10, md: 16 }}
          maxW="800px"
        >
          {project.title}
        </Text>

        {/* Bloque 1: render izquierda + texto derecha */}
        <Grid
          templateColumns={{ base: '1fr', md: '1fr 1fr' }}
          gap={{ base: 8, md: 12 }}
          mb={{ base: 10, md: 16 }}
          alignItems="start"
        >
          {/* Render — misma imagen que la card */}
          <Box
            width="100%"
            height={{ base: '280px', md: '520px' }}
            overflow="hidden"
            position="relative"
            flexShrink={0}
          >
            <Box
              position="absolute"
              inset="0"
              backgroundImage={`url('${project.image}')`}
              backgroundSize="cover"
              backgroundPosition="center"
              filter="brightness(0.85)"
            />
          </Box>

          {/* Texto derecha */}
          <VStack align="flex-start" spacing={8} pt={{ base: 0, md: 4 }}>
            {/* Ficha técnica */}
            <Grid
              templateColumns="1fr 1fr"
              gap={6}
              width="100%"
              pb={8}
              borderBottom="1px solid"
              borderColor="whiteAlpha.100"
            >
              <Box>
                <Text
                  fontFamily="body"
                  fontSize="9px"
                  letterSpacing="0.3em"
                  textTransform="uppercase"
                  color="whiteAlpha.400"
                  mb={2}
                >
                  Año
                </Text>
                <Text
                  fontFamily="heading"
                  fontSize="xl"
                  fontWeight="300"
                  fontStyle="italic"
                  color="white"
                >
                  {project.year}
                </Text>
              </Box>
              <Box>
                <Text
                  fontFamily="body"
                  fontSize="9px"
                  letterSpacing="0.3em"
                  textTransform="uppercase"
                  color="whiteAlpha.400"
                  mb={2}
                >
                  Área
                </Text>
                <Text
                  fontFamily="heading"
                  fontSize="xl"
                  fontWeight="300"
                  fontStyle="italic"
                  color="white"
                >
                  {project.area}
                </Text>
              </Box>
              <Box>
                <Text
                  fontFamily="body"
                  fontSize="9px"
                  letterSpacing="0.3em"
                  textTransform="uppercase"
                  color="whiteAlpha.400"
                  mb={2}
                >
                  Ubicación
                </Text>
                <Text
                  fontFamily="heading"
                  fontSize="xl"
                  fontWeight="300"
                  fontStyle="italic"
                  color="white"
                >
                  {project.location}
                </Text>
              </Box>
              <Box>
                <Text
                  fontFamily="body"
                  fontSize="9px"
                  letterSpacing="0.3em"
                  textTransform="uppercase"
                  color="whiteAlpha.400"
                  mb={2}
                >
                  Tipo
                </Text>
                <Text
                  fontFamily="heading"
                  fontSize="xl"
                  fontWeight="300"
                  fontStyle="italic"
                  color="white"
                >
                  {project.category}
                </Text>
              </Box>
            </Grid>

            {/* Descripción */}
            <Text
              fontFamily="body"
              fontSize={{ base: 'xs', md: 'sm' }}
              fontWeight="300"
              lineHeight="2"
              color="whiteAlpha.700"
            >
              {project.description}
            </Text>
          </VStack>
        </Grid>

        {/* Bloque 2: imagen detalle fullwidth */}
        <Box
          width="100%"
          height={{ base: '220px', md: '480px', lg: '600px' }}
          overflow="hidden"
          position="relative"
          mb={{ base: 10, md: 16 }}
        >
          <Box
            position="absolute"
            inset="0"
            backgroundImage={`url('${project.imageDetail}')`}
            backgroundSize="cover"
            backgroundPosition="center"
            filter="brightness(0.8)"
          />
        </Box>

        {/* Bloque 3: texto final */}
        <Grid
          templateColumns={{ base: '1fr', md: '1fr 1fr' }}
          gap={{ base: 6, md: 20 }}
          mb={{ base: 16, md: 20 }}
        >
          <Box />
          <Text
            fontFamily="body"
            fontSize={{ base: 'xs', md: 'sm' }}
            fontWeight="300"
            lineHeight="2"
            color="whiteAlpha.600"
          >
            {project.descriptionExtra}
          </Text>
        </Grid>

        {/* Pie del modal */}
        <Box
          borderTop="1px solid"
          borderColor="whiteAlpha.100"
          pt={8}
          pb={4}
        >
          <Text
            fontFamily="body"
            fontSize="10px"
            letterSpacing="0.3em"
            textTransform="uppercase"
            color="whiteAlpha.300"
            cursor="pointer"
            _hover={{ color: 'white' }}
            transition="color 0.3s ease"
            onClick={handleClose}
            display="inline-block"
          >
            ← Volver a proyectos
          </Text>
        </Box>
      </Box>
    </Box>
  )
}