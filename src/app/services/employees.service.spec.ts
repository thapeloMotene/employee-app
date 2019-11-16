
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

export const dummyPersonListResponse ={
  data:[ 
    {personId: 0,lastName: "Motene",firstName: "Thapelo",birthDate: "2019-11-16T11:39:06.350Z"},
    {personId: 1,lastName: "Motene",firstName: "Mogwera",birthDate: "2019-11-16T11:39:06.350Z"},
]
}

export const dummyPersonResponse={
  data: {personId: 0,lastName: "Motene",firstName: "Thapelo",birthDate: "2019-11-16T11:39:06.350Z"}
}

export const dummyEmployeeResponse ={
  data:{employeeId: 554,personId: 1,employeeNumber: "HR1234",employedDate: "2019-11-14T19:55:01.239Z",terminatedDate: "2019-11-14T19:55:01.239Z"},
}


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
    req.flush(dummyEmployeeListResponse); 


  });

  it('getEmployee() should get single employee', ()=>{
    let service;
    injector = getTestBed();
    service = injector.get(EmployeesService);
    httpMock = injector.get(HttpTestingController);

    service.getEmployee(554).subscribe((result)=>{
      expect(result).toBe(dummyEmployeeResponse);
    });

    const req = httpMock.expectOne('/api/Employees/554');
    expect(req.request.method).toBe('GET');
    
    req.flush(dummyEmployeeResponse); 


  });

  it('getPerson() should get single person', ()=>{
    let service;
    injector = getTestBed();
    service = injector.get(EmployeesService);
    httpMock = injector.get(HttpTestingController);

    service.getPerson(0).subscribe((result)=>{
      expect(result).toBe(dummyPersonResponse);
    });

    const req = httpMock.expectOne('/api/People/0');
    expect(req.request.method).toBe('GET');
  
    req.flush(dummyPersonResponse); 


  });


  it('updateEmployee() should return updated employee' , () =>{

    let service;
    injector = getTestBed();
    service = injector.get(EmployeesService);
    httpMock = injector.get(HttpTestingController);

    service.updateEmployee(0, dummyEmployeeResponse).subscribe((result)=>{
      expect(result).toBe(dummyEmployeeResponse);
    });

    const req = httpMock.expectOne('/api/Employees/0');
    expect(req.request.method).toBe('PUT');
  
    req.flush(dummyEmployeeResponse); 

  });

  it('updatePerson() should return updated person' , () =>{

    let service;
    injector = getTestBed();
    service = injector.get(EmployeesService);
    httpMock = injector.get(HttpTestingController);

    service.updatePerson(0, dummyEmployeeResponse).subscribe((result)=>{
      expect(result).toBe(dummyEmployeeResponse);
    });

    const req = httpMock.expectOne('/api/People/0');
    expect(req.request.method).toBe('PUT');
  
    req.flush(dummyEmployeeResponse); 

  });


  it ("deleteEmployee() should delete employee", ()=>{

    let service;
    injector = getTestBed();
    service = injector.get(EmployeesService);
    httpMock = injector.get(HttpTestingController);

    service.deleteEmployee(0).subscribe((result)=>{
      
      expect(result).toBe(dummyEmployeeResponse);
    });

    const req = httpMock.expectOne('/api/Employees/0');
    expect(req.request.method).toBe('DELETE');
  
    req.flush(dummyEmployeeResponse); 

  });



  it ("createEmployee() should create employee", ()=>{

    let service;
    injector = getTestBed();
    service = injector.get(EmployeesService);
    httpMock = injector.get(HttpTestingController);

    service.createEmployee().subscribe((result)=>{
      
      expect(result).toBe(dummyEmployeeResponse);
    });

    const req = httpMock.expectOne('/api/Employees');
    expect(req.request.method).toBe('POST');
  
    req.flush(dummyEmployeeResponse); 

  });


  it ("createPerson() should create person", ()=>{

    let service;
    injector = getTestBed();
    service = injector.get(EmployeesService);
    httpMock = injector.get(HttpTestingController);

    service.createPerson(dummyPersonResponse).subscribe((result)=>{
      
      expect(result).toBe(dummyPersonResponse);
    });

    const req = httpMock.expectOne('/api/People');
    expect(req.request.method).toBe('POST');
  
    req.flush(dummyPersonResponse); 

  });


  
  })


  





