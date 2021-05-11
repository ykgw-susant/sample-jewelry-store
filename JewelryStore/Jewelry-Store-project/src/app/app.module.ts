import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule, } from 'ngx-bootstrap/datepicker';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { AppComponent } from './app.component';

import { EstimationComponent } from './Estimation/app.Estimation.component';
import { MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material';
import { UserRegistrationComponent } from './CreateUsers/app.UserRegistration.component';
import { AllUserRegistrationComponent } from './CreateUsers/app.AllUserRegistration.component';
import { EditUserRegistrationComponent } from './CreateUsers/app.EditUserRegistration.component';

import { EstimationListComponent} from './Estimation/List/app.EstimationListComponent';
import { EstimationViewComponent } from './Estimation/List/app.EstimationViewComponent';

import { LoginComponent } from './Login/app.LoginComponent';
import { AppAdminLayoutComponent } from './_layout/app-adminlayout.component';
import { UserDashboardComponent } from './UserDashboard/app.UserDashboardComponent';
import { AdminDashboardComponent } from './AdminDashboard/app.AdminDashboardComponent';
import { EstimationReportComponent } from './Reports/app.EstimationReport.Component';
import { AppUserLayoutComponent } from './_layout/app-userlayout.component';
import { AdminLogoutComponent } from './Login/app.AdminLogout.Component';
import { UserLogoutComponent } from './Login/app.UserLogout.Component';
import { AdminAuthGuardService } from './AuthGuard/AdminAuthGuardService';
import { UserAuthGuardService } from './AuthGuard/UserAuthGuardService';
import { OnlyNumber } from './Estimation/app.OnlyNumber.directive';



@NgModule({
  declarations: [
    AppComponent,

    AppAdminLayoutComponent,
    AppUserLayoutComponent,   
    EstimationComponent,
    EstimationListComponent,
    EstimationViewComponent,    
    UserRegistrationComponent,
    AllUserRegistrationComponent,
    EditUserRegistrationComponent,
  
    LoginComponent,
    AdminLogoutComponent,
    UserLogoutComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    EstimationReportComponent,
    OnlyNumber
 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    MatTableModule,
    MatAutocompleteModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,

    RouterModule.forRoot([
      
      {
        path: 'Estimation',
        component: AppUserLayoutComponent,
        children: [
          { path: 'Add', component: EstimationComponent},        
          { path: 'All', component: EstimationViewComponent}
        ]
      },
      {
        path: 'Estimation',
        component: AppAdminLayoutComponent,
        children: [
          { path: 'Add', component: EstimationComponent},        
          { path: 'All', component: EstimationViewComponent}
        ]
      },
      {
        path: 'User',
        component: AppAdminLayoutComponent,
        children: [
          { path: 'Add', component: UserRegistrationComponent , canActivate: [AdminAuthGuardService] },
          { path: 'Edit/:UserId', component: EditUserRegistrationComponent , canActivate: [AdminAuthGuardService] },
          { path: 'All', component: AllUserRegistrationComponent, canActivate: [AdminAuthGuardService]  }
        ]
      },
     
      {
        path: 'Admin',
        component: AppAdminLayoutComponent,
        children: [
          { path: 'Dashboard', component: AdminDashboardComponent , canActivate: [AdminAuthGuardService]  }

        ]
      },
      {
        path: 'User',
        component: AppUserLayoutComponent,
        children: [
          { path: 'Dashboard', component: UserDashboardComponent,canActivate: [UserAuthGuardService] },
         
        ]
      },
      {
        path: 'Report',
        component: AppAdminLayoutComponent,
        children: [
          { path: 'Estimation', component: EstimationReportComponent, canActivate: [AdminAuthGuardService]  },
         
        ]
      },
      { path: 'Login', component: LoginComponent },
      { path: 'AdminLogout', component: AdminLogoutComponent },
      { path: 'UserLogout', component: UserLogoutComponent },
      
      { path: '', redirectTo: "Login", pathMatch: 'full' },
      { path: '**', redirectTo: "Login", pathMatch: 'full' },


    ], { useHash: true })
  ],
  exports: [BsDatepickerModule],
  providers: [DatePipe, AdminAuthGuardService,UserAuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
