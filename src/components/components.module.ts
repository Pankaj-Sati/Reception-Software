import { NgModule } from '@angular/core';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [DisclaimerComponent],
    entryComponents: [DisclaimerComponent],
    imports: [IonicModule],
    exports: [DisclaimerComponent]
})
export class ComponentsModule { }