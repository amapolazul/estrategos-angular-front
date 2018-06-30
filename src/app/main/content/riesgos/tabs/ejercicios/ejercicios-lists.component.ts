import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {EjercicioService} from './service/ejercicio.service';
import {EjercicioDialogComponent} from './dialog/ejercicio-dialog.component';
import {Proceso} from '../../../processes/models/process.model';
import {EjercicioModel} from './model/ejercicio.model';

@Component({
  selector: 'ejercicios-lists',
  templateUrl: './ejercicios-lists.component.html',
  styleUrls: ['./ejercicios-lists.component.scss']
})
export class EjerciciosListsComponent  implements OnInit {

  rows: any[];
  temp: any[];
  dialogRef: any;
  loadingIndicator = true;

  @Input('proceso')
  process: Proceso;

  @Input('ejercicios')
  ejerciciosList: EjercicioModel[];

  constructor(private ejercicioService: EjercicioService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadingIndicator = false;
  }

  evaluacionDialog(){
      this.dialogRef = this.dialog.open(EjercicioDialogComponent, {
        panelClass: 'ejercicio-dialog',
        data: {
          proceso: this.process
        }
      });
      this.dialogRef.afterClosed()
        .subscribe(response => {
          this.listEjerciciosProceso();
        });
    }

  listEjerciciosProceso() {
    this.ejercicioService.getEjerciciosPorProceso(this.process.proceso_Id).subscribe((data) => {
      const ejerciciosProceso = <EjercicioModel[]> data;
      this.ejerciciosList = [...ejerciciosProceso];
      this.loadingIndicator = false;
    });
  }

  goToEjercicio(row: EjercicioModel) {
    alert('redirigiendo a ' + row.id);
  }
}
