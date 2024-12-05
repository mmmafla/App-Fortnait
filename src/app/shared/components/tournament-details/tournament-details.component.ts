import { Component, OnInit,Input  } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tournament-details',
  templateUrl: './tournament-details.component.html',
  styleUrls: ['./tournament-details.component.scss'],
})
export class TournamentDetailsComponent  implements OnInit {
  @Input() tournament: any;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}
  dismiss() {
    this.modalCtrl.dismiss();
  }

}

