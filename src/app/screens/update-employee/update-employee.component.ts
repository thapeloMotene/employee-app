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
  employmentDate:any;
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
          this.employmentDate= res["employedDate"];
          this.terminatedDate=res["terminatedDate"];
          this.personId = res["personId"];
          this.hasEmployee = true;
          
          this._employeeService.getPerson(this.personId).subscribe(result =>{
        
            this.personId= result["personId"];
            this.firstname=result["firstName"];
            this.lastname =result["lastName"];
            this.birthDate=result["birthDate"];

            this.hasPerson=true;
          })
      });
    });
  }
  ngOnInit() {
  }


  employeeNrErrorMessage:string
  employmentDateErrorMessage:string;
  birthdateErrorMessage:string;
  firstnameErrorMessage:string;
  lastnameErrorMessage:string;

  validate(){
    let isFieldValid = true;
    this.employeeNrErrorMessage="";
    this.employmentDateErrorMessage="";
    this.birthdateErrorMessage="";
    this.firstnameErrorMessage="";
    this.lastnameErrorMessage="";

    if (!this.employeeNumber){
      isFieldValid=false;
      this.employeeNrErrorMessage="Please fill in the employee number (it is required)";
    }

    if (!this.employmentDate){
      isFieldValid=false;
      this.employmentDateErrorMessage="Please fill in the employment date (it is manditory)";
    }

    if (!this.firstname){
      isFieldValid=false;
      this.firstnameErrorMessage="Please fill in the firstname (it is manditory)";
    }

    if(!this.lastname){
      isFieldValid=false;
      this.lastnameErrorMessage="Please fill in the firstname (it is manditory)";
    }

    if (!this.birthDate){
      isFieldValid=false;
      this.birthdateErrorMessage="Please fill in the birth date (it is manditory)";
    }

    return isFieldValid;
  }

  onFormSubmit(){

    console.log("isValid", this.validate());

  if (this.validate()){
    let employeeObj ={
      employeeId: this.employeeId,
      personId:this.personId,
      employeeNumber:this.employeeNumber,
      employedDate:this.employmentDate,
      terminatedDate:this.terminatedDate,
  
  
    }
  
    let personObject ={
      personId:this.personId,
      birthDate:this.birthDate,
      firstName:this.firstname.trim(),
      lastName:this.lastname.trim(),
    }
  
  
    this._employeeService.updateEmployee(this.employeeId,employeeObj).subscribe(res =>{
        this._employeeService.updatePerson(this.personId,personObject).subscribe(response =>{
  
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

  parseDate(e){
    let date = new Date(e)
    return date.toISOString();
  }

 


}
