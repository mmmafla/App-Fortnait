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
  obj: any[] = [];
  grouped: { [key: string]: any[] } = {};

  constructor(private fortniteShopApiService: FortniteShopApiService) { }

  getBackgroundImage(colors: { color1?: string, color2?: string, color3?: string }): string {
    if (colors.color1 && colors.color2 && colors.color3) {
      return `linear-gradient(to bottom, #${colors.color1}, #${colors.color2}, #${colors.color3})`;
    } else if (colors.color1 && colors.color3) {
      return `linear-gradient(to bottom, #${colors.color1}, #${colors.color3})`;
    } else if (colors.color1) {
      return `#${colors.color1}`;
    } else if (colors.color3) {
      return `#${colors.color3}`;
    } else {
      return '#FFFFFF';  // Color por defecto si no hay colores
    }
  }

  ngOnInit() {

    this.fortniteShopApiService.getShopItems().subscribe((data: any) =>{
      this.shopItems = data.data.entries;
      console.log(this.shopItems);
      this.obj = this.shopItems.filter(item => item.layout.name !=='Jam Tracks');
      console.log(this.obj);
      
      this.obj.forEach(item => {
        const categoryName = item.layout.name;
        if (!this.grouped[categoryName]) {
          this.grouped[categoryName] = []; // Inicializa el arreglo si no existe
        }
        this.grouped[categoryName].push(item); // Agrega el item al arreglo correspondiente
        
      });


    });

  }

}
