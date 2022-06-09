import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaqDetailPageRoutingModule } from './faq-detail-routing.module';
import { FaqDetailPage } from './faq-detail.page';
import {HeaderFooterModule} from '../../components/header-footer/header-footer.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FaqDetailPageRoutingModule,
        HeaderFooterModule
    ],
  declarations: [FaqDetailPage]
})
export class FaqDetailPageModule {}
