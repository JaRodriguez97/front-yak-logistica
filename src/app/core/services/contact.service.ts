import { Injectable } from '@angular/core';
import { Observable, from, catchError, throwError, map } from 'rxjs';
import emailjs from '@emailjs/browser';
import {
  ContactRequest,
  ContactResponse,
  EMAILJS_CONFIG,
  WHATSAPP_FALLBACK,
} from '../models/contact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  /**
   * Sends the contact form data via EmailJS.
   * If the service is not configured or fails, it falls back to WhatsApp.
   */
  send(data: ContactRequest): Observable<ContactResponse> {
    const templateParams = {
      from_name: data.fullName,
      from_email: data.email,
      company: data.company,
      phone: data.phone,
      city: data.city,
      interest: data.interest,
      message: data.message,
      to_email: EMAILJS_CONFIG.toEmail,
    };

    return from(
      emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      )
    ).pipe(
      map((res) => {
        return {
          success: res.status === 200,
          message: 'Mensaje enviado exitosamente vía EmailJS',
          referenceId: res.text,
        } as ContactResponse;
      }),
      catchError((err) => {
        // Fallback to WhatsApp on error
        this.openWhatsApp(data);
        return throwError(() => err);
      })
    );
  }

  /** Opens WhatsApp with form data pre-filled as the message */
  openWhatsApp(data: ContactRequest): void {
    if (typeof window === 'undefined') return; // SSR guard
    const message = WHATSAPP_FALLBACK.buildMessage(data);
    const url = `https://wa.me/${WHATSAPP_FALLBACK.number}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
