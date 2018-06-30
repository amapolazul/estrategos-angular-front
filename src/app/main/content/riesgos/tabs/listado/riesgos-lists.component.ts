import { Component } from '@angular/core';

@Component({
    selector   : 'riesgos-lists',
    templateUrl: './riesgos-lists.component.html',
    styleUrls  : ['./riesgos-lists.component.scss']
})
export class RiesgosListsComponent
{
    rows = [
      {
        'alerta'       : 'Costos de producción',
        'probabilidad' : 'Media (3)',
        'impacto'      : 'Alto (4)',
        'severidad'    : '12',
        'estatus'      : 'Pendiente',
        'fecha_ultimo_ejercicio' : '04-06-2018'
      },
      {
        'alerta'       : 'producción',
        'probabilidad' : 'Media (3)',
        'impacto'      : 'Alto (4)',
        'severidad'    : '12',
        'estatus'      : 'Mitigado',
        'fecha_ultimo_ejercicio' : '13-06-2018'
      },
      {
        'alerta'       : 'Activiades de compras',
        'probabilidad' : 'Baja (1)',
        'impacto'      : 'Media (3)',
        'severidad'    : '76',
        'estatus'      : 'Pendiente',
        'fecha_ultimo_ejercicio' : '21-06-2018'
      }];

    constructor()
    {

    }
}
