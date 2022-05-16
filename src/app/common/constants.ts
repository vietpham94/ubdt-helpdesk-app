import {environment} from '../../environments/environment.prod';
import {PageInfo} from '../interfaces/page-info';

export class Constants {
  static authKey = 'auth_data_info';

  static routerLinks = {
    login: 'login',
    home: '',
    register: 'register',
    resetPassword: 'reset-password',
    search: 'search',
    searchResult: 'search-result',
    suggestion: 'suggestion',
    helpdeskDetail: 'helpdesk-detail',
    settings: 'settings',
    directory: 'directory',
    projectDetail: 'project-detail',
  };

  static pagesTitle = {
    login: 'Đăng nhập',
    register: 'Đăng ký tài khoản',
    resetPassword: 'Đặt lại mật khẩu',
    home: 'Trang chủ',
    search: 'Tìm kiếm',
    searchResult: 'Kết quả tìm kiếm',
    suggestion: 'Góp ý - Đánh giá',
    helpdeskDetail: 'Chi tiết hướng dẫn',
    directory: 'Danh bạ điện thoại',
    projectDetail: 'Thông tin dự án',
  };

  static pageInfo = [
    {
      pageLink: '/home',
      title: Constants.pagesTitle.home
    },
    {
      pageLink: '',
      title: Constants.pagesTitle.home
    },
    {
      pageLink: '/search',
      title: Constants.pagesTitle.search
    },
    {
      pageLink: '/suggestion',
      title: Constants.pagesTitle.suggestion
    },
    {
      pageLink: '/search-result',
      title: Constants.pagesTitle.searchResult
    },
    {
      pageLink: '/helpdesk-detail/:id',
      title: Constants.pagesTitle.helpdeskDetail
    },
    {
      pageLink: '/helpdesk-detail',
      title: Constants.pagesTitle.helpdeskDetail
    },
    {
      pageLink: '/directory',
      title: Constants.pagesTitle.directory
    },
    {
      pageLink: '/project-detail/:id',
      title: Constants.pagesTitle.projectDetail
    },
    {
      pageLink: '/project-detail',
      title: Constants.pagesTitle.projectDetail
    },
  ];

  static apiRestEndPoints = {
    login: '/api-bearer-auth/v1/login',
    refreshToken: '/api-bearer-auth/v1/tokens/refresh',
    validateToken: '/jwt-auth/v1/token/validate',
    province: '/wp/v2/provinces',
    district: '/ash/v1/provinces/districts',
    ward: '/ash/v1/provinces/districts/wards',
    project: '/wp/v2/projects',
    projectDetail: '/wp/v2/projects',
    projectAction: '/ash/v1/project_actions',
    projectActionDetail: '/wp/v2/project_action/:id',
    helpdeskCategory: '/wp/v2/helpdesk_category',
    helpdesk: '/ash/v1/helpdesk-contents',
    subject: '/wp/v2/subject',
    suggestion: '/ash/v1/suggestion',
    enterprise: '/ash/v1/enterprise',
    position: '/wp/v2/position',
  };

  static messages = {
    errorTitle: 'Lỗi',
    loginErrMsg: 'Đăng nhập lỗi. Vui lòng kiểm tra lại.',
    errorForbidden: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
  };

  static pageLink = {
    login: '/login',
    register: '/register',
    resetPassword: 'reset-password',
    home: '/home',
    search: '/search',
    searchResult: '/search-result',
    suggestion: '/suggestion',
    helpdeskDetail: '/helpdesk-detail',
    directory: '/directory',
    projectDetail: '/project-detail'
  };

  static toastOptions = {
    error: {
      header: 'Lỗi',
      message: '',
      duration: 5000,
      buttons: [{
        icon: 'close-circle-outline',
        side: 'end',
        role: 'cancel'
      }],
      model: 'ios',
      cssClass: 'toast-item toast-error',
      position: 'bottom',
      icon: 'warning-outline',
      color: 'danger',
      keyboardClose: true
    },
    success: {
      header: 'Thành công',
      message: '',
      duration: 5000,
      buttons: [{
        icon: 'close-circle-outline',
        side: 'end',
        role: 'cancel'
      }],
      model: 'ios',
      cssClass: 'toast-item toast-success',
      position: 'bottom',
      icon: 'checkmark-circle-outline',
      color: 'success',
      keyboardClose: true
    },
    info: {
      header: 'Thông tin',
      message: '',
      duration: 5000,
      buttons: [{
        icon: 'close-circle-outline',
        side: 'end',
        role: 'cancel'
      }],
      model: 'ios',
      cssClass: 'toast-item toast-info',
      position: 'bottom',
      icon: 'information-circle-outline',
      color: 'medium',
      keyboardClose: true
    },
    warning: {
      header: 'Cảnh báo',
      message: '',
      duration: 5000,
      buttons: [{
        icon: 'close-circle-outline',
        side: 'end',
        role: 'cancel'
      }],
      model: 'ios',
      cssClass: 'toast-item toast-warning',
      position: 'bottom',
      icon: 'alert-circle-outline',
      color: 'warning',
      keyboardClose: true
    }
  };

  static getPageInfoByRouterLink(pageLink: string): PageInfo {
    if (!pageLink) {
      return;
    }
    const link = Constants.formatLink(pageLink);
    return Constants.pageInfo.find(u => u.pageLink === link);
  }

  static formatLink(link: string): string {
    const arraySlap = link.split('/');
    let linkFormat = '';
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < arraySlap.length; i++) {
      if (arraySlap[i].length === 0) {
        continue;
      }

      if (Number.isInteger(+arraySlap[i])) {
        linkFormat += '/:id';
        continue;
      }

      if (!linkFormat.includes('/:id')) {
        linkFormat += '/' + arraySlap[i];
      }
    }
    return linkFormat;
  }

  static scrollContentGetBlogTitle(currentScrollTop: number, cardList): string {
    for (let i = (cardList.length - 1); i--; i < 0) {
      const bottom = cardList[i].offsetTop + cardList[i].offsetHeight - 65;
      if (cardList[i].offsetTop <= currentScrollTop && currentScrollTop < bottom) {
        return cardList[i].querySelector('.card-title').innerHTML;
      }
    }
    return;
  }
}
