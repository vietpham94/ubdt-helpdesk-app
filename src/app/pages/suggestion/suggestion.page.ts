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
import {ProjectAction} from '../../interfaces/project-action';
import {AdministrativeService} from '../../services/administrative/administrative.service';
import {SuggestionParam} from '../../interfaces/suggestion-param';
import {Pagination} from '../../interfaces/pagination';
import {IonicSelectableComponent} from 'ionic-selectable';

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
  selectedProvince: string;
  selectedDistrict: string;
  selectedWard: string;
  selectedProjectAction: string;

  constructor(
    private suggestionService: SuggestionService,
    private authService: AuthService,
    private commonService: CommonService,
    private subjectService: SubjectService,
    private administrativeService: AdministrativeService,
  ) {
  }

  ngOnInit() {
    this.subjectList = new Array<Subject>();
    this.provinces = new Array<Province>();
    this.districts = new Array<District>();
    this.wards = new Array<Ward>();
    this.projectActions = new Array<ProjectAction>();
    this.suggestionParam = {
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
    return this.initData();
  }

  async initData() {
    const provinceParams: Pagination = {
      page: 1,
      per_page: 100,
    }

    this.provinces = await this.administrativeService.getProvince(provinceParams).toPromise();
    this.districts = await this.administrativeService.getDistrictByProvince(this.selectedProvince).toPromise();
    this.wards = await this.administrativeService.getWardsByDistrict(this.selectedDistrict).toPromise();
    this.projectActions = await this.subjectService.getProjectAction().toPromise();
    this.subjectList = await this.subjectService.getListSubject().toPromise();
  }

  onSelectProvince() {
    if (!this.selectedProvince) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const dataQueryDistrict = {province_id: this.selectedProvince};
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
    const dataQueryWard = {district_id: this.selectedDistrict};
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
  }

  onSubmitSuggestion() {
    this.suggestionService.submitSuggestion(this.suggestionParam).subscribe((res) => {
      const toastOption = Constants.toastOptions.success;
      toastOption.message = 'Bạn đã gửi góp ý thành công !';
      this.commonService.showToast(toastOption);
    });
  }
}
