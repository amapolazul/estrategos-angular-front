import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector   : 'characterization-classes',
    templateUrl: './characterization.component.html',
    styleUrls  : ['./characterization.component.scss']
})
export class CharacterizationComponent
{
    rows: any[];
    loadingIndicator = true;
    reorderable = true;

    constructor(private http: HttpClient)
    {

    }

    ngOnInit(){
        this.http.get('api/product')
            .subscribe((product: any) => {
                this.rows = product;
                this.loadingIndicator = false;
            });
    }
}
