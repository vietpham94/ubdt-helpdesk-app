import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  isAuth: boolean;

  constructor(
    private authService: AuthService
  ) {
    this.isAuth = false;
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.isAuth = this.authService.isAuthenticated();
  }

  public closeMenu() {
    history.back();
  }

}
