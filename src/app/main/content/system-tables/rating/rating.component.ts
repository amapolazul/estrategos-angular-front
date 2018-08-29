import {Component, OnInit} from '@angular/core';
import {RatingDialogComponent} from '../rating/dialog/rating-dialog.component';
import {MatDialog} from '@angular/material';
import {RatingRiskService} from '../rating/service/rating-risk.service';
import {FormType} from '../../commons/form-type.enum';
import {DialogOverviewConfirmDialog} from '../../../../../assets/angular-material-examples/dialog-confirm/dialog-confirm';
import {CustomSnackBarMessages} from '../../commons/messages.service';

@Component({
  selector: 'risk-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class SystemRatingComponent implements OnInit {
  ratingTypes: any[];
  temp: any[];
  dialogRef: any;
  dialogConfirm: any;
  loadingIndicator = true;
  reorderable = true;

  constructor(private ratingRiskService: RatingRiskService,
              public dialog: MatDialog,
              private customSnackMessage: CustomSnackBarMessages) {

  }

  ngOnInit() {
    this.ratingTypes = [];
    this.ratingRiskService.getRatingRisk().subscribe((data: any) => {
      this.ratingTypes = data;
      this.temp = [...data];
      this.loadingIndicator = false;
    });
  }

  reloadTableServices() {
    this.ratingRiskService.getRatingRisk().subscribe((data: any) => {
      this.ratingTypes = data;
      this.temp = [...data];
      this.loadingIndicator = false;
    });
  }

  ratingDialog() {
    this.dialogRef = this.dialog.open(RatingDialogComponent, {
      panelClass: 'rating-dialog'
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (response) {
          this.reloadTableServices();
        }
      });
  }

  edit(row, rowIndex) {
    console.log(rowIndex);
    const product = row;
    this.dialogRef = this.dialog.open(RatingDialogComponent, {
      panelClass: 'rating-dialog',
      data: {
        formType: FormType.edit,
        product: product
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (response) {
          this.reloadTableServices();
        }
      });
  }

  delete(row, rowIndex) {
    this.dialogConfirm = this.dialog.open(DialogOverviewConfirmDialog, {
      width: '250px',
      data: {name: row.nombre_calificacion_riesgo}
    });
    this.dialogConfirm.afterClosed()
      .subscribe(response => {
        console.log(response);
        this.deleteRow(response, row, rowIndex);
      });

  }

  deleteRow(result, row, rowIndex) {
    if (result) {
      this.ratingRiskService.deleteRatingRisk(row.id).subscribe((data: any) => {
        console.log(data);
        if (rowIndex > -1) {
          this.ratingTypes.splice(rowIndex, 1);
          this.ratingTypes = [...this.ratingTypes];
          this.customSnackMessage.openSnackBar('Registro eliminado');
        }
      }, (err: any) => {
        this.customSnackMessage.openSnackBar('Ocurrio un error eliminando el registro de la tabla');
      });
    }
  }

  getCellClass(row): any {
    return {
      'is-yellow': row.color === 'Amarillo',
      'is-green': row.color === 'Verde',
      'is-red': row.color === 'Rojo'
    };
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d) {
      return d.nombre_calificacion_riesgo.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.ratingTypes = temp;
  }
}
