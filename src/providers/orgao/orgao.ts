import { AncestralProvider } from './../../ancestrais/provider/ancestralProvider';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the OrgaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrgaoProvider extends AncestralProvider {

  constructor(public http: HttpClient) {
    super();
  }

  get(idDeputado: string): Observable<any> {
    return this.http.get(this.ROTA_BASE + this.ORGAOS_END_POINT.replace("{id}",idDeputado), {
      params: {
        itens: '10'
      },
      observe: 'response'
    })
  }

  getByUrl(uri: string): Observable<any> {
    return this.http.get(uri);
  }
}
