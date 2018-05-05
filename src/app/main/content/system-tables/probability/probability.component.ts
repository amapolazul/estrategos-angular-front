import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'risk-probability',
    templateUrl: './probability.component.html',
    styleUrls: ['./probability.component.scss']
})
export class SystemProbabilityComponent {
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
