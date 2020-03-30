import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Traza} from '../classes/traza';

@Component({
  selector: 'app-traza',
  templateUrl: './traza.component.html',
  styleUrls: ['./traza.component.css']
})
export class TrazaComponent implements OnInit, OnChanges {

  @Input() ref: string;
  trazas: Traza[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.apiService.getTraza(this.ref).subscribe((res) => {
      this.trazas = res;
      console.log(`Fetched traza for ref = ${this.ref}`);
    });
  }
}
