import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ProdutoSimple} from './classes/produto-simple';
import {Refline} from './classes/refline';
import {Produto} from './classes/produto';
import {Traza} from './classes/traza';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  public getProductSimpleList() {
    return this.httpClient.get<ProdutoSimple[]>(`${this.apiURL}/produtos`);
  }

  public getReflines(id: number) {
    return this.httpClient.get<Refline[]>(`${this.apiURL}/produto/${id}/reflist`);
  }

  public getProdutoById(id: number) {
    return this.httpClient.get<Produto>(`${this.apiURL}/produto/${id}`);
  }

  public getTraza(ref: string) {
    return this.httpClient.get<Traza[]>(`${this.apiURL}/ref/${ref}/traza`);
  }
}
