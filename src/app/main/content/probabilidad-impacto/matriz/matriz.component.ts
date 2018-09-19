import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-matriz',
  templateUrl: './matriz.component.html',
  styleUrls: ['./matriz.component.scss']
})
export class MatrizComponent implements OnInit {

  columns: string[] = ['ProbabilidadImpacto', 'Muy Bajo', 'Bajo', 'Moderado', 'Alto', 'Muy Alto'];
  rowdata: any[] =
    [
      {
        'ProbabilidadImpacto': 'Muy Alto row',
        'Muy Bajo': '3',
        'Bajo': '4',
        'Moderado': '7',
        'Alto': '8',
        'Muy Alto': '9'
      },
      {
        'ProbabilidadImpacto': 'Alto row',
        'Muy Bajo': '3',
        'Bajo': '4',
        'Moderado': '5',
        'Alto': '7',
        'Muy Alto': '8'
      },
      {
        'ProbabilidadImpacto': 'Moderado row',
        'Muy Bajo': '3',
        'Bajo': '3',
        'Moderado': '5',
        'Alto': '6',
        'Muy Alto': '7'
      },
      {
        'ProbabilidadImpacto': 'Bajo row',
        'Muy Bajo': '1',
        'Bajo': '2',
        'Moderado': '3',
        'Alto': '5',
        'Muy Alto': '6'
      },
      {
        'ProbabilidadImpacto': 'Muy Bajo row',
        'Muy Bajo': '1',
        'Bajo': '2',
        'Moderado': '3',
        'Alto': '3',
        'Muy Alto': '4'
      }
    ];

  constructor() {
  }

  ngOnInit() {
    console.log(this.columns);
    console.log(this.rowdata);
  }

}
