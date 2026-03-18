import { Box, Text, VStack, HStack, Input, Textarea } from '@chakra-ui/react'
import { useProformaForm } from '../../hooks/useProformaForm'

const paises = [
  'Ecuador', 'Colombia', 'Perú', 'Estados Unidos',
  'España', 'Italia', 'Suiza', 'Otro',
]

const tipoPropiedadOpciones = [
  { value: 'casa', label: 'Casa' },
  { value: 'terreno', label: 'Terreno' },
  { value: 'local', label: 'Local / Espacio comercial' },
  { value: 'otro', label: 'Otro' },
]

const estadoPropiedadOpciones = [
  { value: 'sin_construir', label: 'Terreno sin construir' },
  { value: 'existente', label: 'Construcción existente' },
  { value: 'parcial', label: 'Parcialmente construida' },
  { value: 'remodelacion', label: 'En proceso de remodelación' },
  { value: 'otro', label: 'Otro' },
]

const objetivoOpciones = [
  { value: 'rentar', label: 'Rentarla' },
  { value: 'vender', label: 'Venderla' },
  { value: 'personal', label: 'Usarla personalmente' },
  { value: 'combinar', label: 'Combinar uso y renta' },
  { value: 'otro', label: 'Otro' },
]

const normativaOpciones = [
  { value: 'actualizada', label: 'Sí, está actualizada' },
  { value: 'desactualizada', label: 'La tengo pero no está actualizada' },
  { value: 'no_tengo', label: 'No la tengo' },
  { value: 'no_seguro', label: 'No estoy seguro' },
  { value: 'otro', label: 'Otro' },
]

const acompanamientoOpciones = [
  { value: 'idea', label: 'Definir una idea clara del proyecto' },
  { value: 'arquitectonico', label: 'Diseño arquitectónico' },
  { value: 'interiores', label: 'Diseño de interiores' },
  { value: 'optimizacion', label: 'Optimización del espacio para renta o inversión' },
  { value: 'integral', label: 'Proyecto integral' },
  { value: 'orientacion', label: 'Aún no lo sé, necesito orientación' },
]

const steps = [
  'Datos de Contacto',
  'Sobre tu Propiedad',
  'Tu Objetivo',
  'Información Técnica',
  'Para Cerrar',
]

// Estilos compartidos
const labelStyle = {
  fontFamily: 'body',
  fontSize: '9px',
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  color: 'whiteAlpha.500',
  mb: 2,
  display: 'block',
}

const inputStyle = {
  bg: 'transparent',
  border: 'none',
  borderBottom: '1px solid',
  borderColor: 'whiteAlpha.300',
  borderRadius: '0',
  color: 'white',
  fontFamily: 'body',
  fontSize: 'sm',
  fontWeight: '300',
  px: '0',
  py: '3',
  height: 'auto',
  _focus: { borderColor: 'whiteAlpha.700', boxShadow: 'none' },
  _placeholder: { color: 'whiteAlpha.300', fontSize: 'xs' },
}

// Componente campo de texto
function Field({ label, error, children }) {
  return (
    <Box position="relative" pb={6}>
      <Text {...labelStyle}>{label}</Text>
      {children}
      {error && (
        <Text position="absolute" bottom="0" fontFamily="body" fontSize="10px" color="red.300">
          {error}
        </Text>
      )}
    </Box>
  )
}

