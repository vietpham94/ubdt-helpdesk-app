import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuggestionPageRoutingModule } from './suggestion-routing.module';

import { SuggestionPage } from './suggestion.page';
import {HeaderFooterModule} from '../../components/header-footer/header-footer.module';
import {IonicSelectableModule} from 'ionic-selectable';
import {RecaptchaModule} from 'ng-recaptcha';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IonicSelectableModule,
        SuggestionPageRoutingModule,
        HeaderFooterModule,
        RecaptchaModule
    ],
  declarations: [SuggestionPage]
})
export class SuggestionPageModule {}
