import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  pages = [
    { title: 'Perfil', url: '/main/profile', icon: 'person'},
    { title: 'Noticias', url: '/main/home', icon: 'newspaper'},
    { title: 'Tienda', url: '/main/shop', icon: 'cart'},
    { title: 'Torneos', url: '/main/tournaments', icon: 'trophy'},
    { title: 'Fan-Art', url: '/main/fanart', icon: 'brush'},
    { title: 'Error 404', url: '/main/e404', icon: 'bug'},
  ]

  router = inject(Router);
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  currentPath: string = '';

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if(event?.url) this.currentPath = event.url;
    })
  }

  user(): User {
    return this.utilsSvc.getFromLocalStorage('user');
  }

  signOut() {
    this.firebaseSvc.signOut();
  }

}
