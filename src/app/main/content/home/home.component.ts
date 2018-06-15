import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {NodeEvent, NodeMenuItemAction, TreeModel} from 'ng2-tree';
import {ProcessesService} from '../processes/services/processes.service';
import {Router} from '@angular/router';


@Component({
  template: '<tree [tree]="tree" #treeComponent (nodeSelected)="getSubNodes($event)" (menuItemSelected)="onMenuItemSelected($event)"></tree>'
})
export class HomeComponent implements AfterViewInit {

  tree: TreeModel = {
    value: 'Programming languages by programming paradigm',
    id: 1,
    children: [],
    settings : {
      rightMenu : true,
      menuItems: [
        { action: NodeMenuItemAction.Custom, name: 'Crear proceso', cssClass: 'fa fa-arrow-right' }
      ]
    }
  };

  constructor(private processesService: ProcessesService,
              private router: Router) {

  }

  @ViewChild('treeComponent') treeComponent;

  ngAfterViewInit(): void {

  }

  onMenuItemSelected(node: NodeEvent): void {
    this.router.navigate(['procesos', node.node.id]);
  }

  getSubNodes(node: NodeEvent): void {
    const nodeId = node.node.id;
    console.log(nodeId);
    this.processesService.getSubProcessByParentId(nodeId).subscribe((result) => {
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
