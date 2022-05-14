import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectDetailPageRoutingModule } from './project-detail-routing.module';

import { ProjectDetailPage } from './project-detail.page';
import {HeaderFooterModule} from '../../components/header-footer/header-footer.module';
import {IonicSelectableModule} from 'ionic-selectable';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProjectDetailPageRoutingModule,
        HeaderFooterModule,
        IonicSelectableModule
    ],
  declarations: [ProjectDetailPage]
})
export class ProjectDetailPageModule {}
