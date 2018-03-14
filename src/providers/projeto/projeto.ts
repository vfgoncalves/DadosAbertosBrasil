import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AncestralProvider } from '../../ancestrais/provider/ancestralProvider';

/*
  Generated class for the ProjetoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProjetoProvider extends AncestralProvider {

  constructor(public http: HttpClient) {
    super();
  }

  getProjetos(idDeputado: string): Observable<any> {
    return this.http.get(this.ROTA_BASE + this.PROJETOS_END_POINT, {
      params: {
        idAutor: idDeputado,
        itens: '1000'
      },
      observe: 'response'
    })
  }

}
