import { HttpHeaders } from "@angular/common/http";

export const baseUrl = 'https://localhost:7038/api';

export const headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
});