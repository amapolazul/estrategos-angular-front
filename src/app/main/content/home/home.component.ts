import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {NodeEvent, TreeModel} from 'ng2-tree';
import {ProcessesService} from '../processes/services/processes.service';
import {forEach} from '@angular/router/src/utils/collection';


@Component({
  template: '<tree [tree]="tree" #treeComponent (nodeSelected)="getSubNodes($event)"></tree>'
})
export class HomeComponent implements AfterViewInit {
  tree: TreeModel = {
    value: 'Programming languages by programming paradigm',
    id: 1,
    children: [

    ]
  };

  constructor(private processesService: ProcessesService) {

  }

  @ViewChild('treeComponent') treeComponent;

  ngAfterViewInit(): void {

  }

  getSubNodes(node: NodeEvent): void {
    const nodeId = node.node.id;
    console.log(nodeId);
    this.processesService.getSubProcessByParentId(nodeId).subscribe( (result) => {
      const oopNodeController = this.treeComponent.getControllerByNodeId(nodeId);

      const newChildren: Array<TreeModel> = result.map(x => {
        return {value: x.proceso_Nombre, id: x.proceso_Id, children: []};
      });

      oopNodeController.setChildren(newChildren);
      oopNodeController.reloadChildren();
      oopNodeController.expand();

    });
  }
}
