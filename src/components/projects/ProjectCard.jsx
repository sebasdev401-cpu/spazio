import { Box, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'

export default function ProjectCard({ title, year, category, image, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Box
      position="relative"
      overflow="hidden"
      cursor="pointer"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      width="100%"
      // Altura fija en mobile, más grande en desktop
      height={{ base: '260px', sm: '320px', md: '400px', lg: '480px' }}
    >
      {/* Imagen */}
      <Box
        position="absolute"
        inset="0"
        backgroundImage={`url('${image}')`}
        backgroundSize="cover"
        backgroundPosition="center"
        transform={hovered ? 'scale(1.06)' : 'scale(1.0)'}
        transition="transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)"
        filter={hovered ? 'brightness(0.45)' : 'brightness(0.7)'}
      />

      {/* Overlay gradiente */}
      <Box
        position="absolute"
        inset="0"
        background="linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 55%)"
      />

      {/* Info abajo */}
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        p={{ base: 4, md: 6 }}
        transform={hovered ? 'translateY(-8px)' : 'translateY(0)'}
        transition="transform 0.5s ease"
      >
        <Text
          fontFamily="body"
          fontSize="10px"
          letterSpacing="0.25em"
          textTransform="uppercase"
          color="whiteAlpha.600"
          mb={1}
        >
          {category} · {year}
        </Text>
        <Text
          fontFamily="heading"
          fontSize={{ base: 'lg', md: '2xl' }}
          fontWeight="300"
          color="white"
          fontStyle="italic"
          lineHeight="1.1"
        >
          {title}
        </Text>
      </Box>

      {/* Ver proyecto — solo visible en hover desktop */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform={
          hovered
            ? 'translate(-50%, -50%) translateY(0)'
            : 'translate(-50%, -50%) translateY(12px)'
        }
        opacity={hovered ? 1 : 0}
        transition="all 0.5s ease"
        textAlign="center"
        display={{ base: 'none', md: 'block' }}
      >
        <Text
          fontFamily="body"
          fontSize="10px"
          letterSpacing="0.3em"
          textTransform="uppercase"
          color="white"
          borderBottom="1px solid rgba(247,247,245,0.4)"
          pb={1}
        >
          Ver proyecto
        </Text>
      </Box>
    </Box>
  )
}