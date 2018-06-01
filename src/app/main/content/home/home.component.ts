import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TreeModel, NodeEvent } from 'ng2-tree';

@Component({
    selector   : 'fuse-sample',
    templateUrl: './home.component.html',
    styleUrls  : ['./home.component.scss'],
    template: `<tree [tree]="tree" (nodeSelected)="logEvent($event)"></tree>`
})
export class HomeComponent
{


    public tree: TreeModel = {
      value: 'Programming languages by programming paradigm',
      children: [
        {
          value: 'Object-oriented programming',
          children: [{ value: 'Java' }, { value: 'C++' }, { value: 'C#' }]
        },
        {
          value: 'Prototype-based programming',
          children: [{ value: 'JavaScript' }, { value: 'CoffeeScript' }, { value: 'Lua' }]
        }
      ]
    };

    // 3 - print caught event to the console
    public logEvent(e: NodeEvent): void {
      console.log(e);
    }

    constructor(private formBuilder: FormBuilder)
    {

    }

}
