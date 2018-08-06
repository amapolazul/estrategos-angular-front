import { Component } from '@angular/core';
import {RatingRiskService} from '../../../system-tables/rating/service/rating-risk.service';

@Component({
    selector   : 'riesgos-lists',
    templateUrl: './riesgos-lists.component.html',
    styleUrls  : ['./riesgos-lists.component.scss']
})
export class RiesgosListsComponent
{
    rows = [];

    constructor(private calificacionRiesgoService: RatingRiskService)
    {

    }

    getCellClass({ row, column, value }): any {
      return {
        'is-yellow': value === 'Amarillo',
        'is-green': value === 'Verde',
        'is-red': value === 'Rojo'
      };
    }
}
