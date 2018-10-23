import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuItemSelectedEvent, NodeEvent, NodeMenuItemAction, TreeModel} from 'ng2-tree';
import {ProcessesService} from '../processes/services/processes.service';
import {Router} from '@angular/router';
import {CustomSnackBarMessages} from '../commons/messages.service';
import { DialogOverviewConfirmDialog } from '../../../../assets/angular-material-examples/dialog-confirm/dialog-confirm';
import {MatDialog} from '@angular/material';
import {ProcesoCreateRequest} from '../processes/models/process.model';
declare let jsPDF;

@Component({
  templateUrl : './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dialogConfirm:any;
  tree: TreeModel = {
    value: 'Procesos / Sub-procesos',
    id: 1,
    children: [],
    settings : {
      rightMenu : true,
      menuItems: [
        { action: NodeMenuItemAction.Custom, name: 'Crear proceso', cssClass: 'fa fa-arrow-right' },
        { action: NodeMenuItemAction.Custom, name: 'Editar proceso', cssClass: 'fa fa-arrow-right' },
        { action: NodeMenuItemAction.Custom, name: 'Borrar proceso', cssClass: 'fa fa-arrow-right' },
      ]
    }
  };

  procesosArray: Array<ProcesoCreateRequest> = [];

  @ViewChild('treeComponent') treeComponent;

  constructor(private processesService: ProcessesService,
              private customSnackMessage: CustomSnackBarMessages,
              public dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    this.tree.emitLoadNextLevel = true;

    this.processesService.getProcesos().subscribe(procesos => {
      procesos.forEach(proceso => {
        this.processesService.getProcesoById(proceso.proceso_Id).subscribe(response => {
          this.procesosArray.push(response);
        });
      });
    });
  }

  onMenuItemSelected(event: MenuItemSelectedEvent): void {
    if (event.selectedItem.toString() === 'Editar proceso') {
      if (event.node.value === 'Procesos / Sub-procesos') {
        this.router.navigate(['procesos', event.node.id]);
      } else {
        this.router.navigate(['procesos/editar', event.node.id]);
      }
    } else if (event.selectedItem.toString() === 'Borrar proceso'){

      if (event.node.value === 'Procesos / Sub-procesos') {
        this.customSnackMessage.openSnackBar('No se permite borrar el proceso padre');
      } else {

        this.dialogConfirm = this.dialog.open(DialogOverviewConfirmDialog, {
          width: '250px',
          data: { name: event.node.value }
        });

        this.dialogConfirm.afterClosed()
          .subscribe(response => {
            this.deleteRow(response, event);
          });
      }

    } else {
      this.router.navigate(['procesos', event.node.id]);
    }
  }

  deleteRow( response, event ){
    if( response ){
      this.processesService.deleteProcessById(event.node.id ).subscribe(x => {
        this.customSnackMessage.openSnackBar('Registro de proceso borrado correctamente');
        event.node.removeItselfFromParent();
      }, y => {
        this.customSnackMessage.openSnackBar('Ha ocurrido un error borrando el registro de proceso');
      });
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

  download() {
    const doc = new jsPDF();
    this.procesosArray.forEach(x => {
      let separador = 10;
      doc.text('Proceso: ' + x.proceso.proceso_Nombre, 20, separador);
      separador = separador + 10;
      doc.text('Descripción: ' + x.proceso.proceso_Descripcion, 20, separador);
      separador = separador + 10;
      doc.text('Responsable: ' + x.proceso.proceso_Responsable_Id, 20, separador);
      separador = separador + 10;
      doc.text('Codigo: ' + x.proceso.proceso_Codigo, 20, separador);
      separador = separador + 20;

      const colsprod = ['Id', 'Producto Servicio', 'Codigo', 'Caracteristicas'];
      const rowsprod = [];

      const colscarac = ['Id', 'Codigo procedimiento', 'Objetivo'];
      const rowscarac = [];

      x.productoServicios.forEach(prodServ => {
        const temp = [
          prodServ.producto_Servicio_Id,
          prodServ.producto_Servicio_nombre,
          prodServ.producto_Servicio_Codigo,
          prodServ.producto_Caracteristicas
        ];
        rowsprod.push(temp);
      });

      x.caracterizaciones.forEach(caract => {
        const temp = [
          caract.caraceterizacion_id,
          caract.procedimiento_Codigo,
          caract.procedimiento_Objetivo
        ];
        rowscarac.push(temp);
      });

      doc.text('Productos Servicios', 20, separador);
      separador = separador + 10;

      doc.autoTable(colsprod, rowsprod, {
        startY: separador,
      });

      doc.text('Caracterizaciones', 20, doc.autoTable.previous.finalY + 10);

      doc.autoTable(colscarac, rowscarac, {
        startY: doc.autoTable.previous.finalY  + 20,
      });

      doc.addPage();
    });
    doc.save('procesos.pdf');
  }
}
