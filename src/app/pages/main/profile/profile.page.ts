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
  async takeImage(){

    let user =this.user();
    let path=`users/${user.uid}`


    const dataUrl= (await this.utilsSvc.takePicture('Imagen del perfil')).dataUrl;

    const loading = await this.utilsSvc.loading();
    await loading.present();
    let imagePath= `${user.uid}/profile}`;
    user.image =await this.firebaseSvc.uploadImage(imagePath,dataUrl);
    this.firebaseSvc.updateDocument(path,{image:user.image}).then(async res => {

this.utilsSvc.saveInLocalStorage('user',user)

    this.utilsSvc.presentToast({
        message:'imagen Actualizada Exitosamente',
        duration:1500,
        color:'success',
        position:'middle',
        icon:'checkmark-circle-outline'
      })

    }).catch(error=>{
      console.log(error);



  }).finally(()=>{
    loading.dismiss();

  })
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
