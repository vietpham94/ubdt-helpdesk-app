import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchResultPageRoutingModule } from './search-result-routing.module';

import { SearchResultPage } from './search-result.page';
import {HeaderFooterModule} from '../../components/header-footer/header-footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchResultPageRoutingModule,
    HeaderFooterModule
  ],
  declarations: [SearchResultPage]
})
export class SearchResultPageModule {}
