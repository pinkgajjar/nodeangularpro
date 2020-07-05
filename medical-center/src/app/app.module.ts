import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { OrderModule } from 'ngx-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { AgmCoreModule } from '@agm/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AuthGuard } from './auth/auth.guard';
import { dashboardComponentModule } from './dashboard/dashboard.component.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthService } from './auth/auth.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { MustMatchDirective } from './_helpers/must-match.directive';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';










@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MustMatchDirective,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    dashboardComponentModule,
    OrderModule,
    HttpClientModule,
    NgApexchartsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    UiSwitchModule,
    Ng4LoadingSpinnerModule.forRoot(),
   
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAefYpBejAQM9_EGrRjwGdkWSwOI2XCGwU', //google map access key
      libraries: ['places']
    })
  ],
  providers: [AuthGuard,AuthService,
    {
      provide: HTTP_INTERCEPTORS, // all auth folder data
      useClass: AuthInterceptor,
      multi: true
    }],
  
  bootstrap: [AppComponent],
})
export class AppModule { }
