import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'risk-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss']
})
export class SystemRatingComponent {
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
