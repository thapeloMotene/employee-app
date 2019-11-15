import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  employeeId:number;
  personId:number;
  employeeNumber:string;
  employmentDate:Date;
  firstname:string;
  lastname:string;
  birthDate:Date;
  terminatedDate:Date;
  hasEmployee:Boolean =false;
  hasPerson:Boolean =false;
 

  constructor(private _routeInfo:ActivatedRoute, private _employeeService:EmployeesService, private _router:Router) { 
    this._routeInfo.params.subscribe(paramMap =>{
      this.employeeId =paramMap["id"];

      this._employeeService.getEmployee(this.employeeId).subscribe(res =>{
          this.employeeNumber= res["employeeNumber"];
          this.employeeId = res["employeeId"];
          this.employmentDate=res["employmentDate"];
          this.terminatedDate=res["terminatedDate"];
          this.personId = res["personId"];
          this.hasEmployee = true;
          
          this._employeeService.getPerson(this.personId).subscribe(res =>{
            this.firstname=res["firstName"];
            this.lastname =res["lastName"];
            this.birthDate= res["birthDate"];

            this.hasPerson=true;
          })
      });
    });
  }
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
