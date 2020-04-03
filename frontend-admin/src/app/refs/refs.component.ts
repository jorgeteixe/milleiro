import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ApiService} from '../api.service';
import {Refline} from '../classes/refline';
import {Produto} from '../classes/produto';
import {ProdutoRef} from '../classes/produto-ref';

@Component({
  selector: 'app-refs',
  templateUrl: './refs.component.html',
  styleUrls: ['./refs.component.css']
})
export class RefsComponent implements OnInit, OnChanges {

  @Input() produto: number;
  @Output() selectRef = new EventEmitter<string>();
  produtoInfo: Produto;
  reflines: Refline[];
  selectedRef: string;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.produtoInfo = new Produto();
  }

  ngOnChanges(): void {
    this.apiService.getProdutoById(this.produto).subscribe((res) => {
      this.produtoInfo = res[0];
      console.log(`Fetched produto info for produto ${this.produto}`);
    });
    this.apiService.getReflines(this.produto).subscribe((res) => {
      this.reflines = res;
      console.log(`Fetched refiles for product ${this.produto}`);
    });
  }

  handleClick(ref: string) {
    this.selectedRef = ref;
    this.selectRef.emit(ref);
  }

  addRef() {
    let randomRef = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    randomRef = this.produtoInfo.nome.substring(0, 1).concat(randomRef.substring(0, 8)).toUpperCase();
    const ref: ProdutoRef = { produto: this.produto, referencia: randomRef };
    this.apiService.addRef(ref).toPromise().then(() =>
      this.ngOnChanges()
    );
  }

}
