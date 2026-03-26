import { Box, Flex, Text } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box
      bg="#080808"
      borderTop="1px solid"
      borderColor="whiteAlpha.100"
      px={{ base: 6, md: 12, lg: 20 }}
      py={6}
    >
      <Flex
        justify="space-between"
        align="center"
        direction={{ base: 'column', md: 'row' }}
        gap={3}
      >
        <Text
          fontFamily="heading"
          fontSize="sm"
          fontWeight="300"
          letterSpacing="0.2em"
          color="whiteAlpha.400"
        >
          Spazio
        </Text>

        <Text
          fontFamily="body"
          fontSize="10px"
          letterSpacing="0.2em"
          textTransform="uppercase"
          color="whiteAlpha.300"
        >
          © {new Date().getFullYear()} Spazio. Todos los derechos reservados.
        </Text>

        <Text
          fontFamily="body"
          fontSize="10px"
          letterSpacing="0.15em"
          textTransform="uppercase"
          color="whiteAlpha.300"
        >
          Cuenca, Ecuador
        </Text>
      </Flex>
    </Box>
  )
}