import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'environments/environment';
import { map } from 'rxjs';
import { CustomerInterface } from '../data/types/customer.interface';
import { ResponseCustomerInterface } from '../data/types/response-customer.interface';


const url = `${enviroment.apiUrl}/customers`;
const httpOptions = {headers: new HttpHeaders({'Content-Type': 'aplication/json'})};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  customers: CustomerInterface[] = [];

  constructor(private http: HttpClient) { }

  createData(customer: CustomerInterface): void{
    this.http.post<ResponseCustomerInterface>(`${url}.json`, customer, httpOptions)
    .subscribe(res => {
      console.log(res);
    });
  }

  getData(): void{
    this.http.get<ResponseCustomerInterface>(`${url}.json`, httpOptions)
    .pipe(
      map((res) => {
        const arr: CustomerInterface[] = []
        Object.keys(res).forEach(key => arr.push({key, ...res[key]}));
      return arr;
      })
    )
    .subscribe({
      next: (res: CustomerInterface[]) => {
        console.log(res);
      },
      error: err => console.log(err)
    });
  }

  updateData(): void {}

  deleteData(): void{}




}
