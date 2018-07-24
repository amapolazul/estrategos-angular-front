import { Component } from '@angular/core';

@Component({
    selector   : 'efectos-lists',
    templateUrl: './efectos-lists.component.html',
    styleUrls  : ['./efectos-lists.component.scss']
})
export class EfectosListsComponent
{
    rows = [
      {
        'efecto'       : 'Costos de producción',
        'impacto'      : 'Alto (4)'
      },
      {
        'efecto'       : 'producción',
        'impacto'      : 'Alto (4)'
      },
      {
        'efecto'       : 'Activiades de compras',
        'impacto'      : 'Media (3)'
      }];

    constructor()
    {

    }
}
