import { AncestralPage } from './../../ancestrais/page/ancestralPage';
import { InfopartidoPage } from './../infopartido/infopartido';
import { PartidoProvider } from './../../providers/partido/partido';
import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { Partido } from '../../models/partido';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends AncestralPage {
  partidos: Partido[];

  constructor(
    public navCtrl: NavController,
    public partidoService: PartidoProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    super(loadingCtrl, alertCtrl);
  }

  ionViewDidLoad() {
    let loading: Loading = this.showLoading("Buscando partidos...");
    this.partidoService.getAll().subscribe(r=>{
      loading.dismiss();
      this.partidos = r["dados"];
    }, err=>{
      loading.dismiss();
      this.navCtrl.pop();
      this.showAlert("Ocorreu um erro, tente novamente!");
    })
  }

  infoPartido(partido: Partido){
    this.navCtrl.push(InfopartidoPage, {"partido": partido});
  } 

}
