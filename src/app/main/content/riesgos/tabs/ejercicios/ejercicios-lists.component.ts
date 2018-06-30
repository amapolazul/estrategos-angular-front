import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {EjercicioService} from './service/ejercicio.service';
import {EjercicioDialogComponent} from './dialog/ejercicio-dialog.component';

@Component({
  selector: 'ejercicios-lists',
  templateUrl: './ejercicios-lists.component.html',
  styleUrls: ['./ejercicios-lists.component.scss']
})
export class EjerciciosListsComponent  implements OnInit {

  rows: any[];
  temp: any[];
  ejerciciosList: any[];
  dialogRef: any;
  loadingIndicator = true;

  constructor(private ejercicioService: EjercicioService ,public dialog: MatDialog) {
  }

    ngOnInit() {

      this.ejerciciosList = [];
      this.ejercicioService.getEjercicio().subscribe((data: any) => {
        this.ejerciciosList = data;
        this.temp = [...data];
        this.loadingIndicator = false;
      });

    }

  evaluacionDialog(){
      this.dialogRef = this.dialog.open(EjercicioDialogComponent, {
        panelClass: 'ejercicio-dialog'
      });
      this.dialogRef.afterClosed()
        .subscribe(response => {
          this.ejerciciosList.push(response);
          this.ejerciciosList = [...this.ejerciciosList];
          this.loadingIndicator = false;
        });
    }

  }
