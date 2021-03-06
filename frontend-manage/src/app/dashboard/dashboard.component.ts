import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Produto} from '../model/produto';
import {Chart} from 'chart.js';
import {GraficoDataset} from '../model/grafico-dataset';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  produtos: Produto[];
  activos: boolean[] = [];
  chart: any;
  datasets: GraficoDataset[] = [];
  activeDatasets: any[] = [];
  labels: string[] = [];
  weekday = ['Domingo', 'Luns', 'Martes', 'Mércores', 'Xoves', 'Venres', 'Sábado'];

  color1 = '#920b36';
  color2 = '#ffe33f';
  color3 = '#3a3a3c';

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('logged') !== 'yes') {
      this.router.navigate(['/login']).then();
    }
    this.apiService.getProdutosGrafico().toPromise()
      .then(r => {
        this.produtos = r;
        r.forEach((p) => {
          this.activos.push(true);
          this.apiService.getDatasetById(p.id).toPromise()
            .then((r2) => {
              r2.color = this.colorIndice(p.id);
              this.datasets.push(r2);
            });
      });
    });
    setTimeout(() => {
      this.generateDatasets();
      this.generateChart();
    }, 300);
  }

  colorProduto(id: number, activo: boolean) {
    switch (id % 3) {
      case 0:
        if (activo) {
          return 'first-color first-active';
        } else {
          return 'first-color';
        }
      case 1:
        if (activo) {
          return 'second-color second-active';
        } else {
          return 'second-color';
        }
      case 2:
        if (activo) {
          return 'third-color third-active';
        } else {
          return 'third-color';
        }
    }
  }

  colorIndice(id: number) {
    switch (id % 3) {
      case 0:
        return this.color1;
      case 1:
        return this.color2;
      case 2:
        return this.color3;
    }
  }

  generateDatasets() {
    this.activeDatasets = [];
    this.labels = [];
    let day = new Date().getDay() - 1;
    while (this.labels.length < 7) {
      this.labels.push(this.weekday[day]);
      day--;
      if (day === -1) {
        day = 6;
      }
    }
    this.labels = this.labels.reverse();
    for (let i = 0; i < this.produtos.length; i++) {
      let j = 0;
      if (this.activos[i]) {
        this.activeDatasets.push({
          data: this.toNumberArray(this.datasets[i]),
          borderColor: this.datasets[i].color,
          fill: false
        });
        j++;
      }
    }
  }

  handleClick(index: number) {
    this.activos[index] = !this.activos[index];
    this.chart.data.datasets = [];
    for (let i = 0; i < this.produtos.length; i++) {
      let j = 0;
      if (this.activos[i]) {
        this.chart.data.datasets.push({
          data: this.toNumberArray(this.datasets[i]),
          borderColor: this.datasets[i].color,
          fill: false
        });
        j++;
      }
    }
    this.chart.update();
  }

  generateChart() {
    console.log(this.activeDatasets);
    this.chart = new Chart('grafico', {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: this.activeDatasets
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true,
            ticks: {
              stepSize: 1,
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  toNumberArray(gd: GraficoDataset) {
    return [gd.minus6, gd.minus5, gd.minus4, gd.minus3, gd.minus2, gd.minus1, gd.minus0];
  }

}
