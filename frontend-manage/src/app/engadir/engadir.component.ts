import {Component, OnInit} from '@angular/core';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {faSeedling} from '@fortawesome/free-solid-svg-icons/faSeedling';
import {faBreadSlice} from '@fortawesome/free-solid-svg-icons/faBreadSlice';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons/faChevronRight';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {faFlagCheckered} from '@fortawesome/free-solid-svg-icons/faFlagCheckered';
import {IngredenteSenID, LiñaPreparacionSenID, ProdutoSenID} from '../model/engadir';

@Component({
  selector: 'app-engadir',
  templateUrl: './engadir.component.html',
  styleUrls: ['./engadir.component.css']
})
export class EngadirComponent implements OnInit {

  faPlus = faPlus;
  faSeeding = faSeedling;
  faBreadSlice = faBreadSlice;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;


  botonesActivos = [false, false, true];
  textoSeguinte = 'Seguinte';
  showform = 0;
  step = 0;
  ingredentes: IngredenteSenID[] = [{nome: '', cantidade: 100, unidade: ''}];
  ingredentevacio: IngredenteSenID = {nome: '', cantidade: 100, unidade: ''};
  ningredente = 0;

  preparacions: LiñaPreparacionSenID[];
  prepvacia: LiñaPreparacionSenID = {numero: 0, texto: ''};
  npreparacion = 0;

  produtoSenID: ProdutoSenID = {nome: '', descricion: ''};

  constructor() {
  }

  ngOnInit(): void {
  }

  handleAnterior(activo: boolean) {
    if (activo) {
      if (this.step === 1) {
        if (this.ningredente === 0) {
          this.step--;
          this.showform--;
          this.botonesActivos[0] = false;
          this.botonesActivos[1] = false;
        } else if (this.ningredente > 0) {
          this.ningredente--;
        }
      } else if (this.step === 2) {
        if (this.npreparacion === 0) {
          this.step--;
          this.showform--;
        }
      }
    }
  }

  handleMais(activo: boolean) {
    if (activo) {
      if (this.step === 1) {
        if (this.ingredentes[this.ningredente].nome.length !== 0
          && this.ingredentes[this.ningredente].cantidade > 0
          && this.ingredentes[this.ningredente].cantidade != null
          && this.ingredentes[this.ningredente].unidade.length !== 0
          && this.ningredente === this.ingredentes.length - 1) {
          this.ingredentes.push(Object.assign({}, this.ingredentevacio));
          this.ningredente++;
          console.log(this.ingredentes);
        }
      }
    }
  }

  handleSeguinte(activo: boolean) {
    if (activo) {
      if (this.step === 0) {
        if (this.produtoSenID.nome.length !== 0 && this.produtoSenID.descricion.length !== 0) {
          this.step++;
          this.showform++;
          this.botonesActivos[0] = true;
          this.botonesActivos[1] = true;
        }
      } else if (this.step === 1) {
        if (this.ingredentes[this.ningredente].nome.length !== 0
          && this.ingredentes[this.ningredente].cantidade > 0
          && this.ingredentes[this.ningredente].cantidade != null
          && this.ingredentes[this.ningredente].unidade.length !== 0) {
          if (this.ningredente === this.ingredentes.length - 1) {
            this.step++;
            this.showform++;
          } else {
            this.ningredente++;
          }
        }
      }
    }
  }

  botonesFinal(final: boolean) {
    if (final) {
      this.faChevronRight = faFlagCheckered;
      this.textoSeguinte = 'Engadir';
    } else {
      this.textoSeguinte = 'Seguinte';
      this.faChevronRight = faChevronRight;
    }
  }
}
