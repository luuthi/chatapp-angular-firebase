import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
 
 
const appRoutes: Routes = [
  { 
    path: '', 
    loadChildren: './views/dashboard/dashboard.module#DashboardModule'
  },
  { 
    path: 'statistic', 
    loadChildren: './views/statistic/statistic.module#StatisticModule'
  },
  { 
    path: 'management', 
    loadChildren: './views/management/management.module#ManagementModule'
  },
//   { path: '**', component: PageNotFoundComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
      {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}