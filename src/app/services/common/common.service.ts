import {Injectable} from '@angular/core';

import {AlertButton, AlertController, AlertInput, ModalController, ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private alertController: AlertController,
    private toastCtrl: ToastController,
    private modalController: ModalController,
  ) {
  }

  async presentAlert(
    headerStr: string,
    messageStr: string,
    buttonArr: (AlertButton | string)[] = ['Xác nhận'],
    subHeaderStr = '',
    customClass: string | string[] = 'error-alert',
    inputs: AlertInput[] = [],
    animated = true,
  ) {
    const popover = await this.alertController.getTop();
    if (popover) {
      await this.alertController.dismiss();
    }

    const alert = await this.alertController.create({
      header: headerStr,
      subHeader: subHeaderStr,
      message: messageStr,
      cssClass: customClass,
      buttons: buttonArr,
      inputs: inputs,
      animated: animated,
      mode: 'ios'
    });

    await alert.present();

    const {role} = await alert.onDidDismiss();

    return role;
  }

  public async presentModal(component, componentProps) {
    const popover = await this.alertController.getTop();
    if (popover) {
      await this.alertController.dismiss();
    }

    const modal = await this.modalController.create({
      component: component,
      componentProps: componentProps,
      initialBreakpoint: 0.5,
      breakpoints: [0, 0.5, 1]
    });

    await modal.present();

    return modal.onDidDismiss();
  }

  public async showToast(option) {
    const popover = await this.toastCtrl.getTop()
    if (popover) {
      await this.toastCtrl.dismiss();
    }

    const toast = await this.toastCtrl.create(option);
    await toast.present();
    const {role} = await toast.onDidDismiss();
    return role;
  }
}
