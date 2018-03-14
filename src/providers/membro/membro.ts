import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AncestralProvider } from '../../ancestrais/provider/ancestralProvider';
import { Observable } from 'rxjs';

/*
  Generated class for the MembroProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MembroProvider extends AncestralProvider {

  constructor(public http: HttpClient) {
    super();
  }

  get(urlMembros: string, legislatura: string, sigla: string): Observable<any> {
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

}
