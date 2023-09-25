import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeViewComponent } from './components/home/employee-view/employee-view.component';
import { AuthGuard } from './common/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'employee/:id', component: EmployeeViewComponent, canActivate: [AuthGuard], },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
