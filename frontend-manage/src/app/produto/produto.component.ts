import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {IngredenteSenID, LiñaPreparacionSenID, ProdutoSenID, TrazaSenID} from '../model/engadir';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit, OnDestroy {

  faTrash = faTrash;
  faExternalLinkAlt = faExternalLinkAlt;

  id: number;
  private routeSub: Subscription;
  produto: ProdutoSenID;
  ingredentes: IngredenteSenID[];
  preparacion: LiñaPreparacionSenID[];
  trazas: TrazaSenID[];
  canttrazas: number;
  cantrefs: number;
  viendo = 1;

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('logged') !== 'yes') {
      this.router.navigate(['/login']).then();
    }
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this.apiService.getProduto(this.id).toPromise().then((r) => {
        this.produto = r;
      });
      this.apiService.getIngredentes(this.id).toPromise().then((r) => {
        this.ingredentes = r;
      });
      this.apiService.getPreparacion(this.id).toPromise().then((r) => {
        this.preparacion = r;
      });
      this.apiService.getTraza(this.id).toPromise().then((r) => {
        this.trazas = r;
      });
      this.apiService.getCantidadReferencias(this.id).toPromise().then((r) => {
        this.cantrefs = r.conta;
      });
      this.apiService.getCantidadTrazados(this.id).toPromise().then((r) => {
        this.canttrazas = r.conta;
      });
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  openVisor() {
    window.open('https://panel-milleiro.jorgeteixeira.es/', '_blank');
  }

  eliminar() {
    this.apiService.deleteProduto(this.id).toPromise().then(() =>
      this.router.navigate(['/listar']).then()
    );
  }

}
