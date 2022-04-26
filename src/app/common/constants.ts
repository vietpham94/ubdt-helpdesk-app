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
  };

  static pagesTitle = {
    login: 'Đăng nhập',
    register: 'Đăng ký tài khoản',
    resetPassword: 'Đặt lại mật khẩu',
    home: 'Trang chủ',
    search: 'Tìm kiếm',
    searchResult: 'Kêt quả tìm kiếm',
    suggestion: 'Góp ý - Đánh giá',
    helpdeskDetail: 'Chi tiết hướng dẫn',
    directory: 'Danh bạ điện thoại',
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
      pageLink: '/directory',
      title: Constants.pagesTitle.directory
    },
  ];

  static apiRestEndPoints = {
    login: '/api-bearer-auth/v1/login',
    refreshToken: '/api-bearer-auth/v1/tokens/refresh',
    validateToken: '/jwt-auth/v1/token/validate',
    subject: '/wp/v2/subject',
    province: '/wp/v2/province',
    district: '/wp/v2/district',
    wards: '/wp/v2/wards',
  };

  static messages = {
    errorTitle: 'Lỗi',
    loginErrMsg: 'Đăng nhập lỗi. Vui lòng kiểm tra lại.',
    errorForbidden: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
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
