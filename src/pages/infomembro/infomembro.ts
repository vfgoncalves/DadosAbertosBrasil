import { MembroProvider } from './../../providers/membro/membro';
import { AncestralPage } from './../../ancestrais/page/ancestralPage';
import { OrgaosPage } from './../orgaos/orgaos';
import { GabineteMembro } from './../../models/gabineremembro';
import { StatusMembro } from './../../models/statusmembro';
import { DetalheMembro } from './../../models/detalhemembro';
import { MembroPartido } from './../../models/membroPartido';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController, ActionSheetController } from 'ionic-angular';
import { ProjetoInfo } from '../../models/projetoInfo';
import { ProjetoProvider } from '../../providers/projeto/projeto';
import { DespesasPage } from '../despesas/despesas';

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
export class InfomembroPage extends AncestralPage {
  //Propriedades da página
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
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public membroService: MembroProvider,
    public projetoService: ProjetoProvider
  ) {
    super(loadingCtrl,alertCtrl);
    this.configuracaoInicial();
  }

  ionViewDidLoad() {

  }

  configuracaoInicial() {
    this.membro = this.navParams.get("membro");
    this.titulo = this.membro.nome;
    let loading: Loading = this.showLoading("Buscando informações do político...");
    this.membroService.getByUrl(this.membro.uri).subscribe(r => {
      this.detalheMembro = r["dados"];
      this.ultimoStatus = this.detalheMembro.ultimoStatus;
      this.gabinete = this.ultimoStatus.gabinete;
      this.projetoService.getProjetos(this.ultimoStatus.id).subscribe(r=>{        
        this.projetos = r["body"]["dados"];
        if (this.projetos.length == 0){
          this.nPossuiProjeto = true;
        }else{
          this.nPossuiProjeto = false;
        }
        loading.dismiss();
      }, err=>{
        this.tratarErro(loading, this.navCtrl);
      })
    }, err=>{
      this.tratarErro(loading, this.navCtrl);
    })
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Mais Consultas',
      buttons: [
        {
          text: 'Orgãos Relacionados ao Político',
          handler: () => {
            this.consultarOrgaos();
          }
        },
        {
          text: 'Despesas do Político',
          handler: () => {
            this.consultarDespesas();
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  consultarOrgaos(){
    this.navCtrl.push(OrgaosPage, {"id": this.ultimoStatus.id,"titulo": this.titulo});    
  }

  consultarDespesas(){
    this.navCtrl.push(DespesasPage, {"id": this.ultimoStatus.id,"titulo": this.titulo});    
  }
}
