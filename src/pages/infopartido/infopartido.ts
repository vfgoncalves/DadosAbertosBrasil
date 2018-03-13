import { InfomembroPage } from './../infomembro/infomembro';
import { MembroPartido } from './../../models/membroPartido';
import { DetalhePartido } from './../../models/detalhepartido';
import { Partido } from './../../models/partido';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public partidoService: PartidoProvider
  ) {
    this.partido = this.navParams.get("partido");
    this.titulo = this.partido.sigla;

    this.partidoService.get(this.partido.id).subscribe(r => {
      this.partido = r["dados"];      
      this.lider = this.partido.status.lider;
      this.status = this.partido.status;     
      this.buscarMembros(this.partido.status.uriMembros, this.partido.status.idLegislatura, this.partido.sigla);
    })
  }

  buscarMembros(url:string, legislatura: string, sigla: string){
    this.partidoService.getMembros(url, legislatura, sigla).subscribe(r => {      
      this.membrosPartido = r["body"]["dados"];
    })
  }

  infoMembro(membro: MembroPartido){
    this.navCtrl.push(InfomembroPage, {"membro": membro})
  }

}
