import {Component, OnInit} from '@angular/core';
import {RatingDialogComponent} from '../rating/dialog/rating-dialog.component';
import {MatDialog} from '@angular/material';
import {RatingRiskService} from '../rating/service/rating-risk.service';
import {FormType} from '../../commons/form-type.enum';

@Component({
  selector: 'risk-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class SystemRatingComponent implements OnInit {
  ratingTypes: any[];
  temp: any[];
  dialogRef: any;
  loadingIndicator = true;
  reorderable = true;

  constructor(private ratingRiskService: RatingRiskService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.ratingTypes = [];
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
        this.ratingTypes.push(response);
        this.ratingTypes = [...this.ratingTypes];
        this.loadingIndicator = false;
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
        console.log(response);
        this.ratingTypes[rowIndex] = response;
        this.ratingTypes = [...this.ratingTypes];
        this.loadingIndicator = false;
      });
  }

  delete(row, rowIndex) {
    this.ratingRiskService.deleteRatingRisk(row.id).subscribe((data: any) => {
      console.log(data);
    });
    if (rowIndex > -1) {
      this.ratingTypes.splice(rowIndex, 1);
      this.ratingTypes = [...this.ratingTypes];
    }
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function(d) {
      return d.nombre_calificacion_riesgo.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.ratingTypes = temp;
  }
}
