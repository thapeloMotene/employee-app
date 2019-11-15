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
  birthDate:any;
  terminatedDate:any;
  hasEmployee:Boolean =false;
  hasPerson:Boolean =false;
 

  constructor(private _routeInfo:ActivatedRoute, private _employeeService:EmployeesService, private _router:Router) { 
    this._routeInfo.params.subscribe(paramMap =>{
      this.employeeId =paramMap["id"];

      this._employeeService.getEmployee(this.employeeId).subscribe(res =>{
          this.employeeNumber= res["employeeNumber"];
          this.employeeId = res["employeeId"];
          this.employmentDate=  this.parseDate(res["employmentDate"]);
          this.terminatedDate=this.parseDate(res["terminatedDate"]);
          this.personId = res["personId"];
          this.hasEmployee = true;
          
          this._employeeService.getPerson(this.personId).subscribe(result =>{

            console.log('reslt', result)
            this.firstname=result["firstName"];
            this.lastname =result["lastName"];
            this.birthDate=  this.parseDate(result["birthDate"]);

            this.hasPerson=true;
          })
      });
    });
  }
  ngOnInit() {
  }

  parseDate( dateString){

    if (dateString){
      return new Date(dateString);
    }else{
      return null
    }


  }

  onFormSubmit(){


    let employeeObj ={
      employeeId: this.employeeId,
      personId:this.personId,
      birthDate:this.birthDate,
      employeeNumber:this.employeeNumber,
      employedDate:this.employmentDate,
      terminatedDate:this.terminatedDate,
      firstName:this.firstname.trim(),
      lastName:this.lastname.trim(),

    }
 

   


    this._employeeService.updatePerson(this.employeeId,employeeObj).subscribe(res =>{
        this._employeeService.updatePerson(this.personId,employeeObj).subscribe(response =>{

            this._router.navigate(["/"]);

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
