import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';

@Component({
    selector     : 'characterization-info-dialog',
    templateUrl  : './characterization-info-dialog.component.html',
    styleUrls    : ['./characterization-info-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CharacterizationInfoDialogComponent implements OnInit
{
    showExtraToFields = false;
    composeForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<CharacterizationInfoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any
    )
    {  }

    ngOnInit()
    {
    }


}
