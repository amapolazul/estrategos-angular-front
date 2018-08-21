import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuItemSelectedEvent, NodeEvent, NodeMenuItemAction, TreeModel} from 'ng2-tree';
import {ProcessesService} from '../processes/services/processes.service';
import {Router} from '@angular/router';


@Component({
  template: '<tree [tree]="tree" #treeComponent (nodeSelected)="getSubNodes($event)" (menuItemSelected)="onMenuItemSelected($event)"></tree>'
})
export class HomeComponent implements OnInit {

  tree: TreeModel = {
    value: 'Procesos / Sub-procesos',
    id: 1,
    children: [],
    settings : {
      rightMenu : true,
      menuItems: [
        { action: NodeMenuItemAction.Custom, name: 'Crear proceso', cssClass: 'fa fa-arrow-right' },
        { action: NodeMenuItemAction.Custom, name: 'Editar proceso', cssClass: 'fa fa-arrow-right' }
      ]
    }
  };

  @ViewChild('treeComponent') treeComponent;

  constructor(private processesService: ProcessesService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.tree.emitLoadNextLevel = true;
  }

  onMenuItemSelected(event: MenuItemSelectedEvent): void {
    if (event.selectedItem.toString() === 'Editar proceso') {
      if (event.node.value === 'Procesos / Sub-procesos') {
        this.router.navigate(['procesos', event.node.id]);
      } else {
        this.router.navigate(['procesos/editar', event.node.id]);
      }
    } else {
      this.router.navigate(['procesos', event.node.id]);
    }
  }

  getSubNodes(node: NodeEvent): void {
    const nodeId = node.node.id;
    this.processesService.getSubProcessByParentId(nodeId).subscribe((result) => {
      const oopNodeController = this.treeComponent.getControllerByNodeId(nodeId);

      const newChildren: Array<TreeModel> = result.map(x => {
        return {value: x.proceso_Nombre, id: x.proceso_Id, children: []};
      });

      oopNodeController.setChildren(newChildren);
      oopNodeController.expand();
    });
  }
}
