import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/Employee';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    employees?: Employee[];
    regisetrForm!: FormGroup
    submitted: boolean = false
    email: string = ''
    password: string = ''
    role: string = ''
    constructor(config: NgbModalConfig, private modalService: NgbModal, private fb: FormBuilder, public auth: AuthService, private toaster: ToastrService, private route: Router, private store: StoreService) {
        config.backdrop = 'static';
        config.keyboard = false;
    }
    ngOnInit(): void {
        this.regisetrForm = this.fb.group({
            fullname: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            salary: ['', Validators.required],
            joindate: ['', Validators.required],
        })
        this.fetchEmpList()
        this.store.getRole().subscribe(data => {
            let getRoleFromToken = this.auth.getRoleFromToken()
            this.role = data || getRoleFromToken
        })
    }

    open(content: any) {
        this.modalService.open(content);
    }
    onSubmit(modal: any, secondModal: any) {
        this.submitted = true
        if (this.regisetrForm.valid) {
            console.log(this.regisetrForm.value)
            this.auth.register(this.regisetrForm.value).subscribe({
                next: (res: any) => {
                    this.toaster.success(res.message)
                    modal.close('Save click')
                    this.resetForm()
                    this.email = res.email
                    this.password = res.password
                    this.open(secondModal)
                    this.fetchEmpList()
                }, error: (err: any) => {
                    this.toaster.error(err?.error.message)
                }
            })

            modal.close('Save click')
            this.resetForm()
        } else {
            console.log('invalid')
        }
    }

    //fetch employye list
    fetchEmpList() {
        return this.auth.getList()
            .subscribe(data => {
                this.employees = data as Employee[]
                console.log(data)
            })
    }

    // active inactive
    activeInActive(data: Employee) {
        this.auth.activate(data.id, !data.isActive).subscribe({
            next: (res: any) => {
                this.toaster.success(data.isActive ? 'Employee bloced successfully' : 'Employee unblocked successfully')
                this.fetchEmpList()
            }, error: (err: any) => {
                this.toaster.error(err?.error)
            }
        })
    }

    viewEmployee(id: number) {
        this.route.navigate([`employee/${id}`])
    }

    resetForm() {
        this.regisetrForm.reset()
        this.submitted = false
    }
}
