import { Box, Grid, Text, VStack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import ProjectCard from '../projects/ProjectCard'
import ProjectViewer from '../projects/ProjectViewer'
const projects = [
  {
    id: 1,
    title: 'Casa Montaña',
    year: '2024',
    category: 'Residencial',
    location: 'Cuenca, Ecuador',
    area: '320 m²',
    image: 'https://placehold.co/800x1000/111110/888884?text=render_proyectos_1',
    imageDetail: 'https://placehold.co/1200x700/111110/888884?text=render_proyectos_1_detalle',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
    descriptionExtra: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
  },
  {
    id: 2,
    title: 'Torre Lumina',
    year: '2023',
    category: 'Comercial',
    location: 'Quito, Ecuador',
    area: '1,200 m²',
    image: 'https://placehold.co/800x1000/1a1a18/888884?text=render_proyectos_2',
    imageDetail: 'https://placehold.co/1200x700/1a1a18/888884?text=render_proyectos_2_detalle',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
    descriptionExtra: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
  },
  {
    id: 3,
    title: 'Residencia Valle',
    year: '2023',
    category: 'Residencial',
    location: 'Loja, Ecuador',
    area: '480 m²',
    image: 'https://placehold.co/800x1000/222220/888884?text=render_proyectos_3',
    imageDetail: 'https://placehold.co/1200x700/222220/888884?text=render_proyectos_3_detalle',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
    descriptionExtra: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
  },
  {
    id: 4,
    title: 'Pabellón Mínimo',
    year: '2022',
    category: 'Cultural',
    location: 'Cuenca, Ecuador',
    area: '210 m²',
    image: 'https://placehold.co/800x1000/111110/888884?text=render_proyectos_4',
    imageDetail: 'https://placehold.co/1200x700/111110/888884?text=render_proyectos_4_detalle',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
    descriptionExtra: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
  },
  {
    id: 5,
    title: 'Estudio Río',
    year: '2022',
    category: 'Residencial',
    location: 'Cuenca, Ecuador',
    area: '180 m²',
    image: 'https://placehold.co/800x1000/1a1a18/888884?text=render_proyectos_5',
    imageDetail: 'https://placehold.co/1200x700/1a1a18/888884?text=render_proyectos_5_detalle',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
    descriptionExtra: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
  },
  {
    id: 6,
    title: 'Centro Ávila',
    year: '2021',
    category: 'Comercial',
    location: 'Guayaquil, Ecuador',
    area: '950 m²',
    image: 'https://placehold.co/800x1000/222220/888884?text=render_proyectos_6',
    imageDetail: 'https://placehold.co/1200x700/222220/888884?text=render_proyectos_6_detalle',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
    descriptionExtra: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
  },
]

export default function ProjectsSection() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

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
    <>
      <Box
        id="proyectos"
        className="scroll-section"
        ref={sectionRef}
        minHeight="100vh"
        bg="#0A0A0A"
        py={{ base: 16, md: 28 }}
        px={{ base: 4, md: 12, lg: 20 }}
      >
        {/* Header */}
        <VStack
          align="flex-start"
          mb={{ base: 10, md: 16 }}
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
            — 02
          </Text>
          <Text
            fontFamily="heading"
            fontSize={{ base: '4xl', md: '6xl' }}
            fontWeight="300"
            fontStyle="italic"
            color="white"
            lineHeight="1"
          >
            Proyectos
          </Text>
          <Box width="40px" height="1px" bg="whiteAlpha.300" mt={4} />
        </VStack>

        {/* Grid */}
        <Grid
          templateColumns={{
            base: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          gap={{ base: 3, md: 4 }}
          width="100%"
        >
          {projects.map((project, index) => (
            <Box
              key={project.id}
              className={`fade-up ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${0.15 + index * 0.08}s` }}
              width="100%"
            >
              <ProjectCard
                {...project}
                onClick={() => setSelectedProject(project)}
              />
            </Box>
          ))}
        </Grid>
      </Box>

      {/* Modal */}
      {selectedProject && (
        <ProjectViewer
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  )
}