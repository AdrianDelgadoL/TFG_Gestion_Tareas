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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskListComponent,
    NavbarComponent,
    CreateTaskFormComponent,
    TaskDetailComponent,
    DialogComponent,
    FrontPageComponent
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
    ],
  providers: [ScreenTrackingService, UserTrackingService, {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}],
  bootstrap: [AppComponent],
})
export class AppModule { }
