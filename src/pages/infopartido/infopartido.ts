import { InfomembroPage } from './../infomembro/infomembro';
import { MembroPartido } from './../../models/membroPartido';
import { DetalhePartido } from './../../models/detalhepartido';
import { Partido } from './../../models/partido';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { PartidoProvider } from '../../providers/partido/partido';

/**
 * Generated class for the InfopartidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-infopartido',
  templateUrl: 'infopartido.html',
})
export class InfopartidoPage {
  partido: Partido;
  lider: MembroPartido = new MembroPartido();
  status: DetalhePartido = new DetalhePartido();
  titulo: string = "Informações Partido"
  imageUrl: string;
  membrosPartido: MembroPartido[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public partidoService: PartidoProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.partido = this.navParams.get("partido");
    this.titulo = this.partido.sigla;
    let loading: Loading = this.showLoading("Buscando informações do partido...");

    this.partidoService.get(this.partido.id).subscribe(r => {      
      this.partido = r["dados"];      
      this.lider = this.partido.status.lider;
      this.status = this.partido.status;     
      loading.dismiss();
      this.buscarMembros(this.partido.status.uriMembros, this.partido.status.idLegislatura, this.partido.sigla);      
    }, err=>{
      loading.dismiss();
      this.navCtrl.pop();
      this.showAlert("Ocorreu um erro, tente novamente!");
    })
  }

  buscarMembros(url:string, legislatura: string, sigla: string){
    let loading: Loading = this.showLoading("Buscando membros do partido...");
    this.partidoService.getMembros(url, legislatura, sigla).subscribe(r => {            
      loading.dismiss();
      this.membrosPartido = r["body"]["dados"];
    }, err=>{
      loading.dismiss();
      this.navCtrl.pop();
      this.showAlert("Ocorreu um erro, tente novamente!");
    })
  }

  infoMembro(membro){   
    this.navCtrl.push(InfomembroPage, {"membro": membro, "id": membro.id})
  }

  private showLoading(mensagem: string): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: mensagem
    });
    loading.present();
    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

}
