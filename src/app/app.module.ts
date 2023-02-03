import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomersHostComponent } from './components/customers-host/customers-host.component';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { CustomersDetailsComponent } from './components/customers-details/customers-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    CustomersHostComponent,
    CustomersListComponent,
    CustomersDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
