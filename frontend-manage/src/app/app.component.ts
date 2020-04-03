import { Component } from '@angular/core';
import { faListOl } from '@fortawesome/free-solid-svg-icons/faListOl';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons/faTachometerAlt';
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons/faProjectDiagram';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faUnlock } from '@fortawesome/free-solid-svg-icons/faUnlock';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-manage';
  faTachometerAlt = faTachometerAlt;
  faListOl = faListOl;
  faProjectDiagram = faProjectDiagram;
  faPlus = faPlus;
  faSignOutAlt = faSignOutAlt;

  constructor(private router: Router) {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']).then();
  }
}
