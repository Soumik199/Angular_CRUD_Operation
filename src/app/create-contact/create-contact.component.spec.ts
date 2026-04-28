import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateContactComponent } from './create-contact.component';
import { ContactService } from '../service/contact.service';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('CreateContactComponent', () => {
  let component: CreateContactComponent;
  let fixture: ComponentFixture<CreateContactComponent>;
  let contactServiceSpy: jasmine.SpyObj<ContactService>;

  beforeEach(async () => {
    contactServiceSpy = jasmine.createSpyObj('ContactService', ['CreateContacts']);
    contactServiceSpy.CreateContacts.and.returnValue(of({}));
    await TestBed.configureTestingModule({
      imports: [CreateContactComponent,ReactiveFormsModule],
      providers: [
        provideRouter([]),
        { provide: ContactService, useValue: contactServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize form', () => {
    expect(component.ContactForm).toBeDefined();
  });

  //-- Check the Form is Invalid when emplty field is present

  it('should make form invalid when empty', () => {
    component.ContactForm.setValue({
      name: '',
      company: '',
      phone: '',
      address: '',
      email: '',
      lastDateContact: ''
    });
 
    expect(component.ContactForm.invalid).toBeTrue();
  });
 
  // Saving
  it('should call createContact when saveContact is called', () => {
 
    component.ContactForm.setValue({
      name: 'Sherya',
      company: 'Kolkta',
      phone: '9876543210',
      address: 'Durgapur',
      email: 'john@test.com',
      lastDateContact: '2026-03-15'
    });
 
    component.saveContact();
 
    expect(contactServiceSpy.CreateContacts).toHaveBeenCalled();
  });
  


});
