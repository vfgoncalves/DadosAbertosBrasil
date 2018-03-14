import { AncestralProvider } from './../../ancestrais/provider/ancestralProvider';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the DespesaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DespesaProvider extends AncestralProvider {

  constructor(public http: HttpClient) {
    super();
  }

  get(idDeputado: string, ano: string): Observable<any> {
    return this.http.get(this.ROTA_BASE + this.DESPESAS_END_POINT.replace("{id}",idDeputado), {
      params: {
        ano: ano,
        itens: '10'
      },
      observe: 'response'
    })
  }

  getByUrl(uri: string): Observable<any> {
    return this.http.get(uri);
  }
}
