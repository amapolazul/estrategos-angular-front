import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseNavigationModule, FuseSearchBarModule, FuseShortcutsModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { FuseContentModule } from 'app/main/content/content.module';
import { FuseFooterModule } from 'app/main/footer/footer.module';
import { FuseNavbarModule } from 'app/main/navbar/navbar.module';
import { FuseQuickPanelModule } from 'app/main/quick-panel/quick-panel.module';
import { FuseToolbarModule } from 'app/main/toolbar/toolbar.module';
import { FuseMainComponent } from './main.component';
import { ProcessesService } from './content/processes/services/processes.service';
import { TypesRiskService } from './content/system-tables/types/service/types-risk.service';
import { ResponsablesService } from './content/responsables/responsables.service';
import { ProbabilityRiskService } from './content/system-tables/probability/service/probability-risk.service';
import { ImpactRiskService } from './content/system-tables/impact/service/impact-risk.service';
import { CausesRiskService } from './content/system-tables/causes/service/causes-risk.service';
import { RatingRiskService } from './content/system-tables/rating/service/rating-risk.service';
import {CustomSnackBarMessages} from './content/commons/messages.service';
import {EjercicioService} from './content/riesgos/tabs/ejercicios/service/ejercicio.service';
import {ResponseRiskService} from './content/system-tables/response/service/response-risk.service';
import {ControlsRiskService} from './content/system-tables/controls/service/controls-risk.service';
import {ProcessCache} from './content/processes/services/process-cache.service';
import {RiesgosServices} from './content/riesgos/services/riesgos-services';
import {DeclaracionEstadoService} from './content/riesgos/tabs/administracion/declaracion/tabs/declaracion/service/declaracion-estados.service';

@NgModule({
    declarations: [
        FuseMainComponent,
    ],
    imports     : [
        RouterModule,
        MatSidenavModule,
        FuseSharedModule,
        FuseThemeOptionsModule,
        FuseNavigationModule,
        FuseSearchBarModule,
        FuseShortcutsModule,
        FuseSidebarModule,
        FuseContentModule,
        FuseFooterModule,
        FuseNavbarModule,
        FuseQuickPanelModule,
        FuseToolbarModule,
    ],

    providers: [
        ProcessesService,
        TypesRiskService,
        ResponsablesService,
        ProbabilityRiskService,
        ImpactRiskService,
        CausesRiskService,
        RatingRiskService,
        EjercicioService,
        ResponseRiskService,
        ControlsRiskService,
        ProcessCache,
        CustomSnackBarMessages,
        RiesgosServices,
        DeclaracionEstadoService
    ],
    exports     : [
        FuseMainComponent
    ]
})
export class FuseMainModule
{

}
