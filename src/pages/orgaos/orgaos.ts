import { OrgaoProvider } from './../../providers/orgao/orgao';
import { OrgaoMembro } from './../../models/orgaomembro';
import { PartidoProvider } from './../../providers/partido/partido';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Loading } from 'ionic-angular';
import { AncestralPage } from '../../ancestrais/page/ancestralPage';

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
export class OrgaosPage extends AncestralPage {
  orgaos: OrgaoMembro[];
  titulo: string = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public partidoService: PartidoProvider,
    public orgaoService: OrgaoProvider
  ) {
    super(loadingCtrl, alertCtrl);    
    this.buscarDados();
  }

  buscarDados(){
    let idDeputado = this.navParams.get("id");
    this.titulo = this.navParams.get("titulo");    
    let loading: Loading = this.showLoading("Buscando orgãos relacionados...");
    
    this.orgaoService.get(idDeputado).subscribe(r=>{
      this.orgaos = r["body"]["dados"];
      console.log(this.orgaos);
      
      loading.dismiss();
    }, err =>{
      this.tratarErro(loading, this.navCtrl);
    })
  }

  ionViewDidLoad() {    
  } 

}
