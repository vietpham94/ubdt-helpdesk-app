import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IonicSelectableModule } from 'ionic-selectable';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import {HeaderFooterModule} from '../../components/header-footer/header-footer.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IonicSelectableModule,
        HomePageRoutingModule,
        HeaderFooterModule
    ],
  declarations: [HomePage]
})
export class HomePageModule {}
