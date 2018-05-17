import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { MatFormFieldModule } from '@angular/material/form-field'

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
