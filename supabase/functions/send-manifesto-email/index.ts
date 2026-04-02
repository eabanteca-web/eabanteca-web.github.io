import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { PDFDocument, rgb } from 'https://esm.sh/pdf-lib@1.17.1'

const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY') || ''
const SUPABASE_URL = 'https://wozhsunyhxvankwvztwc.supabase.co'
const SUPABASE_SERVICE_KEY = Deno.env.get('SERVICE_ROLE_KEY') || ''

serve(async (req) => {
  try {
    const { record, type } = await req.json()
    
    console.log('Processing manifesto signature:', record.id)
    
    // Generate PDF Certificate
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([600, 400])
    const { width, height } = page.getSize()
    
    // Title
    page.drawText('eAbante Movement', {
      x: 50,
      y: height - 50,
      size: 28,
      color: rgb(0.13, 0.77, 0.37),
    })
    
    // Subtitle
    page.drawText('Manifesto Signature Certificate', {
      x: 50,
      y: height - 90,
      size: 18,
      color: rgb(0.4, 0.4, 0.4),
    })
    
    // Divider line
    page.drawLine({
      start: { x: 50, y: height - 110 },
      end: { x: 550, y: height - 110 },
      thickness: 2,
      color: rgb(0.13, 0.77, 0.37),
    })
    
    // Signature details
    page.drawText(`Signature Number: #${record.signature_number}`, {
      x: 50,
      y: height - 150,
      size: 14,
      color: rgb(0.2, 0.2, 0.2),
    })
    
    page.drawText(`Full Name: ${record.full_name}`, {
      x: 50,
      y: height - 180,
      size: 14,
      color: rgb(0.2, 0.2, 0.2),
    })
    
    page.drawText(`Purok: ${record.purok}`, {
      x: 50,
      y: height - 210,
      size: 14,
      color: rgb(0.2, 0.2, 0.2),
    })
    
    page.drawText(`Address: ${record.address_block_lot}`, {
      x: 50,
      y: height - 240,
      size: 14,
      color: rgb(0.2, 0.2, 0.2),
    })
    
    page.drawText(`Date Signed: ${new Date(record.created_at).toLocaleDateString('en-PH', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}`, {
      x: 50,
      y: height - 270,
      size: 14,
      color: rgb(0.2, 0.2, 0.2),
    })
    
    // Thank you message
    page.drawText('Maraming Salamat!', {
      x: 50,
      y: height - 320,
      size: 20,
      color: rgb(0.13, 0.77, 0.37),
    })
    
    page.drawText('Thank you for signing the eAbante Manifesto.', {
      x: 50,
      y: height - 350,
      size: 14,
      color: rgb(0.3, 0.3, 0.3),
    })
    
    page.drawText('Your signature helps build a community of transparency,', {
      x: 50,
      y: height - 375,
      size: 12,
      color: rgb(0.5, 0.5, 0.5),
    })
    
    page.drawText('accountability, and fair governance.', {
      x: 50,
      y: height - 395,
      size: 12,
      color: rgb(0.5, 0.5, 0.5),
    })
    
    // Serialize PDF
    const pdfBytes = await pdfDoc.save()
    const pdfBase64 = btoa(String.fromCharCode(...new Uint8Array(pdfBytes)))
    
    // Generate confirmation link
    const confirmUrl = `https://eabanteca-web.github.io/confirm.html?token=${record.confirmation_token}`
    
    // Send email via Brevo
    const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: 'eAbante Movement',
          email: 'eabanteca@gmail.com',
        },
        to: [
          { email: record.email, name: record.full_name },
        ],
        subject: 'Your Manifesto Signature Certificate - eAbante Movement',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Maraming Salamat!</h1>
              <p style="color: #f0fdf4; margin: 10px 0 0 0; font-size: 14px;">Your signature has been recorded</p>
            </div>
            
            <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb;">
              <p>Dear <strong style="color: #22c55e;">${record.full_name}</strong>,</p>
              
              <p>Thank you for signing the <strong>eAbante Movement Manifesto</strong>! Your signature number is:</p>
              
              <div style="background: white; padding: 20px; border-left: 4px solid #22c55e; margin: 20px 0; border-radius: 5px;">
                <p style="margin: 5px 0; font-size: 14px;"><strong>Signature Number:</strong> #${record.signature_number}</p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Purok:</strong> ${record.purok}</p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Date:</strong> ${new Date(record.created_at).toLocaleDateString('en-PH')}</p>
              </div>
              
              <p>Your official PDF certificate is attached to this email. Please keep it for your records.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${confirmUrl}" 
                   style="background: #22c55e; color: white; padding: 14px 40px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 16px;">
                  ✓ Confirm Your Signature
                </a>
              </div>
              
              <p style="font-size: 13px; color: #666;">
                <strong>Why confirm?</strong> Clicking the confirmation link above verifies your email and activates your signature in our system.
              </p>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
              
              <p style="font-size: 12px; color: #999;">
                If you did not sign this manifesto, please ignore this email or contact us at eabanteca@gmail.com.
              </p>
            </div>
            
            <div style="background: #f3f4f6; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; color: #666;">
              <p style="margin: 0;">eAbante Movement - Good Governance Starts at Home</p>
              <p style="margin: 5px 0 0 0;">One purok at a time.</p>
            </div>
          </div>
        `,
        attachment: [
          {
            name: `manifesto-certificate-${record.signature_number}.pdf`,
            content: pdfBase64,
          },
        ],
      }),
    })
    
    if (!emailResponse.ok) {
      const errorData = await emailResponse.json()
      console.error('Brevo API error:', errorData)
      throw new Error(`Failed to send email: ${JSON.stringify(errorData)}`)
    }

    console.log('Email sent successfully to:', record.email)

    // Update status in database
    if (SUPABASE_SERVICE_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
      await supabase
        .from('manifesto_signatures')
        .update({ status: 'email_sent' })
        .eq('id', record.id)
    }

    return new Response(JSON.stringify({
      success: true, 
      email_sent: true,
      signature_number: record.signature_number 
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Edge Function Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
