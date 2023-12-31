import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StoreService } from '../services/store.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnInit {
    private role: string = ""
    private id?: number
    private empId?: number
    constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, private store: StoreService) {
        this.store.getRole().subscribe(data => {
            let getRoleFromToken = this.authService.getRoleFromToken()
            this.role = data || getRoleFromToken
        })
        this.route.params.subscribe(params => {
            this.empId = params['id'];
        });
        this.store.getId().subscribe(data => {
            let getid = this.authService.getIdFromToken()
            this.id = parseInt(data) || parseInt(getid)
        })
        console.log(this.id)
        console.log(this.empId)
        console.log(this.role)
    }
    ngOnInit(): void {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isLoggedIn() && this.role == 'Admin') {
            return true;
        } else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}