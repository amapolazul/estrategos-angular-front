import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'process-classes',
    templateUrl: './process.component.html',
    styleUrls: ['./process.component.scss']
})
export class ProcessComponent {
    form: FormGroup;
    formErrors: any;

    processForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.formErrors = {
            process: {},
            processcode: {},
            description: {},
            procesType: {},
            responsible: {},
            responsible2: {},
            document: {}
        };
    }
    
    ngOnInit(){

        this.processForm = this.formBuilder.group({
            process     : ['', Validators.required],
            processcode : ['', Validators.required],
            description : ['', Validators.required],
            procesType  : ['', Validators.required],
            responsible : ['', Validators.required],
            responsible2: ['', Validators.required],
            document    : ['', Validators.required]
        });
    }
}
