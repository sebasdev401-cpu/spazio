import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

const bounce = keyframes`
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50% { transform: translateY(8px); opacity: 1; }
`

export default function ScrollIndicator() {
  return (
    <Box
      position="absolute"
      bottom="40px"
      left="50%"
      transform="translateX(-50%)"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      opacity={0.6}
      animation={`${bounce} 2s ease-in-out infinite`}
    >
      <Box
        width="1px"
        height="60px"
        background="linear-gradient(to bottom, transparent, #F7F7F5)"
      />
    </Box>
  )
}