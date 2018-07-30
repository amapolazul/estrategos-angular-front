import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { MatFormFieldModule } from '@angular/material/form-field'


import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

@Component({
    selector   : 'fuse-sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class FuseSampleComponent
{

    constructor(private fuseTranslationLoader: FuseTranslationLoaderService,private formBuilder: FormBuilder)
    {
        this.fuseTranslationLoader.loadTranslations(english, turkish);
    }
}
