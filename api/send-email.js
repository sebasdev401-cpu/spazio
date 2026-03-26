import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const {
    nombre,
    email,
    whatsapp,
    pais,
    ciudad,
    tipoPropiedad,
    tipoPropiedadOtro,
    estadoPropiedad,
    estadoPropiedadOtro,
    objetivo,
    objetivoOtro,
    descripcion,
    normativa,
    normativaOtro,
    acompanamiento,
  } = req.body

  // ── Email para SPAZIO — resumen interno completo
  const htmlSpazio = `
    <div style="font-family: 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #F7F7F5; padding: 40px;">
      <h1 style="font-size: 24px; font-weight: 300; letter-spacing: 0.3em; text-transform: uppercase; color: #F7F7F5; margin-bottom: 40px; border-bottom: 1px solid rgba(247,247,245,0.1); padding-bottom: 20px;">
        Nueva Proforma — Spazio
      </h1>

      <div style="margin-bottom: 32px;">
        <p style="font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(247,247,245,0.4); margin-bottom: 16px;">— Datos de Contacto</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: rgba(247,247,245,0.5); font-size: 12px; width: 40%;">Nombre</td><td style="padding: 8px 0; color: #F7F7F5; font-size: 12px;">${nombre}</td></tr>
          <tr><td style="padding: 8px 0; color: rgba(247,247,245,0.5); font-size: 12px;">Email</td><td style="padding: 8px 0; color: #F7F7F5; font-size: 12px;">${email}</td></tr>
          <tr><td style="padding: 8px 0; color: rgba(247,247,245,0.5); font-size: 12px;">WhatsApp</td><td style="padding: 8px 0; color: #F7F7F5; font-size: 12px;">${whatsapp}</td></tr>
          <tr><td style="padding: 8px 0; color: rgba(247,247,245,0.5); font-size: 12px;">País</td><td style="padding: 8px 0; color: #F7F7F5; font-size: 12px;">${pais}</td></tr>
          <tr><td style="padding: 8px 0; color: rgba(247,247,245,0.5); font-size: 12px;">Ciudad</td><td style="padding: 8px 0; color: #F7F7F5; font-size: 12px;">${ciudad}</td></tr>
        </table>
      </div>

      <div style="margin-bottom: 32px;">
        <p style="font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(247,247,245,0.4); margin-bottom: 16px;">— Sobre la Propiedad</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: rgba(247,247,245,0.5); font-size: 12px; width: 40%;">Tipo</td><td style="padding: 8px 0; color: #F7F7F5; font-size: 12px;">${tipoPropiedad === 'otro' ? tipoPropiedadOtro : tipoPropiedad}</td></tr>
          <tr><td style="padding: 8px 0; color: rgba(247,247,245,0.5); font-size: 12px;">Estado</td><td style="padding: 8px 0; color: #F7F7F5; font-size: 12px;">${estadoPropiedad === 'otro' ? estadoPropiedadOtro : estadoPropiedad}</td></tr>
        </table>
      </div>

      <div style="margin-bottom: 32px;">
        <p style="font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(247,247,245,0.4); margin-bottom: 16px;">— Objetivo</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: rgba(247,247,245,0.5); font-size: 12px; width: 40%;">Objetivo</td><td style="padding: 8px 0; color: #F7F7F5; font-size: 12px;">${objetivo === 'otro' ? objetivoOtro : objetivo}</td></tr>
          <tr><td style="padding: 8px 0; color: rgba(247,247,245,0.5); font-size: 12px; vertical-align: top;">Descripción</td><td style="padding: 8px 0; color: #F7F7F5; font-size: 12px; line-height: 1.6;">${descripcion}</td></tr>
        </table>
      </div>

      <div style="margin-bottom: 32px;">
        <p style="font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(247,247,245,0.4); margin-bottom: 16px;">— Información Técnica</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: rgba(247,247,245,0.5); font-size: 12px; width: 40%;">Normativa</td><td style="padding: 8px 0; color: #F7F7F5; font-size: 12px;">${normativa === 'otro' ? normativaOtro : normativa}</td></tr>
          <tr><td style="padding: 8px 0; color: rgba(247,247,245,0.5); font-size: 12px;">Acompañamiento</td><td style="padding: 8px 0; color: #F7F7F5; font-size: 12px;">${acompanamiento}</td></tr>
        </table>
      </div>

      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(247,247,245,0.1); text-align: center;">
        <p style="font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(247,247,245,0.3);">
          Spazio — Arquitectura, Interiorismo y Construcción
        </p>
      </div>
    </div>
  `

  // ── Email para el CLIENTE — mensaje cálido de confirmación
  const htmlCliente = `
    <div style="font-family: 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #F7F7F5; padding: 40px;">
      <h1 style="font-size: 24px; font-weight: 300; letter-spacing: 0.2em; color: #F7F7F5; margin-bottom: 32px;">
        Hola, ${nombre}.
      </h1>

      <p style="font-size: 14px; font-weight: 300; line-height: 1.8; color: rgba(247,247,245,0.8); margin-bottom: 24px;">
        Hemos recibido tu solicitud de proforma. Gracias por confiar en Spazio.
      </p>

      <p style="font-size: 14px; font-weight: 300; line-height: 1.8; color: rgba(247,247,245,0.8); margin-bottom: 32px;">
        Nuestro equipo analizará tu caso y se pondrá en contacto contigo en las próximas <strong style="color: #F7F7F5;">48 horas</strong> para una primera conversación, donde te explicaremos cómo podríamos acompañarte desde Spazio.
      </p>

      <div style="border-left: 1px solid rgba(247,247,245,0.2); padding-left: 20px; margin-bottom: 40px;">
        <p style="font-size: 12px; font-weight: 300; line-height: 1.8; color: rgba(247,247,245,0.5); font-style: italic;">
          Diseñamos con criterio, estrategia y sensibilidad.
        </p>
      </div>

      <div style="margin-bottom: 32px;">
        <p style="font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(247,247,245,0.4); margin-bottom: 16px;">
          Resumen de tu solicitud
        </p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: rgba(247,247,245,0.4); font-size: 11px; width: 40%;">Tipo de propiedad</td><td style="padding: 6px 0; color: #F7F7F5; font-size: 11px;">${tipoPropiedad === 'otro' ? tipoPropiedadOtro : tipoPropiedad}</td></tr>
          <tr><td style="padding: 6px 0; color: rgba(247,247,245,0.4); font-size: 11px;">Objetivo</td><td style="padding: 6px 0; color: #F7F7F5; font-size: 11px;">${objetivo === 'otro' ? objetivoOtro : objetivo}</td></tr>
          <tr><td style="padding: 6px 0; color: rgba(247,247,245,0.4); font-size: 11px;">Ciudad</td><td style="padding: 6px 0; color: #F7F7F5; font-size: 11px;">${ciudad}, ${pais}</td></tr>
        </table>
      </div>

      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(247,247,245,0.1);">
        <p style="font-size: 11px; color: rgba(247,247,245,0.5); margin-bottom: 8px;">
          Si tienes alguna pregunta puedes escribirnos a
          <a href="mailto:info@spazioarquitectura.com" style="color: #F7F7F5;">info@spazioarquitectura.com</a>
          o por WhatsApp al <a href="https://wa.me/593998821657" style="color: #F7F7F5;">+593 99 882 1657</a>
        </p>
        <p style="font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(247,247,245,0.3); margin-top: 16px;">
          Spazio — Arquitectura, Interiorismo y Construcción
        </p>
      </div>
    </div>
  `

  try {
    // Envío en paralelo — ambos emails al mismo tiempo
    const [resSpazio, resCliente] = await Promise.all([
      resend.emails.send({
        from: 'Spazio <info@spazioarquitectura.com>',
        to: [process.env.RESEND_TO_EMAIL],
        subject: `Nueva Proforma — ${nombre} (${ciudad}, ${pais})`,
        html: htmlSpazio,
        reply_to: email,
      }),
      resend.emails.send({
        from: 'Spazio <info@spazioarquitectura.com>',
        to: [email],
        subject: `Hemos recibido tu solicitud — Spazio`,
        html: htmlCliente,
        reply_to: process.env.RESEND_TO_EMAIL,
      }),
    ])

    if (resSpazio.error) return res.status(400).json({ error: resSpazio.error })
    if (resCliente.error) return res.status(400).json({ error: resCliente.error })

    return res.status(200).json({ success: true })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}