import { Box, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import ProjectCategory from '../projects/ProjectCategory'
import ProjectViewer from '../projects/ProjectViewer'

const categories = [
  {
    id: 'arquitectonicos',
    number: '02',
    title: 'Arquitectónicos',
    description:
      'Diseñamos espacios que responden al entorno, la luz y las personas que los habitan. Cada proyecto arquitectónico nace de un proceso profundo de análisis y creatividad.',
    projects: [
      {
        id: 1,
        title: 'Casa Montaña',
        year: '2024',
        category: 'Arquitectónico',
        location: 'Cuenca, Ecuador',
        area: '320 m²',
        image: 'https://placehold.co/800x1000/111110/888884?text=render_proyectos_1',
        imageDetail: 'https://placehold.co/1200x700/111110/888884?text=render_proyectos_1_detalle',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
        descriptionExtra: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      },
      {
        id: 2,
        title: 'Torre Lumina',
        year: '2023',
        category: 'Arquitectónico',
        location: 'Quito, Ecuador',
        area: '1,200 m²',
        image: 'https://placehold.co/800x1000/1a1a18/888884?text=render_proyectos_2',
        imageDetail: 'https://placehold.co/1200x700/1a1a18/888884?text=render_proyectos_2_detalle',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
        descriptionExtra: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      },
      {
        id: 3,
        title: 'Pabellón Mínimo',
        year: '2022',
        category: 'Arquitectónico',
        location: 'Cuenca, Ecuador',
        area: '210 m²',
        image: 'https://placehold.co/800x1000/222220/888884?text=render_proyectos_3',
        imageDetail: 'https://placehold.co/1200x700/222220/888884?text=render_proyectos_3_detalle',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
        descriptionExtra: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      },
    ],
  },
  {
    id: 'interiores',
    number: '03',
    title: 'Diseño de Interiores',
    description:
      'Transformamos ambientes en experiencias. Nuestro enfoque en diseño de interiores combina funcionalidad, estética y narrativa para crear espacios que cuentan historias.',
    projects: [
      {
        id: 4,
        title: 'Residencia Valle',
        year: '2023',
        category: 'Interiores',
        location: 'Loja, Ecuador',
        area: '480 m²',
        image: 'https://placehold.co/800x1000/111110/888884?text=render_interiores_1',
        imageDetail: 'https://placehold.co/1200x700/111110/888884?text=render_interiores_1_detalle',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
        descriptionExtra: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      },
      {
        id: 5,
        title: 'Estudio Río',
        year: '2022',
        category: 'Interiores',
        location: 'Cuenca, Ecuador',
        area: '180 m²',
        image: 'https://placehold.co/800x1000/1a1a18/888884?text=render_interiores_2',
        imageDetail: 'https://placehold.co/1200x700/1a1a18/888884?text=render_interiores_2_detalle',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
        descriptionExtra: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      },
      {
        id: 6,
        title: 'Loft Urbano',
        year: '2022',
        category: 'Interiores',
        location: 'Guayaquil, Ecuador',
        area: '120 m²',
        image: 'https://placehold.co/800x1000/222220/888884?text=render_interiores_3',
        imageDetail: 'https://placehold.co/1200x700/222220/888884?text=render_interiores_3_detalle',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
        descriptionExtra: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      },
    ],
  },
  {
    id: 'inmobiliarios',
    number: '04',
    title: 'Inmobiliarios',
    description:
      'Desarrollamos proyectos inmobiliarios con visión a largo plazo. Desde la conceptualización hasta la entrega, acompañamos cada etapa con rigor técnico y sensibilidad espacial.',
    projects: [
      {
        id: 7,
        title: 'Centro Ávila',
        year: '2021',
        category: 'Inmobiliario',
        location: 'Guayaquil, Ecuador',
        area: '950 m²',
        image: 'https://placehold.co/800x1000/111110/888884?text=render_inmobiliarios_1',
        imageDetail: 'https://placehold.co/1200x700/111110/888884?text=render_inmobiliarios_1_detalle',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
        descriptionExtra: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      },
      {
        id: 8,
        title: 'Conjunto Alborada',
        year: '2021',
        category: 'Inmobiliario',
        location: 'Cuenca, Ecuador',
        area: '2,400 m²',
        image: 'https://placehold.co/800x1000/1a1a18/888884?text=render_inmobiliarios_2',
        imageDetail: 'https://placehold.co/1200x700/1a1a18/888884?text=render_inmobiliarios_2_detalle',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
        descriptionExtra: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      },
      {
        id: 9,
        title: 'Plaza Núcleo',
        year: '2020',
        category: 'Inmobiliario',
        location: 'Cuenca, Ecuador',
        area: '1,800 m²',
        image: 'https://placehold.co/800x1000/222220/888884?text=render_inmobiliarios_3',
        imageDetail: 'https://placehold.co/1200x700/222220/888884?text=render_inmobiliarios_3_detalle',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
        descriptionExtra: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      },
    ],
  },
]

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <>
      <Box id="proyectos">
        {categories.map((category) => (
          <ProjectCategory
            key={category.id}
            category={category}
            onSelectProject={setSelectedProject}
          />
        ))}
      </Box>

      {selectedProject && (
        <ProjectViewer
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  )
}