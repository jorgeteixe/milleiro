import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Produto} from './classes/produto';
import {GraficoDataset} from './classes/grafico-dataset';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = 'http://localhost:3001';

  constructor(private httpClient: HttpClient) {
  }

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

}
