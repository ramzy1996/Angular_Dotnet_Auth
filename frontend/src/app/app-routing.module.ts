import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeViewComponent } from './components/home/employee-view/employee-view.component';
import { AuthGuard } from './common/auth.guard';
import { EmployeeGuard } from './common/employee.guard';
import { JwtHelperService } from '@auth0/angular-jwt';
import { async } from '@angular/core/testing';

const isLogged = !!localStorage.getItem("token")
const jwtHelper = new JwtHelperService()
const token = localStorage.getItem("token")!
const decodedToken = jwtHelper.decodeToken(token)
const role = decodedToken?.role !== null ? decodedToken?.role : '';
const id = decodedToken?.id !== null ? parseInt(decodedToken?.id) : 0;
console.log(id)
console.log(role)
console.log(isLogged)
const routingFunc = () => {
    if (isLogged && role === 'Admin') {
        return 'home';
    } else if (isLogged && role === 'Employee') {
        return `employee/${id}`;
    } else {
        return 'login';
    }
};
const routes: Routes = [
    { path: '', redirectTo: routingFunc(), pathMatch: 'full' },
    // { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'employee/:id', component: EmployeeViewComponent, canActivate: [EmployeeGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
