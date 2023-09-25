import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    private fullName$ = new BehaviorSubject<string>("")
    private role$ = new BehaviorSubject<string>("")
    private id$ = new BehaviorSubject<string>('')

    constructor() { }

    public getRole() {
        return this.role$.asObservable();
    }
    public setRole(role: string) {
        this.role$.next(role)
    }

    public getFullname() {
        return this.fullName$.asObservable();
    }
    public setFullname(fullname: string) {
        this.fullName$.next(fullname)
    }
    public getId() {
        return this.id$.asObservable();
    }
    public setId(id: string) {
        this.id$.next(id)
    }

}
