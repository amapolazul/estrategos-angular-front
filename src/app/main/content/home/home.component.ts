import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector   : 'fuse-sample',
    templateUrl: './home.component.html',
    styleUrls  : ['./home.component.scss']
})
export class HomeComponent
{

    constructor(private formBuilder: FormBuilder)
    {

    }

}
