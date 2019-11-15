import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-add-new-employee',
  templateUrl: './add-new-employee.component.html',
  styleUrls: ['./add-new-employee.component.css']
})
export class AddNewEmployeeComponent implements OnInit {
  employeeId:number;
  personId:number;
  employeeNumber:string;
  employmentDate:Date;
  firstname:string;
  lastname:string;
  birthDate:Date;

  constructor(private _employeeService:EmployeesService, private _router:Router) { }

  ngOnInit() {
  }

  onFormSubmit(){
    let employeeObject ={
      employeeNumber: this.employeeNumber,
      employmentDate:this.employmentDate,
      firstName:this.firstname,
      lastName:this.lastname,
      birthDate:this.birthDate,
      personId:this.personId,
      employeeId:this.employeeId
    }

    let personObject ={
      personId:this.personId,
      lastName:this.lastname,
      firstName:this.firstname,
      birthDate:this.birthDate
    }


    this._employeeService.createPerson(personObject).subscribe(res =>{
        this._employeeService.createEmployee(employeeObject).subscribe(response =>{

            this._router.navigate(["/"])

        }, (error)=>{
          if (error.status == 409){
            console.log('employee with that id already exists');
          }else{
            console.log('and unexpected error has occured')
          }
        })
    }, (error)=>{

      if (error.status == 409){
        console.log('person with that id already exists');
      }else{
        console.log('and unexpected error has occured')
      }
 
    });

   
  }

}
