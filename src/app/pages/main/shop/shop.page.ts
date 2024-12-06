import { Component, OnInit } from '@angular/core';
import { FortniteShopApiService } from 'src/app/services/fortnite-shop-api.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})

export class ShopPage implements OnInit {

  nameItem!: string;
  number!: number;

  shopItems: any[]=[]; 
  tienda: any[] = [];
  grouped: { [key: string]: any[] } = {};

  constructor(private fortniteShopApiService: FortniteShopApiService) { }

  ngOnInit() {

    this.fortniteShopApiService.getShopItems().subscribe((data: any) =>{
      this.shopItems = data.shop;
      console.log(this.shopItems);
      this.tienda = this.shopItems.filter(item => item.section.name !=='Jam Tracks');
      console.log(this.tienda);
      
      this.tienda.forEach(item => {
        const categoryName = item.section.name;
      
        // Si la categoría no existe en 'grouped', inicializa el arreglo
        if (!this.grouped[categoryName]) {
          this.grouped[categoryName] = [];
        }
      
        // Agrega el item al arreglo correspondiente de la categoría
        this.grouped[categoryName].push(item);
      });
      
      // Ordena cada categoría de manera que los 'bundles' vayan primero y luego por 'priority'
      Object.keys(this.grouped).forEach(category => {
        this.grouped[category].sort((a, b) => {
          // Coloca los 'bundles' primero (si mainType es 'bundle')
          if (a.mainType === 'bundle' && b.mainType !== 'bundle') return -1; // a es bundle, b no lo es
          if (a.mainType !== 'bundle' && b.mainType === 'bundle') return 1;  // b es bundle, a no lo es
      
          // Si ambos son bundles o no lo son, se ordena por 'priority' de forma descendente
          return b.priority - a.priority;
        });
      });
      


    });

  }
}
