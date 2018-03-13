import { AncestralProvider } from './../ancestral/ancestral';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the PartidoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PartidoProvider extends AncestralProvider {

  constructor(public http: HttpClient) {
    super();
  }

  getAll(): Observable<any> {
    return this.http.get(this.ROTA_BASE + this.TODOS_PARTIDOS_END_POINT);
  }

  get(id: string): Observable<any> {
    return this.http.get(this.ROTA_BASE + this.PARTIDO_END_POINT.replace("{id}", id));
  }

  getMembros(urlMembros: string, legislatura: string, sigla: string): Observable<any> {
    return this.http.get(urlMembros, {
      params: {
        idLegislatura: legislatura,
        siglaPartido: sigla,
        itens: '1000'
      },
      observe: 'response'
    })
  }

  getByUrl(uri: string): Observable<any> {
    return this.http.get(uri);
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

  getOrgaos(idDeputado: string): Observable<any> {
    return this.http.get(this.ROTA_BASE + this.ORGAOS_END_POINT.replace("{id}",idDeputado), {
      params: {
        itens: '1000'
      },
      observe: 'response'
    })
  }

}
