import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employees-home',
  templateUrl: './employees-home.component.html',
  styleUrls: ['./employees-home.component.css']
})
export class EmployeesHomeComponent implements OnInit {

  public employees:Array<any>;
  public hasEmployees:Boolean = false;


  constructor(private _employeeService:EmployeesService) { 


  }

  ngOnInit() {
    this._employeeService.getEmployeeList().subscribe(res =>{
    
      this.employees = res;
      this.hasEmployees = true;
    })
  }

}
