import {Component, ElementRef, OnInit} from '@angular/core';
import {SuggestionService} from '../../services/suggestion/suggestion.service';
import {AuthService} from '../../services/auth/auth.service';
import {CommonService} from '../../services/common/common.service';
import {Constants} from '../../common/constants';
import {Subject} from '../../interfaces/subject';
import {Province} from '../../interfaces/province';
import {District} from '../../interfaces/district';
import {Ward} from '../../interfaces/ward';
import {SubjectService} from '../../services/subject/subject.service';
import {ProjectActionService} from './../../services/project-action/project-action.service';
import {ProjectAction} from '../../interfaces/project-action';
import {AdministrativeService} from '../../services/administrative/administrative.service';
import {SuggestionParam} from '../../interfaces/suggestion-param';
import {IonicSelectableComponent} from 'ionic-selectable';
import {Router} from '@angular/router';
import {Pagination} from '../../interfaces/pagination';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.page.html',
  styleUrls: ['./suggestion.page.scss'],
})
export class SuggestionPage implements OnInit {
  suggestionParam: SuggestionParam;
  subjectList: Array<Subject>;
  provinces: Array<Province>;
  districts: Array<District>;
  wards: Array<Ward>;
  projectActions: Array<ProjectAction>;
  selectedProvince: Province;
  selectedDistrict: District;
  selectedWard: Ward;
  selectedProjectAction: string;
  isLoadingPosition: boolean;

  constructor(
    private suggestionService: SuggestionService,
    private authService: AuthService,
    private commonService: CommonService,
    private subjectService: SubjectService,
    private projectActionService: ProjectActionService,
    private administrativeService: AdministrativeService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.subjectList = new Array<Subject>();
    this.provinces = new Array<Province>();
    this.districts = new Array<District>();
    this.wards = new Array<Ward>();
    this.projectActions = new Array<ProjectAction>();
    this.suggestionParam = {
      post_title: '',
      acf: {
        name: '',
        address: '',
        phone: '',
        email: '',
        suggestion_position: '',
        work_place: '',
        suggestion_action: '',
        suggestion_content: '',
      }
    };
  }

  ionViewDidEnter() {
    this.isLoadingPosition = true;
    return this.initData();
  }

  initData() {
    const provinceParams: Pagination = {
      page: 1,
      per_page: 100,
    }

    this.administrativeService.getProvince(provinceParams).subscribe(provinces => {
      provinces.forEach(province => {
        if (province.title) {
          province.post_title = province.title.rendered;
        }
      });

      this.provinces = provinces;

      this.administrativeService.getDistrictByProvince(this.selectedProvince).subscribe(districts => {
        districts.forEach(district => {
          if (district.title) {
            district.post_title = district.title.rendered;
          }
        });
        this.districts = districts;

        this.administrativeService.getWardsByDistrict(this.selectedDistrict).subscribe(wards => this.wards = wards);
      });
    })


    this.projectActionService.getListProjectAction().subscribe(projectActions => this.projectActions = projectActions);
    this.subjectService.getListSubject().subscribe(subjectList => {
      this.subjectList = subjectList;
      this.isLoadingPosition = false;
    });
  }

  onSelectProvince() {
    if (!this.selectedProvince) {
      return;
    }

    const dataQueryDistrict = {province_id: this.selectedProvince.id};
    this.administrativeService
      .getDistrictByProvince(dataQueryDistrict)
      .subscribe((districts: Array<District>) => {
        this.districts = districts;
      });
  }

  onSelectDistrict() {
    if (!this.selectedDistrict) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const dataQueryWard = {district_id: this.selectedDistrict.ID};
    this.administrativeService
      .getWardsByDistrict(dataQueryWard)
      .subscribe((wards: Array<Ward>) => {
        this.wards = wards;
      });
  }

  projectActionChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('projectActionChange value:', event.value);
    this.suggestionParam.acf.suggestion_action = event.value.ID;
  }

  onSubmitSuggestion() {
    if (!this.validateSuggetion()) {
      return;
    }
    if (this.selectedWard) {
      this.suggestionParam.acf.address += ', ' + this.selectedWard.post_title;
    }
    if (this.selectedDistrict) {
      this.suggestionParam.acf.address += ', ' + this.selectedDistrict.post_title;
    }
    if (this.selectedProvince) {
      this.suggestionParam.acf.address += ', ' + this.selectedProvince.post_title;
    }
    this.suggestionParam.post_title = this.suggestionParam.acf.name;
    this.suggestionService.submitSuggestion(this.suggestionParam).subscribe((res) => {
      const toastOption = Constants.toastOptions.success;
      toastOption.message = 'Bạn đã gửi góp ý thành công !';
      this.commonService.showToast(toastOption);
      this.router.navigateByUrl(Constants.routerLinks.home);
    });
  }

  private validateSuggetion(): boolean {
    if (!this.suggestionParam.acf.name) {
      const toastOption = Constants.toastOptions.warning;
      toastOption.message = "Vui lòng nhập họ và tên!";
      this.commonService.showToast(toastOption);
      return;
    }
    if (!this.suggestionParam.acf.address) {
      const toastOption = Constants.toastOptions.warning;
      toastOption.message = "Vui lòng nhập địa chỉ!";
      this.commonService.showToast(toastOption);
      return;
    }
    if (!this.suggestionParam.acf.phone) {
      const toastOption = Constants.toastOptions.warning;
      toastOption.message = "Vui lòng nhập số điện thoại!";
      this.commonService.showToast(toastOption);
      return;
    }
    if (!this.suggestionParam.acf.email) {
      const toastOption = Constants.toastOptions.warning;
      toastOption.message = "Vui lòng nhập email!";
      this.commonService.showToast(toastOption);
      return;
    }
    if (!this.suggestionParam.acf.suggestion_position) {
      const toastOption = Constants.toastOptions.warning;
      toastOption.message = "Vui lòng chọn vai trò của bạn!";
      this.commonService.showToast(toastOption);
      return;
    }
    if (!this.suggestionParam.acf.work_place) {
      const toastOption = Constants.toastOptions.warning;
      toastOption.message = "Vui lòng nhập thông tin nơi làm việc của bạn!";
      this.commonService.showToast(toastOption);
      return;
    }
    if (!this.suggestionParam.acf.suggestion_action) {
      const toastOption = Constants.toastOptions.warning;
      toastOption.message = "Vui lòng chọn hoạt động bạn muốn góp ý!";
      this.commonService.showToast(toastOption);
      return;
    }
    if (!this.suggestionParam.acf.suggestion_content) {
      const toastOption = Constants.toastOptions.warning;
      toastOption.message = "Vui lòng nhập nội dung góp ý!";
      this.commonService.showToast(toastOption);
      return;
    }

    return true;
  }
}
