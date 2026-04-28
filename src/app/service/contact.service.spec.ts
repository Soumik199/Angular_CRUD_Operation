import { TestBed } from '@angular/core/testing';

import { ContactService } from './contact.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting,HttpTestingController } from '@angular/common/http/testing';
describe('ContactService', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;
  const api = 'http://localhost:3000/contacts';
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [
      ContactService,
      provideHttpClient(),
      provideHttpClientTesting()
    ]});
    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
 

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // GET CONTACTS
 it('should fetch all contacts', () => {
 
  const mockContacts = [
    { id: 1, name: 'John', company: 'TCS',
    phone: '9876543210',
    address: 'Kolkata',
    email: 'john@test.com',
    lastContactDate: '2024-02-10' },
    
    { id: 2, name: 'Sam', company: 'TCS',
    phone: '9876543210',
    address: 'Kolkata',
    email: 'john@test.com',
    lastContactDate: '2024-02-10'}
  ];

  service.getContacts().subscribe((res:any) => {
    expect(res.length).toBe(2);
    expect(res).toEqual(mockContacts);
  });

  const req = httpMock.expectOne(api);
  expect(req.request.method).toBe('GET');

  req.flush(mockContacts);
});

// CREATE CONTACT
it('should create a contact', () => {
 
  const newContact = { name: 'David', phone: '999999999',
  address: 'Kolkata',
  email: 'David@test.com',
  lastContactDate: '2024-02-10' };

  service.CreateContacts(newContact).subscribe((res:any) => {
    expect(res).toEqual(newContact);
  });

  const req = httpMock.expectOne(api);
  expect(req.request.method).toBe('POST');

  req.flush(newContact);
});

// GET CONTACT BY ID
it('should fetch contact by id', () => {
 
  const mockContact = { id: 1, name: 'John', phone: '1234567890', address: 'Kolkata',
  email: 'David@test.com',
  lastContactDate: '2024-02-10' };

  service.getContactById(1).subscribe((res:any) => {
    expect(res).toEqual(mockContact);
  });

  const req = httpMock.expectOne(`${api}/1`);
  expect(req.request.method).toBe('GET');

  req.flush(mockContact);
});


// UPDATE CONTACT
it('should update contact', () => {
 
  const updatedContact = { name: 'Updated', phone: '1111111111' , address: 'Kolkata',
  email: 'David@test.com',
  lastContactDate: '2024-02-10'};

  service.updateContactById(1, updatedContact).subscribe((res:any) => {
    expect(res).toEqual(updatedContact);
  });

  const req = httpMock.expectOne(`${api}/1`);
  expect(req.request.method).toBe('PUT');

  req.flush(updatedContact);
});

// DELETE CONTACT by ID
it('should delete contact', () => {

  service.deleteContactById(1).subscribe((res:any) => {
    expect(res).toBeNull();
  });

  const req = httpMock.expectOne(`${api}/1`);
  expect(req.request.method).toBe('DELETE');

  req.flush(null);
});

});
