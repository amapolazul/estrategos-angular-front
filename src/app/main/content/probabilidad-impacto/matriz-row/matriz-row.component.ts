import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-matriz-row]',
  templateUrl: './matriz-row.component.html',
  styleUrls: ['./matriz-row.component.scss']
})
export class MatrizRowComponent implements OnInit {

  @Input() contend: any;
  @Input() rowdata: string[];

  constructor() { }

  ngOnInit() {
  }

}
