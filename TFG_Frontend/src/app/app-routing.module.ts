import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./front_layer/pages/login/login.component";
import {TaskListComponent} from "./front_layer/pages/task-list/task-list.component";
import {AuthGuard} from "./front_layer/guards/auth-guard/auth.guard";
import {LoginGuard} from "./front_layer/guards/login/login.guard";
import {CreateTaskFormComponent} from "./front_layer/pages/create-task-form/create-task-form.component";
import {TaskDetailComponent} from "./front_layer/pages/task-detail/task-detail.component";
import {FrontPageComponent} from "./front_layer/pages/front-page/front-page.component";
import {WriteGuard} from "./front_layer/guards/role-guards/write-guard/write.guard";
import {UserListComponent} from "./front_layer/pages/user-list/user-list.component";
import {ContactGuard} from "./front_layer/guards/role-guards/contact-guard/contact.guard";
import {RestorePasswordComponent} from "./front_layer/pages/restore-password/restore-password.component";
import {CreateUserFormComponent} from "./front_layer/pages/create-user-form/create-user-form.component";
import {UserDetailComponent} from "./front_layer/pages/user-detail/user-detail.component";

const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'recover',
    component: RestorePasswordComponent,
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
    canActivate: [AuthGuard, WriteGuard]
  },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard, ContactGuard]
  },
  {
    path: 'users/:id',
    component: UserDetailComponent,
    canActivate: [AuthGuard, ContactGuard]
  },
  {
    path: 'createUser',
    component: CreateUserFormComponent,
    canActivate: [AuthGuard, ContactGuard, WriteGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
