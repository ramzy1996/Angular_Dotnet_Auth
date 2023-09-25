import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl, headers } from '../common/CommonData';
import { Employee } from '../models/Employee';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private payload: any
    constructor(private http: HttpClient, private router: Router) {
        this.payload = this.decodedToken()
    }
    login(loginEmp: any) {
        return this.http.post(`${baseUrl}/Employee/login`, loginEmp)
    }
    register(regEmp: any) {
        return this.http.post(`${baseUrl}/Employee/addemployee`, regEmp)
    }
    getList() {
        return this.http.get(`${baseUrl}/Employee/getEmployee`)
    }
    //active inactive employee
    activate(id: number, isactive: boolean) {
        return this.http.put(`${baseUrl}/Employee/activate/${id}`, isactive)
    }
    //employee details by id
    getEmployee(id: number) {
        return this.http.get(`${baseUrl}/Employee/getemployee/${id}`)
    }
    //signout 
    signout() {
        localStorage.removeItem('token')
        this.router.navigate(['/login'])
    }
    //token
    storeToken(tokenVal: string) {
        localStorage.setItem('token', tokenVal)
    }
    getToken() {
        return localStorage.getItem('token')
    }
    isLoggedIn(): boolean {
        return !!localStorage.getItem("token");
    }
    decodedToken() {
        const jwtHelper = new JwtHelperService()
        const token = this.getToken()!
        return jwtHelper.decodeToken(token)
    }
    getFullNameFromToken() {
        if (this.payload) {
            return this.payload.name
        }
    }
    getRoleFromToken() {
        if (this.payload) {
            return this.payload.role
        }
    }
    getIdFromToken() {
        if (this.payload) {
            return this.payload.id
        }
    }

}
