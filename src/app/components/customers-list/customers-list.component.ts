import { Component, OnInit } from '@angular/core';
import { CustomerInterface } from 'src/app/shared/data/types/customer.interface';
import { HttpService } from 'src/app/shared/services/http.service';


@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit{

  isEditPos!: number | null;
  isNotChanged!: boolean;
  private tempCustomer!: CustomerInterface;

  constructor(public httpService: HttpService) {}

  ngOnInit() {
    this.httpService.getData();
    this.resetEditStatus();
  }

  editCustomer(i: number): void{
    this.resetEditStatus();
    this.isEditPos = i;
  }

  setValue(key: string, original: string, value: string): void {
    const valueTrim = value.trim();

    if(original === valueTrim) return;
    if(original === this.tempCustomer[key as keyof CustomerInterface]) return;

    this.tempCustomer[key as keyof CustomerInterface] = valueTrim;
    this.isNotChanged = false;
  }

  cancelEdit(): void{
    this.resetEditStatus();
  }

  saveCustomer(customer: CustomerInterface, i: number): void{
    const mergedCustomer = this.mergeCustomerProps(customer, this.tempCustomer);
    this.httpService.updateData(mergedCustomer, i);
    this.resetEditStatus();

  }

  deleteCustomer(customer: CustomerInterface): void{
    this.httpService.deleteData(customer);
  }

  private resetEditStatus() {
    this.isEditPos = null;
    this.isNotChanged = true;
    this.tempCustomer = this.resetCustomer();
  }

  private resetCustomer = (): CustomerInterface => ({name: '', email: '', mobile: '', location: ''});

  private mergeCustomerProps<T extends CustomerInterface>(original: T, temp: T): T {
    const result: T = {...original};

    Object.keys((temp)).forEach((key) => {
      if (temp[key as keyof T]) {
        result[key as keyof T] = temp[key as keyof T];
      }
    });
     return result;
  }
}
