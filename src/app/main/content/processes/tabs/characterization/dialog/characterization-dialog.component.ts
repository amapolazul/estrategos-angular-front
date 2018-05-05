import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';

@Component({
    selector     : 'characterization-dialog',
    templateUrl  : './characterization-dialog.component.html',
    styleUrls    : ['./characterization-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CharacterizationDialogComponent implements OnInit
{
    showExtraToFields = false;
    composeForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<CharacterizationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any
    )
    {  }

    ngOnInit()
    {
    }


}
