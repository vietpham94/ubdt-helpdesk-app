import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {CommonService} from '../../services/common/common.service';
import {AuthService} from '../../services/auth/auth.service';
import {IonLoaderService} from '../../services/common/ion-loader.service';

import {Constants} from '../../common/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: { username: string; password: string };
  isSubmitted: boolean;

  constructor(
    private commonService: CommonService,
    private authService: AuthService,
    private ionLoaderService: IonLoaderService,
    private router: Router,
  ) {
    this.loginForm = {username: null, password: null};
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      history.back();
    }
  }

  ionViewDidEnter() {
    if (this.authService.isAuthenticated()) {
      history.back();
    }
  }

  onClickLogin() {
    if (!this.onValidate()) {
      return;
    }

    this.ionLoaderService.openLoader();
    this.isSubmitted = true;

    try {
      this.authService.login(this.loginForm).subscribe(result => {
        if (result) {
          this.authService.setAuthInfo(result);
          return this.ionLoaderService.dismissLoader().then(() =>
            this.router.navigateByUrl(Constants.routerLinks.home, {skipLocationChange: true})
          );
        } else {
          return this.ionLoaderService.dismissLoader();
        }
        this.isSubmitted = false;
      });
    } catch (e) {
      this.ionLoaderService.dismissLoader();
      this.isSubmitted = false;

      const toastOption = Constants.toastOptions.error;
      toastOption.message = e.message;

      this.commonService.showToast(toastOption);
    }
  }

  onValidate() {
    const toastOption = Constants.toastOptions.warning;

    if (!this.loginForm.username) {
      toastOption.message = 'Vui lòng nhập vào địa chỉ email!';
      this.commonService.showToast(toastOption);
      return false;
    }

    if (!this.loginForm.password) {
      toastOption.message = 'Vui lòng nhập vào mật khẩu!';
      this.commonService.showToast(toastOption);
      return false;
    }

    return true;
  }

}
