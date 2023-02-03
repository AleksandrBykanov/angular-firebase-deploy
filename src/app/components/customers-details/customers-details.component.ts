import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DEFAULT_CUSTOMER } from 'src/app/shared/data/mock-data';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-customers-details',
  templateUrl: './customers-details.component.html',
  styleUrls: ['./customers-details.component.css']
})
export class CustomersDetailsComponent implements OnInit {

  form!: FormGroup;

  constructor(private httpService: HttpService, private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  onSubmit () {
    this.httpService.createData(this.form.value)
    .subscribe(() => this.form.reset());
  }

  private initializeForm(): void{
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(8)]],
      location: ['', [Validators.required]],
    });
    this.form.setValue(DEFAULT_CUSTOMER);
  }

}
