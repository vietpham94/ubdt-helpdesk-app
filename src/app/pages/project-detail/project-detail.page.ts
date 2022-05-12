import { Component, ElementRef, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


import { Project } from 'src/app/interfaces/project';
import { ProjectService } from './../../services/project/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.page.html',
  styleUrls: ['./project-detail.page.scss'],
})
export class ProjectDetailPage implements OnInit {
  unsubscribeBackEvent: any;
  project: Project;

  constructor(
    private element: ElementRef,
    private platform: Platform,
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
  ) { }

  ngOnInit() {
    this.project = null;
  }

  ionViewDidEnter() {
    this.platform.ready().then((readySource) => {
      this.unsubscribeBackEvent =
        this.platform.backButton.subscribeWithPriority(999999, () => {
          navigator['app'].exitApp();
        });
    });

    return this.initData();
  }

  async initData() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const project_id = id ? parseInt(id, 10) : 0;

    if (project_id > 0) {
      this.project = await this.projectService.getProjectDetail(project_id).toPromise();
    }
  }

  ionViewDidLeave() {
    this.unsubscribeBackEvent.unsubscribe();
  }

}
