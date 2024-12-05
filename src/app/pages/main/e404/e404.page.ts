import { Component, inject, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-e404',
  templateUrl: './e404.page.html',
  styleUrls: ['./e404.page.scss'],
})
export class E404Page implements OnInit {

  utilsSvc = inject(UtilsService);

  ngOnInit() {
  }

  goBack() {
    this.utilsSvc.routerLink('/main/home');
  }

}
