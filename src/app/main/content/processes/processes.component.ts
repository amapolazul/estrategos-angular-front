import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../../../core/modules/material.module';

@Component({
    selector   : 'processes-classes',
    templateUrl: './processes.component.html',
    styleUrls  : ['./processes.component.scss']
})
export class ProcessesComponent
{
    constructor(private formBuilder: FormBuilder)
    {
    }

}
