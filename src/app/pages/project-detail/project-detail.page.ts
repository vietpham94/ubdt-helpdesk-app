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

  title: string;

  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.title = 'Dự án 1';
  }

}
