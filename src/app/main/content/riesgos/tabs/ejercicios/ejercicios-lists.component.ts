import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {EjercicioService} from './service/ejercicio.service';
import {EjercicioDialogComponent} from './dialog/ejercicio-dialog.component';
import {Proceso} from '../../../processes/models/process.model';
import {EjercicioModel} from './model/ejercicio.model';
import {FormType} from '../../../commons/form-type.enum';
import {ImpactDialogComponent} from '../../../system-tables/impact/dialog/impact-dialog.component';

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

  edit(row, rowIndex){
    const process = row;
    this.dialogRef = this.dialog.open(EjercicioDialogComponent, {
      panelClass: 'ejercicio-dialog',
      data : {
        formType : FormType.edit,
        proceso: process
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        this.ejerciciosList[rowIndex] = response;
        this.ejerciciosList = [...this.ejerciciosList];
        this.loadingIndicator = false;
      });
  }

  delete(row, rowIndex)  {
    this.ejercicioService.deleteEjercicio(row.id).subscribe((data: any) => {
      console.log(data);
    });
    if (rowIndex > -1) {
      this.ejerciciosList.splice(rowIndex, 1);
      this.ejerciciosList = [...this.ejerciciosList];
    }
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
