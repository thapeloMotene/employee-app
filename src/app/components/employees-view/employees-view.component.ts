import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'employees-view',
  templateUrl: './employees-view.component.html',
  styleUrls: ['./employees-view.component.css']
})
export class EmployeesViewComponent implements OnInit {
@Input() employees : Array<any>;

  constructor() { }

  ngOnInit() {
  }

}
