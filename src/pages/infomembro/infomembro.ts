import { GabineteMembro } from './../../models/gabineremembro';
import { StatusMembro } from './../../models/statusmembro';
import { PartidoProvider } from './../../providers/partido/partido';
import { DetalheMembro } from './../../models/detalhemembro';
import { MembroPartido } from './../../models/membroPartido';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public partidoService: PartidoProvider
  ) {
    this.configuracaoInicial();
  }

  ionViewDidLoad() {

  }

  configuracaoInicial() {
    this.membro = this.navParams.get("membro");
    this.titulo = this.membro.nome;
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
      })
    })
  }
}
