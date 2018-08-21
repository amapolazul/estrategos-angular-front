import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {EfectosDeclaracionComponent} from './dialog/efectos-declaracion.component';
import {RiesgosCalculosService} from '../../../../../services/riesgos-calculos.service';
import {ImpactRiskService} from '../../../../../../system-tables/impact/service/impact-risk.service';
import {CausasDeclaracionRiesgos, EfectosDeclaracionRiesgos} from '../../../../../models/riesgos.models';
import {ImpactRiskModel} from '../../../../../../system-tables/impact/model/impact-risk.model';
import {FormType} from '../../../../../../commons/form-type.enum';
import {ControlesDeclaracionComponent} from '../controles/dialog/controles-declaracion.component';

@Component({
    selector   : 'efectos-lists',
    templateUrl: './efectos-lists.component.html',
    styleUrls  : ['./efectos-lists.component.scss']
})
export class EfectosListsComponent implements OnChanges
{
    rows = [];
    puntajes = [];

    dialogRef: any;

    impactoTotal: number;
    impactos: ImpactRiskModel[];

    isEditing = false;

    @Input() efectosRiesgoEditar;
    @Output() actualizarImpacto = new EventEmitter<string>();

    constructor(public dialog: MatDialog,
                private riesgosCauculosService: RiesgosCalculosService,
                private impactoRiesgoService: ImpactRiskService) {
      this.impactoTotal = 0;

      this.impactoRiesgoService.getImpactRisk().subscribe(response => {
        this.impactos = response;
      });
    }

    ngOnChanges() {
      if (this.efectosRiesgoEditar) {
        this.isEditing = true;
        this.efectosRiesgoEditar.forEach(efecto => {
          const impactoEfecto = this.extraerEfectoImpacto(efecto);
          const impactoRiskModel = impactoEfecto.pop();
          efecto.efecto_declaracion_string = this.impactoRiesgoService.getImpactoString(impactoRiskModel);
          this.rows.push(efecto);
          this.puntajes.push(impactoRiskModel.puntaje);
        });

        this.calcularImpactoTotal();
        this.rows = [...this.rows];
      }
    }

    extraerEfectoImpacto(efecto: EfectosDeclaracionRiesgos) {
        return this.impactos.filter(impacto => impacto.id === efecto.impacto_riesgos_id);
      }


    efectosDialog() {
        this.dialogRef = this.dialog.open(EfectosDeclaracionComponent, {
          panelClass: 'efectos-declaracion-dialog'
        });

        this.dialogRef.afterClosed().subscribe(response => {
          if (response) {
            this.rows.push(response.formInfo);
            this.puntajes.push(response.impactoValue);
            this.calcularImpactoTotal();
            this.rows = [...this.rows];
          }
        });
      }

      calcularImpactoTotal() {
        if (this.puntajes.length > 0) {
          const suma = this.puntajes.reduce((x, y) => x + y);
          this.impactoTotal = Math.ceil(suma / this.puntajes.length);
        } else {
          this.impactoTotal = 0;
        }

        this.riesgosCauculosService.setImpactoPromedio(this.impactoTotal);
        this.actualizarImpacto.next();
      }


      delete(row, rowIndex) {
        if (rowIndex > -1) {
          this.puntajes.splice(rowIndex, 1);
          this.rows.splice(rowIndex, 1);
          this.rows = [...this.rows];

          this.calcularImpactoTotal();
        }
      }

  edit(row, rowIndex) {
    const efecto = row;
    this.dialogRef = this.dialog.open(EfectosDeclaracionComponent, {
      panelClass: 'efectos-declaracion-dialog',
      disableClose: true,
      data: {
        formType: FormType.edit,
        efecto: efecto
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (response) {
          this.rows[rowIndex] = response.formInfo;
          this.puntajes[rowIndex] = response.impactoValue;
          this.rows = [...this.rows];

          this.calcularImpactoTotal();
        }
      });
  }
}
