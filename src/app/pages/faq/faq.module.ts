import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IonicSelectableModule } from 'ionic-selectable';

import { FaqPageRoutingModule } from './faq-routing.module';

import { FaqPage } from './faq.page';
import {HeaderFooterModule} from '../../components/header-footer/header-footer.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IonicSelectableModule,
        FaqPageRoutingModule,
        HeaderFooterModule
    ],
  declarations: [FaqPage]
})
export class FaqPageModule {}
