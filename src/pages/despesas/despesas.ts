import { DespesaMembro } from './../../models/despesaMembro';
import { DespesaProvider } from './../../providers/despesa/despesa';
import { Component, ViewChild  } from '@angular/core';
import { Content, IonicPage, NavController, NavParams, LoadingController, AlertController, Loading } from 'ionic-angular';
import { AncestralPage } from '../../ancestrais/page/ancestralPage';

/**
 * Generated class for the DespesasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-despesas',
  templateUrl: 'despesas.html',
})
export class DespesasPage extends AncestralPage {
  @ViewChild(Content) content: Content;

  titulo: string = "";
  idDeputado: string;
  ano: string;
  despesas: DespesaMembro[];
  proximaPagina: string;
  totalDespesa: number = 0;
  NhabilidataInfiniteScroll: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public despesaService: DespesaProvider
  ) {
    super(loadingCtrl, alertCtrl);
    this.idDeputado = this.navParams.get("id");
    this.titulo = this.navParams.get("titulo");
  }

  buscarDespesas() {
    let loading: Loading = this.showLoading("Buscando despesas...")
    this.despesaService.get(this.idDeputado, this.ano).subscribe(r => {
      loading.dismiss();
      this.despesas = r["body"]["dados"]
      this.verificarProximaPagina(r["body"]["links"]);
      this.ordernarDespesas();
      this.calcularTotalDespesas();
    }, err => {
      this.tratarErro(loading, this.navCtrl);
    })
  }

  ordernarDespesas() {
    this.despesas = this.despesas.sort((obj1, obj2) => {
      if (obj1.dataDocumento > obj2.dataDocumento) { return 1; }
      if (obj1.dataDocumento < obj2.dataDocumento) { return -1; }
      return 0;
    });
  }

  calcularTotalDespesas(){
    for (let despesa of this.despesas){
      this.totalDespesa += +despesa.valorLiquido
    }
  }

  verificarProximaPagina(links) {
    for (let link of links) {
      if (link["rel"] == "next") {
        this.proximaPagina = link["href"];
        this.NhabilidataInfiniteScroll = true;
        break;
      } else {
        this.proximaPagina = null;
        this.NhabilidataInfiniteScroll = false;
      }
    }
  }

  doInfinite(infiniteScroll) {
    if (this.NhabilidataInfiniteScroll) {
      this.despesaService.getByUrl(this.proximaPagina).subscribe(r => {
        for (let despesa of r["dados"]) {
          this.despesas.push(despesa);
        }
        this.ordernarDespesas();
        this.calcularTotalDespesas();
        this.verificarProximaPagina(r["links"]);
        infiniteScroll.complete();
      })
    } else {
      infiniteScroll.complete();
    }
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  ionViewDidLoad() {

  }

}
