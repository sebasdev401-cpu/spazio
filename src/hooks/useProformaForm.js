import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { proformaSchema } from '../schemas/proformaSchema'
import { useState } from 'react'

export function useProformaForm() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(proformaSchema),
  })

  const onSubmit = async (data) => {
    setStatus('loading')
    try {
      // Por ahora simulamos el envío
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log('Proforma enviada:', data)
      setStatus('success')
      reset()
    } catch (err) {
      setStatus('error')
    }
  }

  return { register, handleSubmit, errors, onSubmit, status }
}