import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';

@Component({
    selector     : 'impact-dialog',
    templateUrl  : './impact-dialog.component.html',
    styleUrls    : ['./impact-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ImpactDialogComponent implements OnInit
{
    showExtraToFields = false;
    composeForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<ImpactDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any
    )
    {  }

    ngOnInit()
    {
    }


}
