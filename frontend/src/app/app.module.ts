import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { DecimalPipe, NgFor } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeViewComponent } from './components/home/employee-view/employee-view.component';
import { TokenInterceptor } from './common/token.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        EmployeeViewComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        NgFor,
        BrowserAnimationsModule,
        DecimalPipe,
        ReactiveFormsModule,
        HttpClientModule,
        ToastrModule.forRoot(),
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
