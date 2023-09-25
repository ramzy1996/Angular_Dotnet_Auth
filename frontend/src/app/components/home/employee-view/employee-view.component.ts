import { StoreService } from 'src/app/services/store.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SalaryService } from 'src/app/services/salary.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-employee-view',
    templateUrl: './employee-view.component.html',
    styleUrls: ['./employee-view.component.scss']
})

export class EmployeeViewComponent implements OnInit {
    empId!: number;
    salaryForm!: FormGroup;
    salaryData: FormGroup[] = [];
    employeeData: any;
    role!: string
    constructor(private route: ActivatedRoute, private fb: FormBuilder, private salary: SalaryService, private toaster: ToastrService, private auth: AuthService, private store: StoreService) { }
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.empId = params['id'];
        });
        this.salaryForm = this.fb.group({
            salary: ['', Validators.required],
            month: ['', Validators.required],
            year: ['', Validators.required],
            empid: [this.empId]
        });
        this.fetchEmpData()
        this.store.getRole().subscribe(data => {
            let getRoleFromToken = this.auth.getRoleFromToken()
            this.role = data || getRoleFromToken
        })
    }
    //months
    months: string[] = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];
    // remove fields
    removeSalaryData(index: number) {
        this.salaryData.splice(index, 1);
    }
    // add dynamically salary
    addSalaryData() {
        const newSalaryData = this.fb.group({
            salary: ['', Validators.required],
            month: ['', Validators.required],
            year: ['', Validators.required],
            empid: [this.empId]
        });

        this.salaryData.push(newSalaryData);
    }
    SaveSalaryData() {
        const salaryDataObjects = this.salaryData.map((formGroup) => formGroup.value);
        console.log(salaryDataObjects)
        this.salary.saveSalaryData(salaryDataObjects).subscribe({
            next: (res: any) => {
                this.toaster.success(res.message)
                this.fetchEmpData()
                this.resetForm()
            }, error: (err: any) => {
                this.toaster.error(err?.error.message)
            }
        })
    }
    resetForm() {
        this.salaryForm.reset()
        this.salaryData = []
    }
    //fetch employye data
    fetchEmpData() {
        return this.auth.getEmployee(this.empId)
            .subscribe(data => {
                this.employeeData = data
                console.log(data)
            })
    }
}
