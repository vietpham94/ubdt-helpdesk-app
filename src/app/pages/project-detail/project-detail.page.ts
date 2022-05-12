import { Component, OnInit } from '@angular/core';

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
