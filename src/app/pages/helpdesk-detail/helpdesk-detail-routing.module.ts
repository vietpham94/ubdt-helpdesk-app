import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpdeskDetailPage } from './helpdesk-detail.page';

const routes: Routes = [
  {
    path: '',
    component: HelpdeskDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpdeskDetailPageRoutingModule {}
