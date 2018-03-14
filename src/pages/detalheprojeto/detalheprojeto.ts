import { StatusProjeto } from './../../models/statusProjeto';
import { DetalheProjeto } from './../../models/detalheProjeto';
import { ProjetoInfo } from './../../models/projetoInfo';
import { ProjetoProvider } from './../../providers/projeto/projeto';
import { Component, ViewChild  } from '@angular/core';
import { Content, IonicPage, NavController, NavParams, LoadingController, AlertController, Loading } from 'ionic-angular';
import { AncestralPage } from '../../ancestrais/page/ancestralPage';

/**
 * Generated class for the DetalheprojetoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalheprojeto',
  templateUrl: 'detalheprojeto.html',
})
export class DetalheprojetoPage extends AncestralPage {
  @ViewChild(Content) content: Content;
  projeto: ProjetoInfo = new ProjetoInfo();
  detalheProjeto: DetalheProjeto = new DetalheProjeto();
  statusProjeto: StatusProjeto = new StatusProjeto();
  tramitacoes: StatusProjeto[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public projetoService: ProjetoProvider
  ) {
    super(loadingCtrl, alertCtrl);
    this.projeto = navParams.get("projeto");
    this.buscarDados();
  }

  buscarDados() {
    let loading: Loading = this.showLoading("Buscando dados do projeto...")
    this.projetoService.getDetalhe(this.projeto.id).subscribe(r => {
      this.detalheProjeto = r["dados"];
      this.statusProjeto = this.detalheProjeto.statusProposicao;
      if (this.detalheProjeto.justificativa == null) {
        this.detalheProjeto.justificativa = "Não possui Justificativa";
      }

      this.projetoService.getTramitacoes(this.projeto.id).subscribe(t => {
        this.tramitacoes = t["body"]["dados"];
        this.ordernarTramitacao();
        loading.dismiss();
      }, err => {
        this.tratarErro(loading, this.navCtrl);
      })
    }, err => {
      this.tratarErro(loading, this.navCtrl);
    })
  }

  ordernarTramitacao() {
    this.tramitacoes = this.tramitacoes.sort((obj1, obj2) => {
      if (obj1.dataHora > obj2.dataHora) { return 1; }
      if (obj1.dataHora < obj2.dataHora) { return -1; }
      return 0;
    });
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  ionViewDidLoad() {

  }

}
