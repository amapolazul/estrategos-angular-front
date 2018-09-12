import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-matriz',
  templateUrl: './matriz.component.html',
  styleUrls: ['./matriz.component.scss']
})
export class MatrizComponent implements OnInit {

  columns: string[] = ['ProbabilidadImpacto', 'Muy Bajo', 'Bajo', 'Moderado', 'Alto', 'Muy Alto'];
  characters: any[] =
    [
      {
        'ProbabilidadImpacto': 'Muy Alto',
        'Muy Bajo': '0,05',
        'Bajo': '0,09',
        'Moderado': '0,18',
        'Alto': '0,36',
        'Muy Alto': '0,72'
      },
      {
        'ProbabilidadImpacto': 'Alto',
        'Muy Bajo': '0,2',
        'Bajo': '0,3',
        'Moderado': '0,4',
        'Alto': '0,5',
        'Muy Alto': '0,6'
      },
      {
        'ProbabilidadImpacto': 'Moderado',
        'Muy Bajo': '0,2',
        'Bajo': '0,3',
        'Moderado': '0,4',
        'Alto': '0,5',
        'Muy Alto': '0,6'
      },
      {
        'ProbabilidadImpacto': 'Bajo',
        'Muy Bajo': '0,2',
        'Bajo': '0,3',
        'Moderado': '0,4',
        'Alto': '0,5',
        'Muy Alto': '0,6'
      },
      {
        'ProbabilidadImpacto': 'Muy Bajo',
        'Muy Bajo': '0,2',
        'Bajo': '0,3',
        'Moderado': '0,4',
        'Alto': '0,5',
        'Muy Alto': '0,6'
      }
    ];

  constructor() {
  }

  ngOnInit() {
    console.log(this.columns);
    console.log(this.characters);
  }

}
