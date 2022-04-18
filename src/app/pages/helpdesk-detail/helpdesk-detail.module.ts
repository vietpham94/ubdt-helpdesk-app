import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpdeskDetailPageRoutingModule } from './helpdesk-detail-routing.module';

import { HelpdeskDetailPage } from './helpdesk-detail.page';
import {HeaderFooterModule} from '../../components/header-footer/header-footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpdeskDetailPageRoutingModule,
    HeaderFooterModule
  ],
  declarations: [HelpdeskDetailPage]
})
export class HelpdeskDetailPageModule {}
