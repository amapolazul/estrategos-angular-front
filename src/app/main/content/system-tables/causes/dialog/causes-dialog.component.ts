import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';

@Component({
    selector     : 'causes-risk-dialog',
    templateUrl  : './causes-dialog.component.html',
    styleUrls    : ['./causes-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CausesDialogComponent implements OnInit
{
    showExtraToFields = false;
    composeForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<CausesDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any
    )
    {  }

    ngOnInit()
    {
    }


}
