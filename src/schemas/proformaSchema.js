import { z } from 'zod'

export const proformaSchema = z.object({
  nombre: z.string().min(2, 'Ingresa tu nombre completo'),
  empresa: z.string().optional(),
  email: z.string().email('Ingresa un email válido'),
  telefono: z.string().min(7, 'Ingresa un teléfono válido'),
  tipoProyecto: z.enum(['residencial', 'comercial', 'cultural', 'otro'], {
    required_error: 'Selecciona un tipo de proyecto',
  }),
  metraje: z.string().min(1, 'Ingresa el metraje aproximado'),
  presupuesto: z.enum(['bajo', 'medio', 'alto', 'por_definir'], {
    required_error: 'Selecciona un rango de presupuesto',
  }),
  mensaje: z.string().min(10, 'Cuéntanos un poco más sobre tu proyecto'),
})