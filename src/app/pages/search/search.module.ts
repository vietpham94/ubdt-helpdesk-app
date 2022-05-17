import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import {HeaderFooterModule} from '../../components/header-footer/header-footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    SearchPageRoutingModule,
    HeaderFooterModule
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
