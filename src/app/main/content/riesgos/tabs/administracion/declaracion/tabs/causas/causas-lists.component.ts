import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CausasDeclaracionComponent} from './dialog/causas-declaracion.component';
import {DialogOverviewConfirmDialog} from '../../../../../../../../../assets/angular-material-examples/dialog-confirm/dialog-confirm';
import {RiesgosCalculosService} from '../../../../../services/riesgos-calculos.service';
import {ProbabilityRiskService} from '../../../../../../system-tables/probability/service/probability-risk.service';
import {ProbabilityRiskModel} from '../../../../../../system-tables/probability/model/probability-risk.model';
import {CausasDeclaracionRiesgos} from '../../../../../models/riesgos.models';
import {FormType} from '../../../../../../commons/form-type.enum';
import {CharacterizationDialogComponent} from '../../../../../../processes/tabs/characterization/dialog/edit-dialog/characterization-dialog.component';
import {CausesRiskModel} from '../../../../../../system-tables/causes/model/causes-risk.model';
import {CausesRiskService} from '../../../../../../system-tables/causes/service/causes-risk.service';

@Component({
    selector   : 'causas-lists',
    templateUrl: './causas-lists.component.html',
    styleUrls  : ['./causas-lists.component.scss']
})
export class CausasListsComponent implements OnInit, OnChanges
{
    dialogRef: any;
    dialogConfirm: any;

    puntajes = [];
    rows = [];
    probabilidadTotal: number;
    probabilidadesRiesgo: ProbabilityRiskModel[];
    causasRiesgo: CausesRiskModel[];
    isEditing = false;

    causasEliminar = [];

    @Input() causasInput;
    @Output() actualizarProbabilidad = new EventEmitter<string>();

    constructor(public dialog: MatDialog,
                private riesgosCalculos: RiesgosCalculosService,
                private probabilityRiskService: ProbabilityRiskService,
                private causesRiskService: CausesRiskService) {
      this.probabilidadTotal = 0;
      this.probabilityRiskService.getProbabilityRisk().subscribe((data) => {
        this.probabilidadesRiesgo = data;
      });
      // Carga las causas
      this.causesRiskService.getCausesRisk().subscribe((causas) => {
        this.causasRiesgo = causas;
      });
    }

    ngOnInit() {

    }

    ngOnChanges() {
      if (this.causasInput) {
        this.isEditing = true;
        this.causasInput.forEach(causa => {
          const probabilidadCausa = this.extraerProbabilidadCausa(causa);
          const probabilityRiskModel = probabilidadCausa.pop();
          causa.probabilidad_string = this.probabilityRiskService.getProbabilidadString(probabilityRiskModel);
          causa.causa_string = this.extraerCausa(causa);
          this.rows.push(causa);
          this.puntajes.push(probabilityRiskModel.puntaje);
        });

        this.calcularProbabilidadTotal();
        this.rows = [...this.rows];
      }
    }

    extraerCausa(causa: CausasDeclaracionRiesgos) {
      console.log(causa);
      console.log(this.causasRiesgo.find(x => x.id === causa.id).causa_riesgo);
      return this.causasRiesgo.find(x => x.id === causa.causa).causa_riesgo;
    }

    extraerProbabilidadCausa(causa: CausasDeclaracionRiesgos) {
      return this.probabilidadesRiesgo.filter(prob => prob.id === causa.probabilidad_riesgo_id);
    }

    causasDialog() {
      this.dialogRef = this.dialog.open(CausasDeclaracionComponent, {
        panelClass: 'causas-declaracion-dialog'
      });

      this.dialogRef.afterClosed().subscribe(response => {
        if (response) {
          this.rows.push(response.formInfo);
          this.puntajes.push(response.probabilidadValue);
          this.calcularProbabilidadTotal();
          this.rows = [...this.rows];
        }
      });
    }

    calcularProbabilidadTotal() {
      if (this.puntajes.length > 0) {
        const suma = this.puntajes.reduce((x, y) => parseInt(x) + parseInt(y));
        this.probabilidadTotal = Math.round(suma / this.puntajes.length);

      } else {
        this.probabilidadTotal = 0;
      }
      this.riesgosCalculos.setProbabilidadPromedio(this.probabilidadTotal);
      this.actualizarProbabilidad.next('');
    }

    delete(row, rowIndex) {
      if (rowIndex > -1) {
        this.puntajes.splice(rowIndex, 1);
        this.rows.splice(rowIndex, 1);
        this.rows = [...this.rows];

        this.causasEliminar.push(row.id);
        this.calcularProbabilidadTotal();
      }
    }

  edit(row, rowIndex) {
    const causa = row;
    this.dialogRef = this.dialog.open(CausasDeclaracionComponent, {
      panelClass: 'causas-declaracion-dialog',
      disableClose: true,
      data: {
        formType: FormType.edit,
        causa: causa
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (response) {
          this.rows[rowIndex] = response.formInfo;
          this.puntajes[rowIndex] = response.probabilidadValue;
          this.rows = [...this.rows];

          this.calcularProbabilidadTotal();
        }
      });
  }
}
