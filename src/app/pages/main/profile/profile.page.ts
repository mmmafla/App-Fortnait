import { Component, inject, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {
  }

  user(): User {
    return this.utilsSvc.getFromLocalStorage('user');
  }

  // Tomar o selecionar una imagen del celular.

  /* async takeImage(): Promise<void> {

    try {

      let user = this.user();

      const result = await this.utilsSvc.takePicture('Imagen de Perfil');
      console.log('Resultado de takePicture:', result); // Verifica la estructura del objeto resultante
      const dataUrl = result?.dataUrl;

      let imagePath = `${this.user.uid}/${Data.now()}`;
      let imageUrl = await this.firebaseSvc.uploadImage;

    } catch (error) {

      console.error('Error al cargar la foto:', error);

    }
  } */

}
