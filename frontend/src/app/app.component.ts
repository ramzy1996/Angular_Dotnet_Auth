import { AuthService } from 'src/app/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreService } from './services/store.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'frontend';
    fullname: string = ""

    constructor(public auth: AuthService, private store: StoreService) { }
    logout() {
        this.auth.signout()
    }
    ngOnInit(): void {
        this.store.getFullname().subscribe(data => {
            let fullNameFromtoken = this.auth.getFullNameFromToken()
            this.fullname = data || fullNameFromtoken
        })
    }
    ngOnDestroy() {
        localStorage.removeItem('token');
    }
}
