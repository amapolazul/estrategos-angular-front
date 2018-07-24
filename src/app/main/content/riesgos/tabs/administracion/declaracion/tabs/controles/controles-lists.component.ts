import { Component } from '@angular/core';

@Component({
    selector   : 'controles-lists',
    templateUrl: './controles-lists.component.html',
    styleUrls  : ['./controles-lists.component.scss']
})
export class ControlesListsComponent
{
    rows = [
      {
        'control_implementado' : 'Costos de producción',
        'efectividad'      : 'Alto (4)'
      },
      {
        'control_implementado' : 'producción',
        'efectividad'      : 'Alto (4)'
      },
      {
        'control_implementado'  : 'Activiades de compras',
        'efectividad'      : 'Media (3)'
      }];

    constructor()
    {

    }
}
