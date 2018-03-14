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
  proximaPagina: string;
  possuiProximaPagina: boolean = true;

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

  buscarDados() {
    let idDeputado = this.navParams.get("id");
    this.titulo = this.navParams.get("titulo");
    let loading: Loading = this.showLoading("Buscando orgãos relacionados...");

    this.orgaoService.get(idDeputado).subscribe(r => {
      this.orgaos = r["body"]["dados"];
      this.verificarProximaPagina(r["body"]["links"]);
      loading.dismiss();
    }, err => {
      this.tratarErro(loading, this.navCtrl);
    })
  }

  verificarProximaPagina(links) {
    for (let link of links) {
      if (link["rel"] == "next") {
        this.proximaPagina = link["href"];
        this.possuiProximaPagina = true;
        break;
      } else {
        this.proximaPagina = null;
        this.possuiProximaPagina = false;
      }
    }
  }

  doInfinite(infiniteScroll) {
    if (this.possuiProximaPagina){
      this.orgaoService.getByUrl(this.proximaPagina).subscribe(r => {
        for (let orgao of r["dados"]) {
          this.orgaos.push(orgao);
        }  
        this.verificarProximaPagina(r["links"]);
        infiniteScroll.complete();
      })
    }else{
      infiniteScroll.complete();
    }    
  }


  ionViewDidLoad() {
  }

}
