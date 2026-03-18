import { z } from 'zod'

export const step1Schema = z.object({
  nombre: z.string().min(2, 'Ingresa tu nombre completo'),
  email: z.string().email('Ingresa un email válido'),
  whatsapp: z.string().min(7, 'Ingresa tu número de WhatsApp'),
  pais: z.string().min(1, 'Selecciona tu país'),
  ciudad: z.string().min(2, 'Ingresa tu ciudad'),
})

export const step2Schema = z.object({
  tipoPropiedad: z.string().min(1, 'Selecciona un tipo de propiedad'),
  tipoPropiedadOtro: z.string().optional(),
  estadoPropiedad: z.string().min(1, 'Selecciona el estado de tu propiedad'),
  estadoPropiedadOtro: z.string().optional(),
})

export const step3Schema = z.object({
  objetivo: z.string().min(1, 'Selecciona tu objetivo'),
  objetivoOtro: z.string().optional(),
  descripcion: z.string().min(10, 'Cuéntanos un poco más'),
})

export const step4Schema = z.object({
  normativa: z.string().min(1, 'Selecciona una opción'),
  normativaOtro: z.string().optional(),
  acompanamiento: z.string().min(1, 'Selecciona una opción'),
})