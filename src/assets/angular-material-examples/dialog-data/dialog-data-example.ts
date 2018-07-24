import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

/**
 * @title Injecting data when opening a tabs-riesgo
 */
@Component({
    selector   : 'dialog-data-example',
    templateUrl: 'dialog-data-example.html'
})
export class DialogDataExample
{
    constructor(public dialog: MatDialog)
    {
    }

    openDialog()
    {
        this.dialog.open(DialogDataExampleDialog, {
            data: {
                animal: 'panda'
            }
        });
    }
}

@Component({
    selector   : 'dialog-data-example-dialog',
    templateUrl: 'dialog-data-example-dialog.html'
})
export class DialogDataExampleDialog
{
    constructor(@Inject(MAT_DIALOG_DATA) public data: any)
    {
    }
}
