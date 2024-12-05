import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FortniteShopApiService } from 'src/app/services/fortnite-shop-api.service';
import { TournamentDetailsComponent } from 'src/app/shared/components/tournament-details/tournament-details.component';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.page.html',
  styleUrls: ['./tournaments.page.scss'],
})
export class TournamentsPage implements OnInit {

  tournaments: any[] = [];
  constructor(private fortniteShopApiService: FortniteShopApiService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.fortniteShopApiService.getTorneos().subscribe((data:any)=>{
      this.tournaments = data.events;
      console.log(this.tournaments);
    })
  
  }
  getGradient(tournament: any) {
    const leftColor = `#${tournament.renderData.background_left_color}`;
    const rightColor = `#${tournament.renderData.background_right_color}`;
    return `linear-gradient(to right, ${leftColor}, ${rightColor})`;
  }
   // Abrir modal con detalles del torneo
   async openTournamentDetails(tournament: any) {
    const modal = await this.modalCtrl.create({
      component: TournamentDetailsComponent,
      componentProps: { tournament },
    });
    await modal.present();
  }

}
