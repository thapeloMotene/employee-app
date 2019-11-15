import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {
  recordId:string;

  constructor(private _routeInfo:ActivatedRoute, private _employeeService:EmployeesService, private _router:Router) { 
    this._routeInfo.params.subscribe(paramMap =>{
      this.recordId =paramMap["id"];
    })
  }

  onDelete(){
      this._employeeService.deleteEmployee(this.recordId).subscribe(resp =>{
            this._router.navigate(['/']);
      }, err =>{
        console.log("could not delete employee information")
      });


  }
  
  ngOnInit() {
  }

}
