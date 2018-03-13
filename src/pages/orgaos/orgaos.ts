import { OrgaoMembro } from './../../models/orgaomembro';
import { PartidoProvider } from './../../providers/partido/partido';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Loading } from 'ionic-angular';

/**
 * Generated class for the OrgaosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orgaos',
  templateUrl: 'orgaos.html',
})
export class OrgaosPage {
  orgaos: OrgaoMembro[];
  titulo: string = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public partidoService: PartidoProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    let idDeputado = this.navParams.get("id");
    this.titulo = this.navParams.get("titulo");    
    let loading: Loading = this.showLoading("Buscando orgãos relacionados...");
    
    this.partidoService.getOrgaos(idDeputado).subscribe(r=>{
      this.orgaos = r["body"]["dados"];
      console.log(this.orgaos);
      
      loading.dismiss();
    }, err =>{
      loading.dismiss();
      this.navCtrl.pop();
      this.showAlert("Ocorreu um erro, tente novamente!")
    })
  }

  ionViewDidLoad() {    
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
