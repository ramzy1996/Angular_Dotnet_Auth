import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StoreService } from '../services/store.service';

@Injectable({
    providedIn: 'root'
})
export class EmployeeGuard implements CanActivate, OnInit {
    private role: string = ""
    private id?: number
    private empId?: number
    constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, private store: StoreService) {
        this.store.getRole().subscribe(data => {
            let getRoleFromToken = this.authService.getRoleFromToken()
            this.role = data || getRoleFromToken
        })
        this.store.getUserId().subscribe(data => {
            this.empId = data
        })
        // this.route.params.subscribe(params => {
        //     this.empId = params['id'];
        // });

        this.store.getId().subscribe(data => {
            let getid = this.authService.getIdFromToken()
            this.id = parseInt(data) || parseInt(getid)
        })
    }
    ngOnInit(): void {


    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const param = route.params['id'];
        console.log(this.empId)
        console.log(this.id)
        console.log(param)
        if (this.authService.isLoggedIn()
            && (this.role == "Admin" || (this.role == 'Employee' && param == this.id))
        ) {
            return true;
        } else {
            this.router.navigate([`/employee/${this.id}`]);
            return false;
        }
    }
}