import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Token} from './token';
import {ApiService} from '../api.service';
import {faCheckCircle} from '@fortawesome/free-regular-svg-icons/faCheckCircle';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {

  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faPlus = faPlusCircle;
  faTrash = faTrash;

  nomeEngadir = '';
  tokens: Token[];

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('logged') !== 'yes') {
      this.router.navigate(['/login']).then();
    }
    this.apiService.getTokens().toPromise().then((tks) =>
      this.tokens = tks
    );
  }

  desactivar(token: string) {
    this.apiService.deactivateToken(token).toPromise().then(() =>
      this.apiService.getTokens().toPromise().then((tk) =>
        this.tokens = tk
      )
    );
  }

  activar(token: string) {
    this.apiService.activateToken(token).toPromise().then(() =>
      this.apiService.getTokens().toPromise().then((tk) =>
        this.tokens = tk
      )
    );
  }

  eliminar(token: string) {
    this.apiService.deleteToken(token).toPromise().then(() =>
      this.apiService.getTokens().toPromise().then((tk) =>
        this.tokens = tk
      )
    );
  }

  engadir() {
    if (this.nomeEngadir.length !== 0) {
      let randomToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      randomToken = randomToken.substring(0, 12).toUpperCase();
      const token: Token = { nome: this.nomeEngadir, token: randomToken, activo: true};
      this.apiService.addToken(token).toPromise().then(() =>
        this.apiService.getTokens().toPromise().then((tk) =>
          this.tokens = tk
        )
      );
      this.nomeEngadir = '';
    }
  }

}
