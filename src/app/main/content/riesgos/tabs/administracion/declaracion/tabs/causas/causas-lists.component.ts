import { Component } from '@angular/core';

@Component({
    selector   : 'causas-lists',
    templateUrl: './causas-lists.component.html',
    styleUrls  : ['./causas-lists.component.scss']
})
export class CausasListsComponent
{
    rows = [
      {
        'causa'       : 'Costos de producción',
        'probabilidad'      : 'Alto (4)'
      },
      {
        'causa'       : 'producción',
        'probabilidad'      : 'Alto (4)'
      },
      {
        'causa'       : 'Activiades de compras',
        'probabilidad'      : 'Media (3)'
      }];

    constructor()
    {

    }
}
