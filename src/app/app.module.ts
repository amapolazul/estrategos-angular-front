import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { SharedModule } from './core/modules/shared.module';
import { fuseConfig } from './fuse-config';

import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { HomeModule } from './main/content/home/home.module';
import { ProcessesModule } from './main/content/processes/processes.module';
import { SystemTablesModule } from './main/content/system-tables/system-tables.module';
import { FuseAngularMaterialModule } from '../app/main/content/components/angular-material/angular-material.module';
import { RiesgosModule } from './main/content/riesgos/riesgos.module';

const appRoutes: Routes = [
    {
        path: 'cargar-procesos',
        loadChildren: './main/content/processes/processes.module#ProcessesModule'
    },
    {
        path: 'riesgos',
        loadChildren: './main/content/riesgos/riesgos.module#ProcessesModule'
    },
    {
        path: 'system-table',
        loadChildren: './main/content/system-tables/system-tables.module#SystemTablesModule'
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot(),
        SharedModule,
        // Fuse Main and Shared modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseMainModule,
        HomeModule,
        ProcessesModule,
        SystemTablesModule,
        RiesgosModule,
        FuseAngularMaterialModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
