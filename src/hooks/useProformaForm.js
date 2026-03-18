import { useState } from 'react'

export function useProformaForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: null }))
  }

  const validateStep = () => {
    const newErrors = {}

    if (currentStep === 0) {
      if (!formData.nombre?.trim()) newErrors.nombre = 'Ingresa tu nombre'
      if (!formData.email?.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Ingresa un email válido'
      if (!formData.whatsapp?.trim()) newErrors.whatsapp = 'Ingresa tu WhatsApp'
      if (!formData.ciudad?.trim()) newErrors.ciudad = 'Ingresa tu ciudad'
    }

    if (currentStep === 1) {
      if (!formData.tipoPropiedad) newErrors.tipoPropiedad = 'Selecciona una opción'
      if (!formData.estadoPropiedad) newErrors.estadoPropiedad = 'Selecciona una opción'
    }

    if (currentStep === 2) {
      if (!formData.objetivo) newErrors.objetivo = 'Selecciona una opción'
      if (!formData.descripcion?.trim()) newErrors.descripcion = 'Cuéntanos un poco más'
    }

    if (currentStep === 3) {
      if (!formData.normativa) newErrors.normativa = 'Selecciona una opción'
      if (!formData.acompanamiento) newErrors.acompanamiento = 'Selecciona una opción'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onNext = () => {
    if (validateStep()) setCurrentStep((prev) => prev + 1)
  }

  const onBack = () => {
    setCurrentStep((prev) => prev - 1)
    setErrors({})
  }

  const onSubmit = async () => {
    setStatus('loading')
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log('Proforma completa:', formData)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  /*
  
  const onSubmit = async () => {
    setStatus('loading')
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) throw new Error(result.error || 'Error al enviar')

      console.log('Email enviado:', result)
      setStatus('success')
    } catch (err) {
      console.error('Error:', err)
      setStatus('error')
    }
  }
  
  */

  return {
    currentStep,
    formData,
    updateField,
    errors,
    onNext,
    onBack,
    onSubmit,
    status,
  }
}