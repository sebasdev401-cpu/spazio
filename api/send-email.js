import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {

  console.log(process.env.RESEND_API_KEY);
  console.log(process.env.RESEND_TO_EMAIL);

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

  const htmlContent = `
    <div style="font-family: 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #F7F7F5; padding: 40px;">
      
      <h1 style="font-size: 28px; font-weight: 300; letter-spacing: 0.3em; text-transform: uppercase; color: #F7F7F5; margin-bottom: 40px; border-bottom: 1px solid rgba(247,247,245,0.1); padding-bottom: 20px;">
        Nueva Proforma — Spazio
      </h1>

      <div style="margin-bottom: 32px;">
        <p style="font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(247,247,245,0.4); margin-bottom: 16px;">
          — Datos de Contacto
        </p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: rgba(247,247,245,0.5); font-size: 12px; width: 40%;">Nombre</td>
            <td style="padding: 8px 0; color: #F7F7F5; font-size: 12px;">${nombre}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: rgba(247,247,245,0.5); font-size: 12px;">Email</td>
            <td style="padding: 8px 0; color: #F7F7F5; font-size: 12px;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: rgba(247,247,245,0.5); font-size: 12px;">WhatsApp</td>
            <td style="padding: 8px 0; color: #F7F7F5; font-size: 12px;">${whatsapp}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: rgba(247,247,245,0.5); font-size: 12px;">País</td>
            <td style="padding: 8px 0; color: #F7F7F5; font-size: 12px;">${pais}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: rgba(247,247,245,0.5); font-size: 12px;">Ciudad</td>
            <td style="padding: 8px 0; color: #F7F7F5; font-size: 12px;">${ciudad}</td>
          </tr>
        </table>
      </div>

      <div style="margin-bottom: 32px;">
        <p style="font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(247,247,245,0.4); margin-bottom: 16px;">
          — Sobre la Propiedad
        </p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: rgba(247,247,245,0.5); font-size: 12px; width: 40%;">Tipo</td>
            <td style="padding: 8px 0; color: #F7F7F5; font-size: 12px;">${tipoPropiedad === 'otro' ? tipoPropiedadOtro : tipoPropiedad}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: rgba(247,247,245,0.5); font-size: 12px;">Estado</td>
            <td style="padding: 8px 0; color: #F7F7F5; font-size: 12px;">${estadoPropiedad === 'otro' ? estadoPropiedadOtro : estadoPropiedad}</td>
          </tr>
        </table>
      </div>

      <div style="margin-bottom: 32px;">
        <p style="font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(247,247,245,0.4); margin-bottom: 16px;">
          — Objetivo
        </p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: rgba(247,247,245,0.5); font-size: 12px; width: 40%;">Objetivo</td>
            <td style="padding: 8px 0; color: #F7F7F5; font-size: 12px;">${objetivo === 'otro' ? objetivoOtro : objetivo}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: rgba(247,247,245,0.5); font-size: 12px; vertical-align: top;">Descripción</td>
            <td style="padding: 8px 0; color: #F7F7F5; font-size: 12px; line-height: 1.6;">${descripcion}</td>
          </tr>
        </table>
      </div>

      <div style="margin-bottom: 32px;">
        <p style="font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(247,247,245,0.4); margin-bottom: 16px;">
          — Información Técnica
        </p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: rgba(247,247,245,0.5); font-size: 12px; width: 40%;">Normativa</td>
            <td style="padding: 8px 0; color: #F7F7F5; font-size: 12px;">${normativa === 'otro' ? normativaOtro : normativa}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: rgba(247,247,245,0.5); font-size: 12px;">Acompañamiento</td>
            <td style="padding: 8px 0; color: #F7F7F5; font-size: 12px;">${acompanamiento}</td>
          </tr>
        </table>
      </div>

      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(247,247,245,0.1); text-align: center;">
        <p style="font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(247,247,245,0.3);">
          Spazio — Arquitectura, Interiorismo y Construcción
        </p>
      </div>
    </div>
  `

  try {
    const { data, error } = await resend.emails.send({
      from: 'Spazio <onboarding@resend.dev>',
      to: [process.env.RESEND_TO_EMAIL],
      subject: `Nueva Proforma — ${nombre}`,
      html: htmlContent,
      reply_to: email,
    })

    if (error) {
      return res.status(400).json({ error })
    }

    return res.status(200).json({ success: true, data })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}