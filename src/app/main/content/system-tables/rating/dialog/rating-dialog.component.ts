import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';

@Component({
    selector     : 'rating-dialog',
    templateUrl  : './rating-dialog.component.html',
    styleUrls    : ['./rating-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RatingDialogComponent implements OnInit
{
    showExtraToFields = false;
    composeForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<RatingDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any
    )
    {  }

    ngOnInit()
    {
    }


}
