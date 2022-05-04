import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {firebaseConfig} from "../environments/environment";
import {LoginComponent} from "./front_layer/pages/login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {ScreenTrackingService, UserTrackingService} from "@angular/fire/analytics";
import {TaskListComponent} from './front_layer/pages/task-list/task-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {NavbarComponent} from './front_layer/navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {CreateTaskFormComponent} from './front_layer/pages/create-task-form/create-task-form.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import { TaskDetailComponent } from './front_layer/pages/task-detail/task-detail.component';
import { DialogComponent } from './front_layer/dialog/dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { FrontPageComponent } from './front_layer/pages/front-page/front-page.component';
import { UserListComponent } from './front_layer/pages/user-list/user-list.component';
import { RestorePasswordComponent } from './front_layer/pages/restore-password/restore-password.component';
import { CreateUserFormComponent } from './front_layer/pages/create-user-form/create-user-form.component';
import { UserDetailComponent } from './front_layer/pages/user-detail/user-detail.component';
import { CalendarComponent } from './front_layer/pages/calendar/calendar.component';
import {CalendarModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {registerLocaleData} from "@angular/common";
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs)

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskListComponent,
    NavbarComponent,
    CreateTaskFormComponent,
    TaskDetailComponent,
    DialogComponent,
    FrontPageComponent,
    UserListComponent,
    RestorePasswordComponent,
    CreateUserFormComponent,
    UserDetailComponent,
    CalendarComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
        MatTableModule,
        MatSortModule,
        MatToolbarModule,
        MatDatepickerModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatListModule,
        MatCheckboxModule,
        MatIconModule,
        MatDialogModule,
        CalendarModule.forRoot({
          provide: DateAdapter,
          useFactory: adapterFactory
        })
    ],
  providers: [ScreenTrackingService, UserTrackingService, {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}],
  bootstrap: [AppComponent],
})
export class AppModule { }
