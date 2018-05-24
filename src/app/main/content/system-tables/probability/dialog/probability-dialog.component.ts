import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';

@Component({
    selector     : 'probability-dialog',
    templateUrl  : './probability-dialog.component.html',
    styleUrls    : ['./probability-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProbabilityDialogComponent implements OnInit
{
    showExtraToFields = false;
    composeForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<ProbabilityDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any
    )
    {  }

    ngOnInit()
    {
    }


}
