import { Injectable } from '@angular/core';
import {AlertController} from '@ionic/angular';
import { SearchConditions } from 'src/app/interfaces/search-conditions';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  searchConditions: SearchConditions;

  constructor(
    private alertController: AlertController
  ) { }

  async presentAlert(
    headerStr: string,
    messageStr: string,
    buttonArr: Array<any> = ['Xác nhận'],
    subHeaderStr = '',
    customClass = 'error-alert'
  ) {
    const alert = await this.alertController.create({
      header: headerStr,
      subHeader: subHeaderStr,
      message: messageStr,
      cssClass: customClass,
      buttons: buttonArr,
    });

    await alert.present();

    const {role} = await alert.onDidDismiss();

    return role;
  }
}
