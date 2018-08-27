import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'dialog-confirm',
  templateUrl: 'dialog-confirm.html'
})
export class DialogOverviewConfirm {
  name: string;

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewConfirmDialog, {
      width: '300px',
      data: {
        name: this.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The tabs-riesgo was closed');
      this.name = result;
    });
  }

}

@Component({
  selector: 'dialog-confirm-dialog',
  templateUrl: 'dialog-confirm-dialog.html'
})
export class DialogOverviewConfirmDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
