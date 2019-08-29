/*
 * This file is used to provide Angular information about all the custom componets and modules
 * It declares them, imports them so that we don't have to import each module in every other module where we need it
 */

import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [ComponentsModule,
        HttpClientModule]
})
export class SharedModule { }