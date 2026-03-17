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
        title: 'Casa Lago',
        year: '2025',
        category: 'Arquitectónico',
        location: 'Thalwill, Suiza',
        area: '596 m²',
        images: [
          '/images/renders/Scene%201_4.jpg',
          '/images/renders/scene%203_1-3.jpg',
          '/images/renders/scene%204_1-3.jpg',
          '/images/renders/scene%205_1-3.jpg',
          '/images/renders/Scene%206_1-2.jpg',
        ],
        description: 'Casa Lago es una vivienda unifamiliar en Thalwil, Suiza, diseñada bajo una normativa estricta y un fuerte vínculo con el paisaje.',
        descriptionExtra: 'El reto principal fue maximizar el potencial del volumen permitido, potenciar las vistas al lago y lograr un equilibrio entre privacidad, luz natural y calidad espacial.',
      },
      {
        id: 2,
        title: 'Casa Abuga',
        year: '2024',
        category: 'Arquitectónico',
        location: 'Cuenca, Ecuador',
        area: '310 m²',
        images: [
          '/images/renders/image.png',
          '/images/renders/image%202.png',
        ],
        description: 'Casa Abuga es una vivienda unifamiliar en Cuenca, Ecuador, diseñada con un enfoque funcional y climático. El proyecto prioriza las vistas al cerro Abuga, optimizando los recursos y logrando un equilibrio entre el paisaje, el confort y la identidad arquitectónica.',
        descriptionExtra: '',
      },
      {
        id: 3,
        title: 'Oasis House',
        year: '2025',
        category: 'Arquitectónico',
        location: 'Riad, Arabia Saudita',
        area: '412 m²',
        images: [
          '/images/renders/IMG_4831.jpg',
          '/images/renders/IMG_4832.jpg',
          '/images/renders/oasis_house.png',
          '/images/renders/oasis_house_2.png',
        ],
        description: 'Chalet residencial en Riad, Arabia Saudita, diseñado para responder a un clima extremo y a requerimientos culturales específicos.',
        descriptionExtra: '',
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
        title: 'Sfizio Kitchen School',
        year: '2024',
        category: 'Interiores',
        location: 'Aosta Valley, Piemonte, Italia',
        area: '180 m²',
        images: [
          '/images/renders/ai-render-1778376.jpg',
          '/images/renders/ai-render-1779459.jpg',
          '/images/renders/435a0df1-604d-463b-8d1c-0944727d0c48.jpg',
        ],
        description: 'Sfizio es un restaurante y escuela de cocina de carácter temporal, diseñado con una arquitectura desmontable y trasladable.',
        descriptionExtra: '',
      },
      {
        id: 5,
        title: 'Oasis House',
        year: '2022',
        category: 'Interiores',
        location: 'Riad, Arabia Saudita',
        area: '412 m²',
        images: [
          '/images/renders/oasis_interior_1.png',
          '/images/renders/oasis_interior_2.png',
          '/images/renders/oasis_interior_3.png',
          '/images/renders/oasis_interior_4.png',
          '/images/renders/oasis_interior_5.png',
        ],
        description: 'Chalet residencial en Riad, Arabia Saudita, diseñado para responder a un clima extremo y a requerimientos culturales específicos.',
        descriptionExtra: '',
      },
      {
        id: 6,
        title: 'Villa Teresa',
        year: '2022',
        category: 'Interiores',
        location: 'Montepulciano, Toscana, Italia',
        area: '721 m²',
        images: [
          '/images/renders/IMG_4457.jpg',
          '/images/renders/IMG_4462.png',
        ],
        description: 'Restauración y ampliación de una villa en Montepulciano, Italia. El proyecto busca integrar lo nuevo y lo existente de manera armónica.',
        descriptionExtra: '',
      },
      {
        id: 7,
        title: 'Kitchen Allison Gordons',
        year: '2022',
        category: 'Interiores',
        location: 'Atlanta, USA',
        area: '55 m²',
        images: [
          '/images/renders/Scene 4_9.png',
          '/images/renders/Scene 3_9.png',
          '/images/renders/ai-render-7163199.jpg',
          '/images/renders/ai-render-7162832.jpg',
        ],
        description: 'Diseño de cocina residencial desarrollado junto a SirenSpaces. Estética audaz y sofisticada donde materialidad, color y diseño a medida se integran.',
        descriptionExtra: '',
      },
      {
        id: 8,
        title: 'Villa Tatari',
        year: '2022',
        category: 'Interiores',
        location: 'Tánger, Marruecos',
        area: '175 m²',
        images: [
          '/images/renders/villa_tatari.jpg',
          '/images/renders/villa_tatari_1.jpg',
          '/images/renders/villa_tatari_2.jpg',
          '/images/renders/villa_tatari_3.jpg',
        ],
        description: 'Proyecto integral de arquitectura e interiorismo de una villa privada, enfocado en claridad espacial, materialidad y confort contemporáneo.',
        descriptionExtra: '',
      },
    ],
  },
  {
    id: 'inmobiliarios',
    number: '04',
    title: 'Inmobiliarios',
    description:
      'Desarrollamos proyectos inmobiliarios con visión a largo plazo. Desde la conceptualización hasta la entrega, acompañamos cada etapa con rigor técnico y sensibilidad espacial.',
    projects: [],
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