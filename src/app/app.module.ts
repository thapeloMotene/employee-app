import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesHomeComponent } from './screens/employees-home/employees-home.component';
import { EmployeesViewComponent } from './components/employees-view/employees-view.component';
import { AddNewEmployeeComponent } from './screens/add-new-employee/add-new-employee.component';
import { UpdateEmployeeComponent } from './screens/update-employee/update-employee.component';
import { DeleteEmployeeComponent } from './screens/delete-employee/delete-employee.component';
import { FormsModule }   from '@angular/forms';
import { LoaderComponent } from './component/loader/loader.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EmployeesHomeComponent,
    EmployeesViewComponent,
    AddNewEmployeeComponent,
    UpdateEmployeeComponent,
    DeleteEmployeeComponent,
    LoaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],

  exports:[
    HeaderComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
