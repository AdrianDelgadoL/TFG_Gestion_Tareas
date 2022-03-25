import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./front_layer/pages/login/login.component";
import {TaskListComponent} from "./front_layer/pages/task-list/task-list.component";

const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'tasks',
    component: TaskListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
