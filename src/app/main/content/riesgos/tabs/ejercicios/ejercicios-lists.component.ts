import { Component } from '@angular/core';

@Component({
    selector   : 'ejercicios-lists',
    templateUrl: './ejercicios-lists.component.html',
    styleUrls  : ['./ejercicios-lists.component.scss']
})
export class EjerciciosListsComponent
{

    rows: any[];

    constructor()
    {

    }

    evaluacionDialog(){
      console.log('Procesos');
    }
}
