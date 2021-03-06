import {Component, OnInit} from '@angular/core';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {faSeedling} from '@fortawesome/free-solid-svg-icons/faSeedling';
import {faBreadSlice} from '@fortawesome/free-solid-svg-icons/faBreadSlice';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons/faChevronRight';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {faFlagCheckered} from '@fortawesome/free-solid-svg-icons/faFlagCheckered';
import {IngredenteSenID, LiñaPreparacionSenID, ProdutoSenID, TrazaSenID} from '../model/engadir';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {ApiService} from '../api.service';
import {faDolly} from '@fortawesome/free-solid-svg-icons/faDolly';
import {faPaperPlane} from '@fortawesome/free-regular-svg-icons/faPaperPlane';
import {Router} from '@angular/router';

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
  faTrash = faTrash;
  faDolly = faDolly;


  botonesActivos = [false, false, true];
  textoSeguinte = 'Seguinte';
  showform = 0;
  step = 0;
  ingredentes: IngredenteSenID[] = [{nome: '', cantidade: 100, unidade: ''}];
  ingredentevacio: IngredenteSenID = {nome: '', cantidade: 100, unidade: ''};
  ningredente = 0;

  npreparacion = 0;
  preparacions: LiñaPreparacionSenID[] = [{numero: 1, texto: ''}];
  prepvacia: LiñaPreparacionSenID = {numero: this.npreparacion + 2, texto: ''};

  ntraza = 0;
  trazas: TrazaSenID[] = [{numero: 1, nome: ''}];
  trazavacia: TrazaSenID = {numero: this.ntraza + 2, nome: ''};

  produto: ProdutoSenID = {nome: '', descricion: ''};
  idCreado: any;
  sending = false;

  constructor(private apiService: ApiService, private route: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('logged') !== 'yes') {
      this.route.navigate(['/login']).then();
    }
  }

  handleAnterior(activo: boolean) {
    if (activo) {
      if (this.step === 1) {
        if (this.ningredente === 0) {
          this.step--;
          this.showform--;
          this.botonesActivos[0] = false;
          this.botonesActivos[1] = false;
        } else {
          this.ningredente--;
        }
      } else if (this.step === 2) {
        if (this.npreparacion === 0) {
          this.step--;
          this.showform--;
        } else {
          this.npreparacion--;
        }
      } else if (this.step === 3) {
        this.botonesFinal(false);
        if (this.ntraza === 0) {
          this.step--;
          this.showform--;
        } else {
          this.ntraza--;
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
        }
      } else if (this.step === 2) {
        if (this.preparacions[this.npreparacion].texto.length !== 0 && this.npreparacion === this.preparacions.length - 1) {
          this.prepvacia.numero = this.npreparacion + 2;
          this.preparacions.push(Object.assign({}, this.prepvacia));
          this.npreparacion++;
        }
      } else if (this.step === 3) {
        if (this.trazas[this.ntraza].nome.length !== 0 && this.ntraza === this.trazas.length - 1) {
          this.trazavacia.numero = this.ntraza + 2;
          this.trazas.push(Object.assign({}, this.trazavacia));
          this.ntraza++;
          this.botonesFinal(true);
        }
      }
    }
  }

  handleSeguinte(activo: boolean) {
    if (activo) {
      if (this.step === 0) {
        if (this.produto.nome.length !== 0 && this.produto.descricion.length !== 0) {
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
      } else if (this.step === 2) {
        if (this.preparacions[this.npreparacion].texto.length !== 0) {
          if (this.preparacions.length - 1 === this.npreparacion) {
            this.botonesFinal(true);
            this.step++;
            this.showform++;
          } else {
            this.npreparacion++;
          }
        }
      } else if (this.step === 3) {
        if (this.trazas.length - 1 === this.ntraza) {
          if (this.trazas[this.ntraza].nome.length != 0) {

            // Enviar a backend
            if (!this.sending) {
              this.sending = true;
              this.apiService.createProduct(this.produto).toPromise()
                .then((id) => {
                  this.idCreado = id.insetedId;
                }).finally(() => {
                this.ingredentes.forEach((i) => {
                  this.apiService.addIngredente(i, this.idCreado).toPromise().then(r => {
                  });
                });
                this.preparacions.forEach((p) => {
                  this.apiService.addLiñaPreparacion(p, this.idCreado).toPromise().then(r => {
                  });
                });
                this.trazas.forEach((t) => {
                  this.apiService.addTraza(t, this.idCreado).toPromise().then(r => {
                  });
                });
              });
              setTimeout(() => {
                this.faChevronRight = faPaperPlane;
                this.textoSeguinte = 'Engadido!';
                setTimeout(() => this.route.navigate(['/']), 400);
              }, 300);
            }
          }
          // TODO ADD ERROR MESSAGES FROM DB
        } else {
          this.ntraza++;
          if (this.trazas.length - 1 === this.ntraza) {
            this.botonesFinal(true);
          }
        }
      }
    }
  }


  handleEliminar() {
    if (this.step === 1) {
      if (this.ningredente > 0) {
        this.ingredentes = this.ingredentes.slice(0, this.ningredente).concat(this.ingredentes.slice(this.ningredente + 1));
        this.ningredente--;
      } else {
        this.ingredentes.shift();
      }
    } else if (this.step === 2) {
      if (this.npreparacion > 0) {
        this.preparacions = this.preparacions.slice(0, this.npreparacion).concat(this.preparacions.slice(this.npreparacion + 1));
        this.npreparacion--;
      } else {
        this.preparacions.shift();
      }
    } else if (this.step === 3) {
      if (this.ntraza > 0) {
        this.trazas = this.trazas.slice(0, this.ntraza).concat(this.trazas.slice(this.ntraza + 1));
        this.ntraza--;
      } else {
        this.trazas.shift();
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
