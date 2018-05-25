import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RatingDialogComponent } from '../rating/dialog/rating-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'risk-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss']
})
export class SystemRatingComponent {
    rows: any[];
    dialogRef: any;
    loadingIndicator = true;
    reorderable = true;

    constructor(private http: HttpClient, public dialog: MatDialog)
    {

    }

    ngOnInit(){
        this.http.get('api/product')
            .subscribe((product: any) => {
                this.rows = product;
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
