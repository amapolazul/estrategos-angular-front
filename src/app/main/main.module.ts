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
import {ResponsablesService} from './content/responsables/responsables.service';

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
        ResponsablesService
    ],
    exports     : [
        FuseMainComponent
    ]
})
export class FuseMainModule
{

}
