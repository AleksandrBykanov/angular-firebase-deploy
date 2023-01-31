import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';


@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit{

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.getData()
  }

}
