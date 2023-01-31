import { Component, OnInit } from '@angular/core';
import { DEFAULT_CUSTOMER } from 'src/app/shared/data/mock-data';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-customers-details',
  templateUrl: './customers-details.component.html',
  styleUrls: ['./customers-details.component.css']
})
export class CustomersDetailsComponent implements OnInit {

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    // this.httpService.createData(DEFAULT_CUSTOMER);
  }

}
