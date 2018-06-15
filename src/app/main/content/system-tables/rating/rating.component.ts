import {Component, OnInit} from '@angular/core';
import { RatingDialogComponent } from '../rating/dialog/rating-dialog.component';
import { MatDialog } from '@angular/material';
import { RatingRiskService } from '../rating/service/rating-risk.service';

@Component({
    selector: 'risk-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss']
})
export class SystemRatingComponent implements OnInit{
  ratingTypes: any[];
  dialogRef: any;
  loadingIndicator = true;
  reorderable = true;

  constructor(private ratingRiskService: RatingRiskService, public dialog: MatDialog) {

  }

  ngOnInit(){
    this.ratingRiskService.getRatingRisk().subscribe((data: any) => {
      this.ratingTypes = data;
      this.loadingIndicator = false;
    });
  }

  ratingDialog(){
    this.dialogRef = this.dialog.open(RatingDialogComponent, {
      panelClass: 'rating-dialog'
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {

      });
  }
}
