import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {ProdutosListar} from '../model/listar';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons/faChevronRight';
import {faCog} from '@fortawesome/free-solid-svg-icons/faCog';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {Router} from '@angular/router';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  faChevronRight = faChevronRight;
  faCog = faCog;
  faPlus = faPlus;
  trazados: ProdutosListar[] = [];
  sintrazar: ProdutosListar[] = [];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('logged') !== 'yes') {
      this.router.navigate(['/login']).then();
    }
    this.apiService.getProdutosTrazados().toPromise().then((ps) => {
      ps.forEach(p => {
        if (p.descr.length === 20) {
          p.descr = p.descr.concat('...');
        }
        this.trazados.push(p);
      });
    });
    this.apiService.getProdutosSinTrazar().toPromise().then((ps) => {
      ps.forEach(p => {
        if (p.descr.length === 20) {
          p.descr = p.descr.concat('...');
        }
        this.sintrazar.push(p);
      });
    });
  }

}
