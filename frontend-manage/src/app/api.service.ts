import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Produto} from './model/produto';
import {GraficoDataset} from './model/grafico-dataset';
import {map} from 'rxjs/operators';
import {IngredenteSenID, LiñaPreparacionSenID, ProdutoSenID, Retorno, TrazaSenID} from './model/engadir';
import {Conta, ProdutosListar} from './model/listar';
import {Password, PwdRespuesta} from './login/password';
import {Token} from './api/token';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = 'https://milleiro.jorgeteixeira.es/api/admin';

  constructor(private httpClient: HttpClient) {}

  public getProdutosGrafico() {
    return this.httpClient.get<Produto[]>(`${this.apiURL}/grafico/produtos`).pipe(
      map(response => response)
    );
  }

  public getDatasetById(id: number) {
    return this.httpClient.get<GraficoDataset>(`${this.apiURL}/grafico/dataset/${id}`).pipe(
      map(response => response)
    );
  }

  public createProduct(produto: ProdutoSenID) {
    return this.httpClient.post<Retorno>(`${this.apiURL}/produto/engadir`, produto, httpOptions).pipe(
      map(response => response)
    );
  }

  public addIngredente(ingredente: IngredenteSenID, id: number) {
    return this.httpClient.post(`${this.apiURL}/produto/${id}/ingredentes/engadir`, ingredente, httpOptions).pipe(
      map(response => response)
    );
  }

  public addLiñaPreparacion(liñaPreparacion: LiñaPreparacionSenID, id: number) {
    return this.httpClient.post(`${this.apiURL}/produto/${id}/preparacion/engadir`, liñaPreparacion, httpOptions).pipe(
      map(response => response)
    );
  }

  public addTraza(traza: TrazaSenID, id: number) {
    return this.httpClient.post(`${this.apiURL}/produto/${id}/traza/engadir`, traza, httpOptions).pipe(
      map(response => response)
    );
  }

  public getProdutosTrazados() {
    return this.httpClient.get<ProdutosListar[]>(`${this.apiURL}/produtos/lista/trazados`).pipe(
      map(response => response)
    );
  }

  public getProdutosSinTrazar() {
    return this.httpClient.get<ProdutosListar[]>(`${this.apiURL}/produtos/lista/sintrazar`).pipe(
      map(response => response)
    );
  }

  getProduto(id: number) {
    return this.httpClient.get<ProdutoSenID>(`${this.apiURL}/produto/${id}`).pipe(
      map(response => response)
    );
  }

  getIngredentes(id: number) {
    return this.httpClient.get<IngredenteSenID[]>(`${this.apiURL}/produto/${id}/ingredentes`).pipe(
      map(response => response)
    );
  }

  getPreparacion(id: number) {
    return this.httpClient.get<LiñaPreparacionSenID[]>(`${this.apiURL}/produto/${id}/preparacion`).pipe(
      map(response => response)
    );
  }

  getTraza(id: number) {
    return this.httpClient.get<TrazaSenID[]>(`${this.apiURL}/produto/${id}/traza`).pipe(
      map(response => response)
    );
  }

  getCantidadReferencias(id: number) {
    return this.httpClient.get<Conta>(`${this.apiURL}/produto/${id}/referencias/contar`).pipe(
      map(response => response)
    );
  }

  getCantidadTrazados(id: number) {
    return this.httpClient.get<Conta>(`${this.apiURL}/produto/${id}/trazas/contar`).pipe(
      map(response => response)
    );
  }

  logIn(pwd: Password) {
    return this.httpClient.post<PwdRespuesta>(`${this.apiURL}/contrasinal`, pwd, httpOptions).pipe(
      map(response => response)
    );
  }

  getTokens() {
    return this.httpClient.get<Token[]>(`${this.apiURL}/tokens`).pipe(
      map(response => response)
    );
  }
  addToken(token: Token) {
    return this.httpClient.post<PwdRespuesta>(`${this.apiURL}/tokens/engadir`, token, httpOptions).pipe(
      map(response => response)
    );
  }

  deleteProduto(id: number) {
    return this.httpClient.delete(`${this.apiURL}/produto/${id}`).pipe(
      map(response => response)
    );
  }

  deleteToken(token: string) {
    return this.httpClient.delete(`${this.apiURL}/token/${token}`).pipe(
      map(response => response)
    );
  }

  activateToken(token: string) {
    return this.httpClient.get(`${this.apiURL}/token/${token}/activate`).pipe(
      map(response => response)
    );
  }

  deactivateToken(token: string) {
    return this.httpClient.get(`${this.apiURL}/token/${token}/deactivate`).pipe(
      map(response => response)
    );
  }

}
