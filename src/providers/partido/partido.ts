import { AncestralProvider } from './../ancestral/ancestral';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

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

  getAll(): Observable<any>{
    return this.http.get(this.ROTA_BASE + this.TODOS_PARTIDOS_END_POINT);
  }

}
