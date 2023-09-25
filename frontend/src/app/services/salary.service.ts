import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SalaryData } from '../models/SalaryData';
import { baseUrl } from '../common/CommonData';

@Injectable({
    providedIn: 'root'
})
export class SalaryService {

    constructor(private http: HttpClient) { }
    saveSalaryData(salaryDataList: SalaryData[]) {
        console.log(salaryDataList)
        return this.http.post(`${baseUrl}/SalaryPayment/savesalary`, salaryDataList)
    }
}
