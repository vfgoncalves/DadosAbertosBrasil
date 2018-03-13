import { GabineteMembro } from './../../models/gabineremembro';
import { StatusMembro } from './../../models/statusmembro';
import { PartidoProvider } from './../../providers/partido/partido';
import { DetalheMembro } from './../../models/detalhemembro';
import { MembroPartido } from './../../models/membroPartido';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { ProjetoInfo } from '../../models/projetoInfo';

/**
 * Generated class for the InfomembroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-infomembro',
  templateUrl: 'infomembro.html',
})
export class InfomembroPage {
  titulo: string = "";
  detalheMembro: DetalheMembro = new DetalheMembro();
  membro: MembroPartido = null
  ultimoStatus: StatusMembro = new StatusMembro();
  gabinete: GabineteMembro = new GabineteMembro();
  projetos: ProjetoInfo[];
  nPossuiProjeto: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public partidoService: PartidoProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.configuracaoInicial();
  }

  ionViewDidLoad() {

  }

  configuracaoInicial() {
    this.membro = this.navParams.get("membro");
    this.titulo = this.membro.nome;
    let loading: Loading = this.showLoading("Buscando informações do político...");
    this.partidoService.getByUrl(this.membro.uri).subscribe(r => {
      this.detalheMembro = r["dados"];
      this.ultimoStatus = this.detalheMembro.ultimoStatus;
      this.gabinete = this.ultimoStatus.gabinete;
      this.partidoService.getProjetos(this.ultimoStatus.id).subscribe(r=>{        
        this.projetos = r["body"]["dados"];
        if (this.projetos.length == 0){
          this.nPossuiProjeto = true;
        }else{
          this.nPossuiProjeto = false;
        }
        loading.dismiss();
      }, err=>{
        loading.dismiss();
        this.navCtrl.pop();
        this.showAlert("Ocorreu um erro, tente novamente!");        
      })
    }, err=>{
      loading.dismiss();
      this.navCtrl.pop();
      this.showAlert("Ocorreu um erro, tente novamente!");
    })
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
