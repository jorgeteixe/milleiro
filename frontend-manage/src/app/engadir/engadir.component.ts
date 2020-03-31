import { Component, OnInit } from '@angular/core';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {faSeedling} from '@fortawesome/free-solid-svg-icons/faSeedling';
import {faBreadSlice} from '@fortawesome/free-solid-svg-icons/faBreadSlice';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons/faChevronRight';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {faFlagCheckered} from '@fortawesome/free-solid-svg-icons/faFlagCheckered';

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

  constructor() { }

  ngOnInit(): void {
  }

  handleAnterior(activo: boolean) {

  }

  handleMais(activo: boolean) {

  }

  handleSeguinte(activo: boolean) {

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
