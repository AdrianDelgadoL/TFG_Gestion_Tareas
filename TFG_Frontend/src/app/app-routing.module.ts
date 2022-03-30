import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./front_layer/pages/login/login.component";
import {TaskListComponent} from "./front_layer/pages/task-list/task-list.component";
import {AuthGuard} from "./front_layer/guards/auth-guard/auth.guard";
import {LoginGuard} from "./front_layer/guards/login/login.guard";

const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'tasks',
    component: TaskListComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
