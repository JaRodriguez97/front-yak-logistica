// HTTP contract for the contact form
// This contract is ready for future backend integration.
// When the backend is available, update only CONTACT_API.endpoint.

export interface ContactRequest {
  fullName: string;
  company: string;
  phone: string;
  email: string;
  interest: string;
  city: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  referenceId?: string;
}

// EmailJS Configuration
export const EMAILJS_CONFIG = {
  serviceId: 'service_yr72kvp', // Reemplazar con el Service ID de EmailJS
  templateId: 'template_yak_logistica', // Reemplazar con el Template ID de EmailJS
  publicKey: 'YOUR_PUBLIC_KEY_HERE', // Reemplazar con el Public Key de EmailJS
  toEmail: 'correo@yaklogistica.com',
} as const;

// WhatsApp fallback config
export const WHATSAPP_FALLBACK = {
  number: '573104615185',
  buildMessage: (data: ContactRequest): string =>
    `Hola YAK, soy ${data.fullName} de ${data.company} (Ciudad: ${data.city}). ` +
    `Me interesa el servicio: ${data.interest}. ` +
    `Pueden contactarme al ${data.phone} o a ${data.email}. ` +
    `Mensaje: ${data.message}`,
} as const;