// Componente radio group
function RadioGroup({ label, sublabel, options, value, onChange, error, otroValue, onOtroChange, otroPlaceholder }) {
  return (
    <Box position="relative" pb={6}>
      <Text {...labelStyle}>{label}</Text>
      {sublabel && (
        <Text fontFamily="body" fontSize="10px" color="whiteAlpha.400" letterSpacing="0.05em" mb={4} fontStyle="italic">
          {sublabel}
        </Text>
      )}
      <VStack align="flex-start" spacing={4} mt={2}>
        {options.map((option) => (
          <Box
            key={option.value}
            display="flex"
            alignItems="center"
            gap={4}
            cursor="pointer"
            onClick={() => onChange(option.value)}
            opacity={value === option.value ? 1 : 0.6}
            _hover={{ opacity: 1 }}
            transition="opacity 0.2s ease"
          >
            {/* Círculo visual */}
            <Box
              width="14px"
              height="14px"
              minWidth="14px"
              borderRadius="50%"
              border="1px solid"
              borderColor={value === option.value ? 'white' : 'whiteAlpha.400'}
              bg={value === option.value ? 'white' : 'transparent'}
              transition="all 0.2s ease"
              flexShrink={0}
            />
            <Text fontFamily="body" fontSize="xs" fontWeight="300" color="white" letterSpacing="0.05em">
              {option.label}
            </Text>
          </Box>
        ))}
      </VStack>

      {/* Campo otro */}
      {value === 'otro' && (
        <Box mt={5}>
          <input
            value={otroValue || ''}
            onChange={(e) => onOtroChange && onOtroChange(e.target.value)}
            placeholder={otroPlaceholder || 'Especifica aquí...'}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.2)',
              color: '#F7F7F5',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '14px',
              fontWeight: '300',
              padding: '8px 0',
              outline: 'none',
            }}
          />
        </Box>
      )}

      {error && (
        <Text position="absolute" bottom="0" fontFamily="body" fontSize="10px" color="red.300">
          {error}
        </Text>
      )}
    </Box>
  )
}

