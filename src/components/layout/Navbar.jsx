import { Box, Flex, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavbarVisibility } from '../../hooks/useNavbarVisibility'

const links = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Proyectos en el Mundo', href: '#mapa' },
  { label: 'Arquitectónicos', href: '#arquitectonicos' },
  { label: 'Interiores', href: '#interiores' },
  { label: 'Inmobiliarios', href: '#inmobiliarios' },
  { label: 'Quiénes Somos', href: '#quienes' },
  { label: 'Proforma', href: '#proforma' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const { activeSection } = useNavbarVisibility()
  const isTouchDevice = window.matchMedia('(hover: none)').matches
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen((prev) => !prev)

  const handleClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      if (isTouchDevice) {
        target.scrollIntoView({ behavior: 'smooth' })
      } else {
        const container = document.querySelector('.scroll-container')
        if (container) {
          container.scrollTo({ top: target.offsetTop, behavior: 'smooth' })
        }
      }
    }
    if (isTouchDevice) toggleMenu()
  }

  return (
    <>
      {/* Botón hamburguesa — solo mobile */}
      {isTouchDevice && (
        <Box
          position="fixed"
          top="24px"
          right="24px"
          zIndex={1100}
          onClick={toggleMenu}
          display="flex"
          flexDirection="column"
          gap="5px"
          padding="8px"
          cursor="pointer"
        >
          <Box
            width="24px"
            height="1px"
            bg="white"
            transition="all 0.3s ease"
            transform={menuOpen ? 'rotate(45deg) translateY(4px)' : 'none'}
            transformOrigin="center"
          />
          <Box
            width="24px"
            height="1px"
            bg="white"
            transition="all 0.3s ease"
            opacity={menuOpen ? 0 : 1}
          />
          <Box
            width="24px"
            height="1px"
            bg="white"
            transition="all 0.3s ease"
            transform={menuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none'}
            transformOrigin="center"
          />
        </Box>
      )}

      {/* Navbar desktop — siempre visible */}
      {!isTouchDevice && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          zIndex={1000}
          px={12}
          py={5}
          background="linear-gradient(to bottom, rgba(10,10,10,0.9) 0%, transparent 100%)"
          backdropFilter="blur(4px)"
        >
          <Flex justify="space-between" align="center">
            {/* Logo */}
            <Box
              as="img"
              src="/images/renders/SPAZIO_texto.svg"
              alt="Spazio"
              height="24px"
              width="auto"
              style={{ filter: 'brightness(0) invert(1)' }}
              cursor="pointer"
              onClick={(e) => handleClick(e, '#inicio')}
              opacity={0.9}
            />

            {/* Links */}
            <Flex gap={8} align="center">
              {links.map((link) => {
                const sectionId = link.href.replace('#', '')
                const isActive = activeSection === sectionId

                return (
                  <Box
                    key={link.label}
                    as="a"
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    position="relative"
                    fontFamily="body"
                    fontSize="10px"
                    fontWeight="400"
                    letterSpacing="0.2em"
                    textTransform="uppercase"
                    color="white"
                    opacity={isActive ? 1 : 0.45}
                    cursor="none"
                    textDecoration="none"
                    _hover={{ opacity: 1 }}
                    transition="opacity 0.3s ease"
                    pb="4px"
                  >
                    {link.label}
                    {/* Línea debajo de sección activa */}
                    <Box
                      position="absolute"
                      bottom="0"
                      left="0"
                      right="0"
                      height="1px"
                      bg="white"
                      opacity={isActive ? 1 : 0}
                      transform={isActive ? 'scaleX(1)' : 'scaleX(0)'}
                      transformOrigin="left"
                      transition="all 0.4s ease"
                    />
                  </Box>
                )
              })}
            </Flex>
          </Flex>
        </Box>
      )}

      {/* Menú mobile fullscreen */}
      {isTouchDevice && (
        <Box
          position="fixed"
          inset="0"
          zIndex={1000}
          bg="rgba(10,10,10,0.97)"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          opacity={menuOpen ? 1 : 0}
          pointerEvents={menuOpen ? 'all' : 'none'}
          transition="opacity 0.4s ease"
        >
          <Box
            as="img"
            src="/images/renders/SPAZIO.svg"
            alt="Spazio"
            height="24px"
            width="auto"
            mb={16}
            opacity={0.5}
            style={{ filter: 'brightness(0) invert(1)' }}
          />

          <VStack spacing={8} align="center">
            {links.map((link, i) => {
              const sectionId = link.href.replace('#', '')
              const isActive = activeSection === sectionId

              return (
                <Box
                  key={link.label}
                  as="a"
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  position="relative"
                  fontFamily="heading"
                  fontSize="4xl"
                  fontWeight="300"
                  fontStyle="italic"
                  color="white"
                  textDecoration="none"
                  opacity={menuOpen ? (isActive ? 1 : 0.5) : 0}
                  transform={menuOpen ? 'translateY(0)' : 'translateY(20px)'}
                  transition={`all 0.5s ease ${i * 0.08}s`}
                  _hover={{ opacity: 1 }}
                  pb="4px"
                >
                  {link.label}
                  <Box
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    height="1px"
                    bg="white"
                    opacity={isActive ? 1 : 0}
                    transform={isActive ? 'scaleX(1)' : 'scaleX(0)'}
                    transformOrigin="left"
                    transition="all 0.4s ease"
                  />
                </Box>
              )
            })}
          </VStack>
        </Box>
      )}
    </>
  )
}