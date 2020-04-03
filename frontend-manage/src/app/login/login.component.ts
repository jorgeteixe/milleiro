import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {Password} from './password';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error = false;
  password: Password = { pwd: ''};

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('logged') === 'yes') {
      this.router.navigate(['/']).then();
    }
  }

  submit() {
    this.error = false;
    this.apiService.logIn(this.password).toPromise().then((r) => {
      if (r.status === 200) {
        localStorage.setItem('logged', 'yes');
        this.router.navigate(['/']).then();
      } else {
        this.password.pwd = '';
        this.error = true;
      }
    });
  }

}
