import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewsPage } from './news';
//import { NewsDetailPage } from '../news-detail/news-detail';

const routes: Routes = [
  {
    path: '',
    component: NewsPage
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('../news-detail/news-detail.module').then(m => m.NewsDetailModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsPageRoutingModule {}
