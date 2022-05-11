import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IonLoaderService {

  constructor(
    public loadingController: LoadingController
  ) {
  }

  openLoader() {
    this.loadingController.create({
      spinner: 'lines',
      cssClass: 'spinner-green',
      message: 'Đang xử lý...'
    }).then((response) => {
      return response.present();
    });
  }

  dismissLoader() {
    return this.loadingController.dismiss();
  }
}
