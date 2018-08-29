
import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {EjercicioService} from './service/ejercicio.service';
import {EjercicioDialogComponent} from './dialog/ejercicio-dialog.component';
import {Proceso} from '../../../processes/models/process.model';
import {EjercicioModel} from './model/ejercicio.model';
import {FormType} from '../../../commons/form-type.enum';
import {DialogOverviewConfirmDialog} from '../../../../../../assets/angular-material-examples/dialog-confirm/dialog-confirm';
import {Router} from '@angular/router';
import {CustomSnackBarMessages} from '../../../commons/messages.service';

@Component({
  selector: 'ejercicios-lists',
  templateUrl: './ejercicios-lists.component.html',
  styleUrls: ['./ejercicios-lists.component.scss']
})
export class EjerciciosListsComponent  implements OnInit {

  rows: any[];
  temp: any[];
  dialogRef: any;
  dialogConfirm: any;
  loadingIndicator = true;

  @Input('proceso')
  process: Proceso;

  @Input('ejercicios')
  ejerciciosList: EjercicioModel[];

  constructor(private ejercicioService: EjercicioService,
              private router: Router,
              private customSnackBar: CustomSnackBarMessages,
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
    const ejercicio = row;
    console.log(ejercicio);
    this.dialogRef = this.dialog.open(EjercicioDialogComponent, {
      panelClass: 'ejercicio-dialog',
      data : {
        formType : FormType.edit,
        proceso: this.process,
        ejercicio: ejercicio
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (response) {
          this.listEjerciciosProceso();
        }
      });
  }

  delete(row, rowIndex) {
    if (row.estatus_id === 2) {
      console.log('acm1pt');
      this.customSnackBar.openSnackBar('No se permite borrar un ejercicio de evaluación de riesgo en estado culminado');
    } else {
      this.dialogConfirm = this.dialog.open(DialogOverviewConfirmDialog, {
        width: '250px',
        data: { name: row.descripcion }
      });
      this.dialogConfirm.afterClosed()
        .subscribe(response => {
          if (response) {
            this.deleteRow(response, row, rowIndex);
          }
        });
    }
  }

  deleteRow(result, row, rowIndex)  {
    if (result) {
      this.ejercicioService.deleteEjercicio(row.id).subscribe((data: any) => {
        if (rowIndex > -1) {
          this.ejerciciosList.splice(rowIndex, 1);
          this.ejerciciosList = [...this.ejerciciosList];

          this.customSnackBar.openSnackBar('Registro borrado correctamente');
        }
      }, error => {
        this.customSnackBar.openSnackBar('Ha ocurrido un error borrando el ejercicio de declaración de riesgo. ' +
          'Verifique que no existan riesgos asociados a este ejercicio');
      });
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
    this.router.navigate(['administracion-riesgos', row.id]);
  }
}
