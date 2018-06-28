import {Component, OnInit } from '@angular/core';

@Component({
  selector: 'riesgos-classes',
  templateUrl: './riesgos.component.html',
  styleUrls: ['./riesgos.component.scss']
})
export class RiesgosComponent implements OnInit{

  constructor()
  {
  }

  ngOnInit() {

    console.log('Riesgos y Ejercicios de evaluacion de riesgos');

  }

}
