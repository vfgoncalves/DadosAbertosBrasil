import { InfopartidoPage } from './../infopartido/infopartido';
import { PartidoProvider } from './../../providers/partido/partido';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Partido } from '../../models/partido';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  partidos: Partido[];

  constructor(
    public navCtrl: NavController,
    public partidoService: PartidoProvider
  ) {

  }

  ionViewDidLoad() {
    this.partidoService.getAll().subscribe(r=>{
      this.partidos = r["dados"];
    })
  }

  infoPartido(partido: Partido){
    this.navCtrl.push(InfopartidoPage, {"partido": partido});
  }

}
