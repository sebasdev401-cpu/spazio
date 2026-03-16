import { Box, Grid, Text, Button, VStack } from '@chakra-ui/react'
import { TextField, TextAreaField, SelectField } from './FormFields'
import { useProformaForm } from '../../hooks/useProformaForm'

const tipoOptions = [
  { value: 'residencial', label: 'Residencial' },
  { value: 'comercial', label: 'Comercial' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'otro', label: 'Otro' },
]

const presupuestoOptions = [
  { value: 'bajo', label: 'Menos de $50,000' },
  { value: 'medio', label: '$50,000 — $200,000' },
  { value: 'alto', label: 'Más de $200,000' },
  { value: 'por_definir', label: 'Por definir' },
]

export default function ProformaForm() {
  const { register, handleSubmit, errors, onSubmit, status } = useProformaForm()

  if (status === 'success') {
    return (
      <VStack
        justify="center"
        align="flex-start"
        spacing={6}
        py={20}
        className="fade-up visible"
      >
        <Text
          fontFamily="heading"
          fontSize={{ base: '3xl', md: '5xl' }}
          fontWeight="300"
          fontStyle="italic"
          color="white"
          lineHeight="1.2"
        >
          Gracias por contactarnos.
        </Text>
        <Text
          fontFamily="body"
          fontSize="sm"
          fontWeight="300"
          color="whiteAlpha.600"
          letterSpacing="0.05em"
        >
          Nos pondremos en contacto contigo en las próximas 48 horas.
        </Text>
        <Box width="40px" height="1px" bg="whiteAlpha.300" />
      </VStack>
    )
  }

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 1fr' }}
        gap={{ base: 0, md: 8 }}
      >
        <TextField
          label="Nombre completo"
          placeholder="Tu nombre"
          register={register('nombre')}
          error={errors.nombre?.message}
        />
        <TextField
          label="Empresa (opcional)"
          placeholder="Tu empresa"
          register={register('empresa')}
          error={errors.empresa?.message}
        />
        <TextField
          label="Email"
          placeholder="correo@ejemplo.com"
          register={register('email')}
          error={errors.email?.message}
        />
        <TextField
          label="Teléfono"
          placeholder="+593 00 000 0000"
          register={register('telefono')}
          error={errors.telefono?.message}
        />
        <SelectField
          label="Tipo de proyecto"
          register={register('tipoProyecto')}
          error={errors.tipoProyecto?.message}
          options={tipoOptions}
        />
        <TextField
          label="Metraje aproximado (m²)"
          placeholder="Ej: 250"
          register={register('metraje')}
          error={errors.metraje?.message}
        />
        <SelectField
          label="Rango de presupuesto"
          register={register('presupuesto')}
          error={errors.presupuesto?.message}
          options={presupuestoOptions}
        />
      </Grid>

      <Box mt={4}>
        <TextAreaField
          label="Cuéntanos sobre tu proyecto"
          placeholder="Describe brevemente tu visión, necesidades o cualquier detalle relevante..."
          register={register('mensaje')}
          error={errors.mensaje?.message}
        />
      </Box>

      <Box mt={8}>
        <Button
          type="submit"
          bg="transparent"
          border="1px solid"
          borderColor="whiteAlpha.400"
          color="white"
          borderRadius="0"
          letterSpacing="0.25em"
          fontSize="10px"
          textTransform="uppercase"
          px={10}
          py={5}
          height="auto"
          fontFamily="body"
          fontWeight="400"
          cursor="none"
          isLoading={status === 'loading'}
          loadingText="Enviando..."
          _hover={{
            bg: 'white',
            color: '#0A0A0A',
            borderColor: 'white',
          }}
          transition="all 0.4s ease"
        >
          Solicitar proforma
        </Button>
      </Box>
    </Box>
  )
}