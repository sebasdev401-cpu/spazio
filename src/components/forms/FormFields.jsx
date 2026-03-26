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
    color: 'whiteAlpha.300',
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

export function TextField({ label, error, register, placeholder, type = 'text' }) {
  return (
    <Box position="relative" pb={6}>
      <Text {...labelStyles}>{label}</Text>
      <Input {...fieldStyles} placeholder={placeholder} type={type} {...register} />
      {error && (
        <Text position="absolute" bottom="0" fontFamily="body" fontSize="10px" color="red.300">
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
        <Text position="absolute" bottom="0" fontFamily="body" fontSize="10px" color="red.300">
          {error}
        </Text>
      )}
    </Box>
  )
}

export function RadioGroupField({ label, sublabel, error, options, register, name, watchValue, otroRegister, otroPlaceholder }) {
  return (
    <Box position="relative" pb={6}>
      <Text {...labelStyles}>{label}</Text>
      {sublabel && (
        <Text
          fontFamily="body"
          fontSize="10px"
          color="whiteAlpha.400"
          letterSpacing="0.05em"
          mb={4}
        >
          {sublabel}
        </Text>
      )}

      <Box display="flex" flexDirection="column" gap={4} mt={3}>
        {options.map((option) => {
          const isSelected = watchValue === option.value
          return (
            <Box
              key={option.value}
              as="label"
              display="flex"
              alignItems="center"
              gap={4}
              cursor="pointer"
              opacity={isSelected ? 1 : 0.6}
              _hover={{ opacity: 1 }}
              transition="opacity 0.2s ease"
            >
              {/* Input real oculto — solo para react-hook-form */}
              <input
                type="radio"
                value={option.value}
                {...register(name)}
                style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
              />

              {/* Círculo visual */}
              <Box
                width="14px"
                height="14px"
                minWidth="14px"
                borderRadius="50%"
                border="1px solid"
                borderColor={isSelected ? 'white' : 'rgba(247,247,245,0.35)'}
                bg={isSelected ? 'white' : 'transparent'}
                transition="all 0.2s ease"
                flexShrink={0}
              />

              <Text
                fontFamily="body"
                fontSize="xs"
                fontWeight="300"
                color="white"
                letterSpacing="0.05em"
              >
                {option.label}
              </Text>
            </Box>
          )
        })}
      </Box>

      {/* Campo extra si selecciona Otro */}
      {watchValue === 'otro' && (
        <Box mt={5}>
          <input
            placeholder={otroPlaceholder || 'Especifica aquí...'}
            {...otroRegister}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.2)',
              color: '#F7F7F5',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '14px',
              fontWeight: '300',
              letterSpacing: '0.05em',
              padding: '8px 0',
              outline: 'none',
            }}
          />
        </Box>
      )}

      {error && (
        <Text
          position="absolute"
          bottom="0"
          fontFamily="body"
          fontSize="10px"
          color="red.300"
        >
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
          bg="#0A0A0A"
          border="none"
          borderBottom="1px solid"
          borderColor="rgba(255,255,255,0.2)"
          borderRadius="0"
          color="#F7F7F5"
          fontFamily="'Montserrat', sans-serif"
          fontSize="14px"
          fontWeight="300"
          letterSpacing="0.05em"
          px="0"
          py="12px"
          outline="none"
          cursor="pointer"
          appearance="none"
          sx={{
            '& option': {
              background: '#0A0A0A',
              color: '#F7F7F5',
              fontFamily: 'Montserrat, sans-serif',
            },
            '&:focus': {
              borderColor: 'rgba(255,255,255,0.6)',
              outline: 'none',
              background: '#0A0A0A',
            },
            '& option:checked': {
              background: '#2a2a28',
            },
          }}
          {...register}
        >
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              style={{
                background: '#0A0A0A',
                color: '#F7F7F5',
              }}
            >
              {opt.label}
            </option>
          ))}
        </Box>
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
        <Text position="absolute" bottom="0" fontFamily="body" fontSize="10px" color="red.300">
          {error}
        </Text>
      )}
    </Box>
  )
}