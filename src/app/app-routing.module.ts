import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {HipaaListComponent} from "./hipaa-list/hipaa-list.component";

const routes: Routes = [
  {path: '', redirectTo: '/hipaa', pathMatch: 'full'},
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'hipaa',
        component: HipaaListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
