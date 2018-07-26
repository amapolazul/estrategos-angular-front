import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'causas-declaracion-dialog',
  templateUrl: './causas-declaracion.component.html',
  styleUrls: ['./causas-declaracion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CausasDeclaracionComponent implements OnInit {
  restData: any;
  composeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CausasDeclaracionComponent>,

    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
  }

  ngOnInit() {
    this.composeForm = this.formBuilder.group({
      causa: [''],
      descripcion: ['']
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

}
