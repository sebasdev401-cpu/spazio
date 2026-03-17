import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          black: { value: '#0A0A0A' },
          white: { value: '#F7F7F5' },
          gray100: { value: '#E8E8E6' },
          gray400: { value: '#888884' },
          gray700: { value: '#2A2A28' },
          gray900: { value: '#111110' },
        },
      },
      fonts: {
        heading: { value: `'The Seasons', Georgia, serif` },
        body: { value: `'Montserrat', sans-serif` },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)