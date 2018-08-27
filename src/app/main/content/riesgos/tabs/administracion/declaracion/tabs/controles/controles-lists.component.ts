import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ControlesDeclaracionComponent} from './dialog/controles-declaracion.component';
import {RiesgosCalculosService} from '../../../../../services/riesgos-calculos.service';
import {ControlsRiskService} from '../../../../../../system-tables/controls/service/controls-risk.service';
import {ControlsRiskModel} from '../../../../../../system-tables/controls/model/controls-risk.model';
import {CausasDeclaracionRiesgos, ControlesDeclaracionRiesgos} from '../../../../../models/riesgos.models';
import {FormType} from '../../../../../../commons/form-type.enum';
import {CausasDeclaracionComponent} from '../causas/dialog/causas-declaracion.component';

@Component({
    selector   : 'controles-lists',
    templateUrl: './controles-lists.component.html',
    styleUrls  : ['./controles-lists.component.scss']
})
export class ControlesListsComponent implements OnChanges
{
    dialogRef: any;
    dialogConfirm: any;
    puntajes = [];
    rows = [];
    efectividadTotal = 0;
    efectividadesRiesgo: ControlsRiskModel[];
    isEditing = true;

    @Input() controlesRiesgosEditar;
    @Output() actualizarEfectividad = new EventEmitter<string>();

    constructor(public dialog: MatDialog,
                private controlsRiskService: ControlsRiskService,
                private riesgosCalculosService: RiesgosCalculosService) {
      this.controlsRiskService.getControlsRisk().subscribe((data) => {
        this.efectividadesRiesgo = data;
      });
    }

    ngOnChanges() {
      if (this.controlesRiesgosEditar) {
        this.isEditing = true;
        this.controlesRiesgosEditar.forEach(control => {
          const efectividadControl = this.extraerEfectividadControl(control);
          const efectividadControlModel = efectividadControl.pop();
          control.efectividad_declaracion_string = this.controlsRiskService.getEfectividadString(efectividadControlModel);
          this.rows.push(control);
          this.puntajes.push(efectividadControlModel.puntaje);
        });

        this.calcularEfectividadTotal();
        this.rows = [...this.rows];
      }
    }

    extraerEfectividadControl(control: ControlesDeclaracionRiesgos) {
      return this.efectividadesRiesgo.filter(prob => prob.id === control.efectividad_riesgos_id);
    }

    controlesDialog() {
      this.dialogRef = this.dialog.open(ControlesDeclaracionComponent, {
        panelClass: 'controles-declaracion-dialog'
      });

      this.dialogRef.afterClosed().subscribe(response => {
        if (response) {
          this.rows.push(response.formInfo);
          this.puntajes.push(response.efectividadValue);
          this.calcularEfectividadTotal();
          this.rows = [...this.rows];
        }
      });
    }

    calcularEfectividadTotal() {
      if (this.puntajes.length > 0) {
        const suma = this.puntajes.reduce((x, y) => x + y);
        this.efectividadTotal = Math.round(suma / this.puntajes.length);
      } else {
        this.efectividadTotal = 0;
      }

      this.riesgosCalculosService.setEfectividadPromedio(this.efectividadTotal);
      this.actualizarEfectividad.next();
    }


    delete(row, rowIndex) {
      if (rowIndex > -1) {
        this.puntajes.splice(rowIndex, 1);
        this.rows.splice(rowIndex, 1);
        this.rows = [...this.rows];

        this.calcularEfectividadTotal();
      }
    }

  edit(row, rowIndex) {
    const control = row;
    this.dialogRef = this.dialog.open(ControlesDeclaracionComponent, {
      panelClass: 'controles-declaracion-dialog',
      disableClose: true,
      data: {
        formType: FormType.edit,
        control: control
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (response) {
          this.rows[rowIndex] = response.formInfo;
          this.puntajes[rowIndex] = response.efectividadValue;
          this.rows = [...this.rows];

          this.calcularEfectividadTotal();
        }
      });
  }
}
