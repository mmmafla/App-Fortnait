import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private userID = 'Qj7X0D59r8GW3iqVR'; // ID de usuario de EmailJS
  private serviceID = 'service_rtsqd3e'; // ID del servicio
  private templateID = 'template_5wwo7yk'; // ID de la plantilla

  constructor() {
    emailjs.init(this.userID); // Inicializa EmailJS
  }

  sendEmail(formData: { name: string; email: string; message: string }): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.serviceID, this.templateID, formData);
  }
}
