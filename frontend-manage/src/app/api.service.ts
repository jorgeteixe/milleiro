import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Produto} from './model/produto';
import {GraficoDataset} from './model/grafico-dataset';
import {map} from 'rxjs/operators';
import {IngredenteSenID, LiñaPreparacionSenID, ProdutoSenID, Retorno, TrazaSenID} from './model/engadir';
import {ProdutosListar} from './model/listar';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = 'http://localhost:3001';

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

}
