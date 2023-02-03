import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, tap, Observable } from 'rxjs';
import { CustomerInterface } from '../data/types/customer.interface';
import { RequestCustomerInterface } from '../data/types/request-customer-interface';
import { ResponseCustomerInterface } from '../data/types/response-customer.interface';


const url = `${environment.apiUrl}/customers`;
const httpOptions = {headers: new HttpHeaders({'Content-Type': 'aplication/json'})};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  customers: CustomerInterface[] = [];

  constructor(private http: HttpClient) { }

  createData(customer: CustomerInterface): Observable<RequestCustomerInterface> {
    return this.http.post<RequestCustomerInterface>(`${url}.json`, customer, httpOptions)
      .pipe(tap(res => this.customers.push({...{key: res.name}, ...customer})));
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
        this.customers = res;
      },
      error: err => console.log(err)
    });
  }

  updateData(): void {}

  deleteData(): void{}




}
