import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClientEntryPage } from './client-entry.page';
import { BrMaskerModule, BrMaskDirective } from 'br-mask';

const routes: Routes = [
  {
    path: '',
    component: ClientEntryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
        IonicModule,
        BrMaskerModule,
    RouterModule.forChild(routes)
  ],
    declarations: [ClientEntryPage],


})
export class ClientEntryPageModule {}
