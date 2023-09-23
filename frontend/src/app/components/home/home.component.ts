import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

interface Country {
    name: string;
    flag: string;
    area: number;
    population: number;
}

const COUNTRIES: Country[] = [
    {
        name: 'Russia',
        flag: 'f/f3/Flag_of_Russia.svg',
        area: 17075200,
        population: 146989754,
    },
    {
        name: 'Canada',
        flag: 'c/cf/Flag_of_Canada.svg',
        area: 9976140,
        population: 36624199,
    },
    {
        name: 'United States',
        flag: 'a/a4/Flag_of_the_United_States.svg',
        area: 9629091,
        population: 324459463,
    },
    {
        name: 'China',
        flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
        area: 9596960,
        population: 1409517397,
    },
];


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    countries = COUNTRIES;
    regisetrForm!: FormGroup
    submitted: boolean = false
    constructor(config: NgbModalConfig, private modalService: NgbModal, private fb: FormBuilder) {
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
    }
    open(content: any) {
        this.modalService.open(content);
    }
    onSubmit(modal: any) {
        this.submitted = true
        if (this.regisetrForm.valid) {
            console.log(this.regisetrForm.value)
            modal.close('Save click')
            this.resetForm()
        } else {
            console.log('invalid')
        }
    }
    resetForm() {
        this.regisetrForm.reset()
        this.submitted = false
    }
}
