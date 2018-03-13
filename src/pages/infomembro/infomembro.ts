import { GabineteMembro } from './../../models/gabineremembro';
import { StatusMembro } from './../../models/statusmembro';
import { PartidoProvider } from './../../providers/partido/partido';
import { DetalheMembro } from './../../models/detalhemembro';
import { MembroPartido } from './../../models/membroPartido';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public partidoService: PartidoProvider
  ) {
    this.membro = navParams.get("membro");
    this.titulo = this.membro.nome;
    this.partidoService.getByUrl(this.membro.uri).subscribe(r=>{
      this.detalheMembro = r["dados"];   
      this.ultimoStatus = this.detalheMembro.ultimoStatus;
      this.gabinete = this.ultimoStatus.gabinete;
    })
    
  }

  ionViewDidLoad() {
    
  }

}
