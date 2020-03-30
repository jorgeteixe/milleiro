import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ApiService} from '../api.service';
import {Refline} from '../classes/refline';
import {Produto} from '../classes/produto';

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

}
