import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { EmailService } from 'src/app/services/email.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
})
export class CommunityPage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  constructor(private emailService: EmailService, private toastController: ToastController) { }

  ngOnInit() {
  }

  name = '';
  email = '';
  message = '';

  async sendEmail() {
    const formData = {
      name: this.name,
      email: this.email,
      message: this.message,
    };

    try {
      const response = await this.emailService.sendEmail(formData);
      const toast = await this.toastController.create({
        message: 'Correo enviado con éxito.',
        duration: 3000,
        color: 'success',
      });
      await toast.present();
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Error al enviar el correo. Intenta de nuevo.',
        duration: 3000,
        color: 'danger',
      });
      await toast.present();
    }

  }

}
