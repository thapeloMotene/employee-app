import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location, CommonModule } from '@angular/common';
import { EmployeesViewComponent } from './employees-view.component';

describe('EmployeesViewComponent', () => {
  let component: EmployeesViewComponent;
  let fixture: ComponentFixture<EmployeesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes([
         { path: 'update-employee/:id', component: EmployeesViewComponent }
        ])
      ],
      declarations: [ EmployeesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
