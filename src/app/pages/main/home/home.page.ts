import { Component, inject, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FortniteShopApiService } from 'src/app/services/fortnite-shop-api.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  newsItems: any[] = [];

  constructor(private fortniteShopApiService: FortniteShopApiService) { }

  ngOnInit() {
    this.fortniteShopApiService.getNews().subscribe((data: any) =>{
      this.newsItems = data.data.br.motds;
      console.log(this.newsItems);
    })
  }

  user(): User {
    return this.utilsSvc.getFromLocalStorage('user');
  }

  // .- Cerrar sesión.

  signOut() {
    this.firebaseSvc.signOut();
  }

}
