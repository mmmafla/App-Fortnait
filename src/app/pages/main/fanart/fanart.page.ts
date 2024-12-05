import { Component, inject, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { EmailService } from 'src/app/services/email.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';

@Component({
  selector: 'app-fanart',
  templateUrl: './fanart.page.html',
  styleUrls: ['./fanart.page.scss'],
})

export class FanartPage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  name = '';
  email = '';
  message = '';

  products:Product[]=[];

  constructor(private emailService: EmailService, private toastController: ToastController) { }

  ngOnInit() {
  }

  user():User{
    return this.utilsSvc.getFromLocalStorage('user');
  }
  ionViewWillEnter() {
    this.getProducts();
  }

  doRefresh(event) {
  
    setTimeout(() => {
      this.getProducts();
      event.target.complete();
    }, 1000);
  }

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

  getProducts(){
    let path=`users/${this.user().uid}/products`;

    let sub=this.firebaseSvc.getCollectionData(path).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.products=res;
        sub.unsubscribe();
      }
    })
  }


  //cerrrar sesion

  signOut(){
    this.firebaseSvc.signOut();
  }

  async addUpdateProduct(product?:Product){

    let success=await this.utilsSvc.presentModal({
      component: AddUpdateProductComponent,
      cssClass:'add-update-modal',
      componentProps:{product}
    })
    if(success) this.getProducts();
  }

async confirmDeleteProduct(product:Product) {
this.utilsSvc.presentAlert({
    header: '¡Eliminar foto!',
    message: '¿Quieres eliminar el dato?',
    mode:'ios',
    buttons: [
      {
        text: 'Cancelar',

      }, {
        text: 'Si, eliminar',
        handler: () => {
          this.deleteProduct(product)
        }
      }
    ]
  });

}



  async deleteProduct(product:Product) {
    

    let path=`users/${this.user().uid}/products/${product.id}`

    const loading = await this.utilsSvc.loading();
    await loading.present();

    let imagePath= await this.firebaseSvc.getFilePath(product.image);

    await this.firebaseSvc.deleteFile(imagePath)

    this.firebaseSvc.deleteDocument(path).then(async res => {

      this.products=this.products.filter(p=>p.id!==product.id);

    this.utilsSvc.presentToast({
        message:'Dato Eliminado Exitosamente',
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

}

