import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirectoryPageRoutingModule } from './directory-routing.module';

import { DirectoryPage } from './directory.page';
import {HeaderFooterModule} from '../../components/header-footer/header-footer.module';
import {IonicSelectableModule} from 'ionic-selectable';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DirectoryPageRoutingModule,
        HeaderFooterModule,
        IonicSelectableModule
    ],
  declarations: [DirectoryPage]
})
export class DirectoryPageModule {}
