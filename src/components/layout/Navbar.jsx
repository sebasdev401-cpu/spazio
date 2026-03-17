import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import { useNavbarVisibility } from '../../hooks/useNavbarVisibility'

const links = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Arquitectónicos', href: '#arquitectonicos' },
  { label: 'Interiores', href: '#interiores' },
  { label: 'Inmobiliarios', href: '#inmobiliarios' },
  { label: 'Quiénes Somos', href: '#quienes' },
  { label: 'Proforma', href: '#proforma' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const { visible, menuOpen, toggleMenu, isTouchDevice } = useNavbarVisibility()

  const handleClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      // En mobile el scroll-container es el body, en desktop es el div
      if (isTouchDevice) {
        target.scrollIntoView({ behavior: 'smooth' })
      } else {
        const container = document.querySelector('.scroll-container')
        if (container) {
          const offsetTop = target.offsetTop
          container.scrollTo({ top: offsetTop, behavior: 'smooth' })
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

      {/* Navbar desktop */}
      {!isTouchDevice && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          zIndex={1000}
          px={12}
          py={6}
          opacity={visible ? 1 : 0}
          transform={visible ? 'translateY(0)' : 'translateY(-100%)'}
          transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
          pointerEvents={visible ? 'all' : 'none'}
          background="linear-gradient(to bottom, rgba(10,10,10,0.85) 0%, transparent 100%)"
        >
          <Flex justify="space-between" align="center">
            <Text
              fontFamily="heading"
              fontSize="xl"
              fontWeight="300"
              letterSpacing="0.35em"
              color="white"
              textTransform="uppercase"
            >
              Spazio
            </Text>
            <Flex gap={10}>
              {links.map((link) => (
                <Text
                  key={link.label}
                  as="a"
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  fontFamily="body"
                  fontSize="xs"
                  fontWeight="400"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                  color="white"
                  opacity={0.75}
                  cursor="none"
                  _hover={{ opacity: 1 }}
                  transition="opacity 0.3s ease"
                >
                  {link.label}
                </Text>
              ))}
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
          {/* Logo */}
          <Text
            fontFamily="heading"
            fontSize="2xl"
            fontWeight="300"
            letterSpacing="0.4em"
            color="white"
            textTransform="uppercase"
            mb={16}
            opacity={0.5}
          >
            Spazio
          </Text>

          <VStack spacing={8} align="center">
            {links.map((link, i) => (
              <Text
                key={link.label}
                as="a"
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                fontFamily="heading"
                fontSize="4xl"
                fontWeight="300"
                fontStyle="italic"
                color="white"
                textDecoration="none"
                opacity={menuOpen ? 1 : 0}
                transform={menuOpen ? 'translateY(0)' : 'translateY(20px)'}
                transition={`all 0.5s ease ${i * 0.08}s`}
                _hover={{ opacity: 0.6 }}
              >
                {link.label}
              </Text>
            ))}
          </VStack>
        </Box>
      )}
    </>
  )
}