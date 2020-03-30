import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiService} from '../api.service';
import {ProdutoSimple} from '../classes/produto-simple';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  products: ProdutoSimple[];
  selectedProduto: number;
  @Output() selectProduto = new EventEmitter<number>();

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getProductSimpleList().subscribe((res) => {
      this.products = res;
      console.log('Fetched product list');
    });
  }

  clickHandle(id: number) {
    this.selectedProduto = id;
    this.selectProduto.emit(id);
    console.log(`clicked produto id = ${id}`);
  }


}
