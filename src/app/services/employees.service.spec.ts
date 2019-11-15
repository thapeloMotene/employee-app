
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeesService } from './employees.service';

export const dummyEmployeeListResponse = {
  data: [
    {employeeId: 554,personId: 1,employeeNumber: "HR1234",employedDate: "2019-11-14T19:55:01.239Z",terminatedDate: "2019-11-14T19:55:01.239Z"},
    {employeeId: 3526,personId: 2,employeeNumber: "HR1235",employedDate: "2019-11-14T19:55:01.239Z",terminatedDate: "2019-11-14T19:55:01.239Z"},
    {employeeId: 5775,personId: 3,employeeNumber: "HR1236",employedDate: "2019-11-14T19:55:01.239Z",terminatedDate: "2019-11-14T19:55:01.239Z"},
    {employeeId: 9092,personId: 4,employeeNumber: "HR1237",employedDate: "2019-11-14T19:55:01.239Z",terminatedDate: "2019-11-14T19:55:01.239Z"},
    {employeeId: 1121,personId: 5,employeeNumber: "HR1238",employedDate: "2019-11-14T19:55:01.239Z",terminatedDate: "2019-11-14T19:55:01.239Z"},
  ]
}; 




describe('EmployeesService', () => {
  let injector: TestBed;
  let service: EmployeesService;
  let httpMock: HttpTestingController;

  beforeEach(() => 
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [EmployeesService],
  }));
  
 


 

  it('should be created', () => {
    const service: EmployeesService = TestBed.get(EmployeesService);
    expect(service).toBeTruthy();
  });

  


  it('getEmployeeList() should get all employees', ()=>{
    let service;
    injector = getTestBed();
    service = injector.get(EmployeesService);
    httpMock = injector.get(HttpTestingController);

   
    service.getEmployeeList().subscribe((result)=>{
      expect(result).toBe(dummyEmployeeListResponse);
    });

    const req = httpMock.expectOne('/api/Employees');
    expect(req.request.method).toBe('GET');
    // Note That we are flushing dummy "http" response
    req.flush(dummyEmployeeListResponse); 


  })


});


