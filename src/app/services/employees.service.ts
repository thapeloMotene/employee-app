import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  
  constructor(private _http:HttpClient) {
   
   }

  getEmployeeList(): Observable<any> {
    return this._http.get("/api/Employees");
  }

  createEmployee(obj:any){
    return this._http.post("/api/Employees", obj);

  }

  createPerson(obj:any){
    return this._http.post("/api/People", obj);
  }
  deleteEmployee(id:string){
    return this._http.delete('/api/Employees/'+id);
  }


  getEmployee(id:any){
    return this._http.get("/api/Employees/"+id);
  }

  getPerson(id:any){
    return this._http.get("/api/People/"+id);
  }

  updateEmployee(id:any, body:any){
    return this._http.put("/api/Employees/"+id, body);

  }

  updatePerson(id:any, body:any){

    return this._http.put("/api/People/"+id, body);

  }




}
