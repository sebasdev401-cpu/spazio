import { Box, Text, Input, Textarea } from '@chakra-ui/react'

const fieldStyles = {
  bg: 'transparent',
  border: 'none',
  borderBottom: '1px solid',
  borderColor: 'whiteAlpha.300',
  borderRadius: '0',
  color: 'white',
  fontFamily: 'body',
  fontSize: 'sm',
  fontWeight: '300',
  letterSpacing: '0.05em',
  px: '0',
  py: '3',
  height: 'auto',
  _focus: {
    borderColor: 'whiteAlpha.700',
    boxShadow: 'none',
    outline: 'none',
  },
  _placeholder: {
    color: 'whiteAlpha.400',
    fontSize: 'xs',
    letterSpacing: '0.1em',
  },
}

const labelStyles = {
  fontFamily: 'body',
  fontSize: '9px',
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  color: 'whiteAlpha.500',
  mb: 2,
}

export function TextField({ label, error, register, placeholder }) {
  return (
    <Box position="relative" pb={6}>
      <Text {...labelStyles}>{label}</Text>
      <Input {...fieldStyles} placeholder={placeholder} {...register} />
      {error && (
        <Text position="absolute" bottom="0" fontFamily="body" fontSize="10px" color="red.300" letterSpacing="0.05em">
          {error}
        </Text>
      )}
    </Box>
  )
}

export function TextAreaField({ label, error, register, placeholder }) {
  return (
    <Box position="relative" pb={6}>
      <Text {...labelStyles}>{label}</Text>
      <Textarea
        {...fieldStyles}
        placeholder={placeholder}
        resize="none"
        rows={4}
        {...register}
      />
      {error && (
        <Text position="absolute" bottom="0" fontFamily="body" fontSize="10px" color="red.300" letterSpacing="0.05em">
          {error}
        </Text>
      )}
    </Box>
  )
}

export function SelectField({ label, error, register, options }) {
  return (
    <Box position="relative" pb={6}>
      <Text {...labelStyles}>{label}</Text>
      <Box position="relative">
        <Box
          as="select"
          width="100%"
          bg="transparent"
          border="none"
          borderBottom="1px solid"
          borderColor="rgba(255,255,255,0.2)"
          borderRadius="0"
          color="#F7F7F5"
          fontFamily="'Raleway', sans-serif"
          fontSize="14px"
          fontWeight="300"
          letterSpacing="0.05em"
          px="0"
          py="12px"
          outline="none"
          cursor="none"
          appearance="none"
          sx={{
            '& option': {
              background: '#111110',
              color: '#F7F7F5',
            },
            '&:focus': {
              borderColor: 'rgba(255,255,255,0.6)',
              outline: 'none',
            },
          }}
          {...register}
        >
          <option value="" disabled style={{ background: '#111110' }}>
            Seleccionar
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Box>
        {/* Flecha custom */}
        <Box
          position="absolute"
          right="0"
          top="50%"
          transform="translateY(-50%)"
          pointerEvents="none"
          color="whiteAlpha.500"
          fontSize="10px"
        >
          ↓
        </Box>
      </Box>
      {error && (
        <Text position="absolute" bottom="0" fontFamily="body" fontSize="10px" color="red.300" letterSpacing="0.05em">
          {error}
        </Text>
      )}
    </Box>
  )
}