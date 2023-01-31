import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'environments/environment';
import { CustomerInterface } from '../data/types/customer.interface';


const url = `${enviroment.apiUrl}/customers`;
const httpOptions = {headers: new HttpHeaders({'Content-Type': 'aplication/json'})};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  createData(customer: CustomerInterface): void{
    this.http.post(`${url}.json`, customer, httpOptions).subscribe(res => {
      console.log(res);
    });
  }

  getData(): void{}

  updateData(): void {}

  deleteData(): void{}




}
