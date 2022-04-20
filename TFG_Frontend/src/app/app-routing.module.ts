import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./front_layer/pages/login/login.component";
import {TaskListComponent} from "./front_layer/pages/task-list/task-list.component";
import {AuthGuard} from "./front_layer/guards/auth-guard/auth.guard";
import {LoginGuard} from "./front_layer/guards/login/login.guard";
import {CreateTaskFormComponent} from "./front_layer/pages/create-task-form/create-task-form.component";
import {TaskDetailComponent} from "./front_layer/pages/task-detail/task-detail.component";
import {FrontPageComponent} from "./front_layer/pages/front-page/front-page.component";

const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'frontPage',
    component: FrontPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks',
    component: TaskListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks/:id',
    component: TaskDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'createTask',
    component: CreateTaskFormComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
