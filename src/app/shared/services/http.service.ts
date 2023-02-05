import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, tap, Observable, catchError, of } from 'rxjs';
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
      error: catchError(this.errorHandler<RequestCustomerInterface>('GET'))
    });
  }

  updateData(customer: CustomerInterface, i: number): void {
    const {key, ...data} = customer;
    this.http.put<CustomerInterface>(`${url}/${customer.key}.json`, customer, httpOptions)
    .subscribe({
      next: () => this.customers[i] = customer,
      error: catchError(this.errorHandler<CustomerInterface>('PUT'))
    });
  }

  deleteData(customer: CustomerInterface): void{
    this.http.delete(`${url}/${customer.key}.json`)
    .subscribe({
      next: () => this.customers.splice(this.customers.indexOf(customer), 1),
      error: catchError(this.errorHandler('DELETE'))

    });
  }

  private errorHandler<T>(operation: string, res?: T): any {
    return(err: any): Observable<T> => {
      console.error(`${operation} failed: ${err}`)
      return of (res as T)
    };
  }

}
