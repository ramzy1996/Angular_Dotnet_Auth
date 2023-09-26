import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup
    constructor(private fb: FormBuilder, private auth: AuthService, private route: Router, private toaster: ToastrService, private store: StoreService) { }
    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        })
    }
    onSubmit() {
        if (this.loginForm.valid) {
            console.log(this.loginForm.value)
            try {
                this.auth.login(this.loginForm.value).subscribe({
                    next: (res: any) => {
                        this.toaster.success(res.message)
                        this.loginForm.reset()
                        this.auth.storeToken(res.token)
                        const token = this.auth.decodedToken()
                        this.store.setFullname(token.name)
                        this.store.setRole(token.role)
                        this.store.setId(token.id)
                        this.store.setUserId(res.id)
                        console.log(parseInt(token.id))
                        console.log(res.id)
                        token.role == 'Admin' ? this.route.navigate(['home']) : this.route.navigate([`employee/${parseInt(token.id)}`])
                        // this.route.navigate(['home'])
                    }, error: (err: any) => {
                        console.log(err)
                        console.log(err.error)
                        this.toaster.error(err.error.message)
                    }
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log('invalid')
        }
    }

}
