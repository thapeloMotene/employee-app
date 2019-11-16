import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees.service';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
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

  constructor(private _employeeService:EmployeesService, private _router:Router, private toastr: ToastrService) { }

  ngOnInit() {
  }


  employeeNrErrorMessage:string
  employmentDateErrorMessage:string;
  birthdateErrorMessage:string;
  firstnameErrorMessage:string;
  lastnameErrorMessage:string;
  employmentIdErrorMessage:string;
  personIdErrorMessage:string;

validate(){
    let isFieldValid = true;
    this.employeeNrErrorMessage="";
    this.employmentDateErrorMessage="";
    this.birthdateErrorMessage="";
    this.firstnameErrorMessage="";
    this.lastnameErrorMessage="";
    this.personIdErrorMessage="";
    this.employmentIdErrorMessage="";

    if (!this.personId){
      isFieldValid=false;
      this.personIdErrorMessage="Please fill in the person id (it is required)";
    }

    if(!this.employeeId){
      isFieldValid=false;
      this.employmentIdErrorMessage="Please fill in the employee id (it is required)";
    }

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

    this.personIdErrorMessage="";
    this.employeeNrErrorMessage="";

    if (this.validate()){
      let employeeObject ={
        employeeNumber: this.employeeNumber,
        employedDate:this.employmentDate,
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
            this.toastr.success('Success!', 'Employee has be created successfully');
              this._router.navigate(["/"])
  
          }, (error)=>{
            if (error.status == 409){
              this.employmentIdErrorMessage="Employee with that id already exists";
            }else{
              
              console.log('and unexpected error has occured')
            }
          })
      }, (error)=>{
  
        if (error.status == 409){
         
          this.personIdErrorMessage="Person with that id already exists"
        }else{
          this.toastr.error('Sorry!', 'An unexpected error has occured');
          console.log('and unexpected error has occured')
        }
   
      });

    }
   

   
  }

}
