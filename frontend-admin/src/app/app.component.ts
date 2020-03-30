import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-admin';
  produto: number;
  ref: string;

  selectProduto(id: number) {
    this.produto = id;
  }

  selectRef(ref: string) {
    this.ref = ref;
  }
}
