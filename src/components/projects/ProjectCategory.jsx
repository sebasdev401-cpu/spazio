import { Box, Grid, Text, VStack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import ProjectCard from './ProjectCard'

export default function ProjectCategory({ category, onSelectProject }) {
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
      id={category.id}
      className="scroll-section"
      ref={sectionRef}
      minHeight="100vh"
      bg="#0A0A0A"
      py={{ base: 16, md: 28 }}
      px={{ base: 4, md: 12, lg: 20 }}
      borderTop="1px solid"
      borderColor="whiteAlpha.50"
    >
      {/* Header categoría */}
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 1fr' }}
        gap={{ base: 6, md: 16 }}
        mb={{ base: 12, md: 20 }}
        alignItems="flex-end"
      >
        {/* Izquierda — número y título */}
        <VStack
          align="flex-start"
          spacing={4}
          className={`fade-up ${visible ? 'visible' : ''}`}
          style={{ transitionDelay: '0.1s' }}
        >
          <Text
            fontFamily="body"
            fontSize="10px"
            letterSpacing="0.35em"
            textTransform="uppercase"
            color="whiteAlpha.400"
          >
            — {category.number}
          </Text>
          <Text
            fontFamily="heading"
            fontSize={{ base: '4xl', md: '6xl' }}
            fontWeight="300"
            fontStyle="italic"
            color="white"
            lineHeight="1"
          >
            {category.title}
          </Text>
          <Box width="40px" height="1px" bg="whiteAlpha.200" />
        </VStack>

        {/* Derecha — descripción */}
        <Text
          fontFamily="body"
          fontSize={{ base: 'xs', md: 'sm' }}
          fontWeight="300"
          lineHeight="2"
          color="whiteAlpha.500"
          className={`fade-up ${visible ? 'visible' : ''}`}
          style={{ transitionDelay: '0.2s' }}
          pt={{ base: 0, md: 8 }}
        >
          {category.description}
        </Text>
      </Grid>

      {/* Grid de proyectos */}
      <Grid
        templateColumns={{
          base: '1fr',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        gap={{ base: 3, md: 4 }}
        width="100%"
      >
        {category.projects.map((project, index) => (
          <Box
            key={project.id}
            className={`fade-up ${visible ? 'visible' : ''}`}
            style={{ transitionDelay: `${0.25 + index * 0.1}s` }}
            width="100%"
          >
            <ProjectCard
              {...project}
              onClick={() => onSelectProject(project)}
            />
          </Box>
        ))}
      </Grid>
    </Box>
  )
}