import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesHomeComponent } from './screens/employees-home/employees-home.component';
import { AddNewEmployeeComponent } from './screens/add-new-employee/add-new-employee.component';
import { UpdateEmployeeComponent } from './screens/update-employee/update-employee.component';
import { DeleteEmployeeComponent } from './screens/delete-employee/delete-employee.component';

const routes: Routes = [
  {
    path:'',
    component:EmployeesHomeComponent
  },
  {
    path:'new-employee',
    component:AddNewEmployeeComponent
  },
  {
    path:'update-employee/:id',
    component:UpdateEmployeeComponent
  },
  {
    path:'delete-employee/:id',
    component:DeleteEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