export default function ProformaForm() {
  const { currentStep, formData, updateField, errors, onNext, onBack, onSubmit, status } = useProformaForm()

  if (status === 'success') {
    return (
      <VStack align="flex-start" spacing={6} py={12}>
        <Text fontFamily="heading" fontSize={{ base: '3xl', md: '5xl' }} fontWeight="300" color="white" lineHeight="1.2">
          Gracias por confiar en nuestro proceso.
        </Text>
        <Box width="40px" height="1px" bg="whiteAlpha.300" />
        <Text fontFamily="body" fontSize="sm" fontWeight="300" color="whiteAlpha.600" letterSpacing="0.05em" lineHeight="2">
          Analizaremos tu caso y nos pondremos en contacto para una primera conversación.
        </Text>
      </VStack>
    )
  }

  return (
    <Box>

      {status === 'error' && (
        <Box
          mb={6}
          p={4}
          border="1px solid rgba(255,100,100,0.3)"
          bg="rgba(255,100,100,0.05)"
        >
          <Text fontFamily="body" fontSize="xs" color="red.300" letterSpacing="0.05em">
            Hubo un error al enviar. Por favor intenta nuevamente o escríbenos directamente.
          </Text>
        </Box>
      )}

      {/* Indicador de pasos */}
      <HStack spacing={2} mb={12}>
        {steps.map((step, i) => (
          <Box key={i} display="flex" alignItems="center" gap={2}>
            <Box
              width="24px"
              height="1px"
              bg={i <= currentStep ? 'white' : 'whiteAlpha.200'}
              transition="background 0.4s ease"
            />
            {i === currentStep && (
              <Text fontFamily="body" fontSize="9px" letterSpacing="0.2em" textTransform="uppercase" color="whiteAlpha.500">
                {step}
              </Text>
            )}
          </Box>
        ))}
      </HStack>

      {/* Título */}
      <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="300" color="white" mb={10} lineHeight="1.2">
        {steps[currentStep]}
      </Text>

      {/* ── PASO 1 ── */}
      {currentStep === 0 && (
        <VStack spacing={2} align="stretch">
          <Field label="Nombre completo" error={errors.nombre}>
            <Input {...inputStyle} placeholder="Tu nombre" value={formData.nombre || ''} onChange={(e) => updateField('nombre', e.target.value)} />
          </Field>
          <Field label="Email" error={errors.email}>
            <Input {...inputStyle} placeholder="correo@ejemplo.com" type="email" value={formData.email || ''} onChange={(e) => updateField('email', e.target.value)} />
          </Field>
          <Field label="WhatsApp (con código de país)" error={errors.whatsapp}>
            <Input {...inputStyle} placeholder="+593 99 000 0000" value={formData.whatsapp || ''} onChange={(e) => updateField('whatsapp', e.target.value)} />
          </Field>
          <Field label="País de residencia" error={errors.pais}>
            <Box position="relative">
              <Box
                as="select"
                width="100%"
                bg="#0A0A0A"
                border="none"
                borderBottom="1px solid rgba(255,255,255,0.2)"
                borderRadius="0"
                color="#F7F7F5"
                fontFamily="Montserrat, sans-serif"
                fontSize="14px"
                fontWeight="300"
                px="0"
                py="12px"
                outline="none"
                appearance="none"
                cursor="pointer"
                value={formData.pais || 'Ecuador'}
                onChange={(e) => updateField('pais', e.target.value)}
                sx={{ '& option': { background: '#0A0A0A', color: '#F7F7F5' } }}
              >
                {paises.map((p) => (
                  <option key={p} value={p} style={{ background: '#0A0A0A', color: '#F7F7F5' }}>{p}</option>
                ))}
              </Box>
              <Box position="absolute" right="0" top="50%" transform="translateY(-50%)" pointerEvents="none" color="whiteAlpha.500" fontSize="10px">↓</Box>
            </Box>
          </Field>
          <Field label="Ciudad" error={errors.ciudad}>
            <Input {...inputStyle} placeholder="Tu ciudad" value={formData.ciudad || ''} onChange={(e) => updateField('ciudad', e.target.value)} />
          </Field>
        </VStack>
      )}

      {/* ── PASO 2 ── */}
      {currentStep === 1 && (
        <VStack spacing={8} align="stretch">
          <RadioGroup
            label="¿Qué tipo de propiedad tienes?"
            options={tipoPropiedadOpciones}
            value={formData.tipoPropiedad}
            onChange={(val) => updateField('tipoPropiedad', val)}
            otroValue={formData.tipoPropiedadOtro}
            onOtroChange={(val) => updateField('tipoPropiedadOtro', val)}
            otroPlaceholder="Describe tu propiedad..."
            error={errors.tipoPropiedad}
          />
          <RadioGroup
            label="¿En qué estado se encuentra actualmente?"
            options={estadoPropiedadOpciones}
            value={formData.estadoPropiedad}
            onChange={(val) => updateField('estadoPropiedad', val)}
            otroValue={formData.estadoPropiedadOtro}
            onOtroChange={(val) => updateField('estadoPropiedadOtro', val)}
            otroPlaceholder="Describe el estado..."
            error={errors.estadoPropiedad}
          />
        </VStack>
      )}

      {/* ── PASO 3 ── */}
      {currentStep === 2 && (
        <VStack spacing={8} align="stretch">
          <RadioGroup
            label="¿Qué te gustaría hacer con tu propiedad?"
            options={objetivoOpciones}
            value={formData.objetivo}
            onChange={(val) => updateField('objetivo', val)}
            otroValue={formData.objetivoOtro}
            onOtroChange={(val) => updateField('objetivoOtro', val)}
            otroPlaceholder="Describe tu objetivo..."
            error={errors.objetivo}
          />
          <Field label="Cuéntanos brevemente qué tienes en mente" error={errors.descripcion}>
            <Textarea
              {...inputStyle}
              placeholder="Describe tu visión, ideas o cualquier detalle importante..."
              resize="none"
              rows={4}
              value={formData.descripcion || ''}
              onChange={(e) => updateField('descripcion', e.target.value)}
            />
          </Field>
        </VStack>
      )}

      {/* ── PASO 4 ── */}
      {currentStep === 3 && (
        <VStack spacing={8} align="stretch">
          <RadioGroup
            label="¿Cuentas con normativa urbana o documentación del predio?"
            sublabel="(No es obligatorio, te ayudamos a resolverlo si no la tienes)"
            options={normativaOpciones}
            value={formData.normativa}
            onChange={(val) => updateField('normativa', val)}
            otroValue={formData.normativaOtro}
            onOtroChange={(val) => updateField('normativaOtro', val)}
            otroPlaceholder="Especifica..."
            error={errors.normativa}
          />
          <RadioGroup
            label="¿Cómo te gustaría que te acompañemos?"
            options={acompanamientoOpciones}
            value={formData.acompanamiento}
            onChange={(val) => updateField('acompanamiento', val)}
            error={errors.acompanamiento}
          />
        </VStack>
      )}

      {/* ── PASO 5 ── */}
      {currentStep === 4 && (
        <VStack align="flex-start" spacing={8}>
          <VStack align="flex-start" spacing={4}>
            <Text fontFamily="body" fontSize="sm" fontWeight="300" lineHeight="2" color="whiteAlpha.600">
              Al enviar este formulario podremos analizar tu caso y contactarte para una primera conversación, donde te explicaremos cómo podríamos ayudarte desde Spazio.
            </Text>
            <Box width="40px" height="1px" bg="whiteAlpha.200" />
            <Text fontFamily="heading" fontSize={{ base: 'xl', md: '2xl' }} fontWeight="300" color="white" lineHeight="1.4">
              Diseñamos con criterio, estrategia y sensibilidad.
            </Text>
            <Text fontFamily="body" fontSize="sm" fontWeight="300" color="whiteAlpha.500" letterSpacing="0.05em">
              Gracias por confiar en nuestro proceso.
            </Text>
          </VStack>
          <Box
            as="a"
            href="https://calendar.app.google/XcfA7BFsBnxKnBGPA"
            target="_blank"
            rel="noopener noreferrer"
            display="flex"
            alignItems="center"
            gap={4}
            opacity={0.6}
            _hover={{ opacity: 1 }}
            transition="opacity 0.3s ease"
            cursor="pointer"
          >
            <Box width="30px" height="1px" bg="white" />
            <Text fontFamily="body" fontSize="10px" letterSpacing="0.25em" textTransform="uppercase" color="white">
              Agendar una cita
            </Text>
          </Box>
        </VStack>
      )}

      {/* Navegación */}
      <HStack justify="space-between" mt={12} align="center">
        {currentStep > 0 ? (
          <Box
            onClick={onBack}
            cursor="pointer"
            display="flex"
            alignItems="center"
            gap={3}
            opacity={0.4}
            _hover={{ opacity: 0.8 }}
            transition="opacity 0.3s ease"
          >
            <Box width="24px" height="1px" bg="white" />
            <Text fontFamily="body" fontSize="9px" letterSpacing="0.25em" textTransform="uppercase" color="white">
              Anterior
            </Text>
          </Box>
        ) : (
          <Box />
        )}

        <Box
          as="button"
          onClick={currentStep < 4 ? onNext : onSubmit}
          bg="transparent"
          border="1px solid"
          borderColor="whiteAlpha.300"
          color="white"
          borderRadius="0"
          letterSpacing="0.25em"
          fontSize="10px"
          textTransform="uppercase"
          px={8}
          py={4}
          fontFamily="body"
          fontWeight="400"
          cursor="pointer"
          opacity={status === 'loading' ? 0.5 : 1}
          _hover={{ bg: 'white', color: '#0A0A0A', borderColor: 'white' }}
          transition="all 0.4s ease"
        >
          {status === 'loading' ? 'Enviando...' : currentStep < 4 ? 'Siguiente →' : 'Enviar proforma'}
        </Box>
      </HStack>
    </Box>
  )
}