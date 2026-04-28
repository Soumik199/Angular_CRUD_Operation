import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactDetailsComponent } from './contact-details.component';
import { ContactService } from '../service/contact.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
describe('ContactDetailsComponent', () => {
  let component: ContactDetailsComponent;
  let fixture: ComponentFixture<ContactDetailsComponent>;
  let contactServiceSpy: jasmine.SpyObj<ContactService>;
  beforeEach(async () => {
    const mockContact = {
      id: 1,
      name: 'John',
      company: 'ABC',
      phone: '9876543210',
      address: 'Durgapur',
      email: 'john@test.com',
      lastDateContact: '2026-03-15'
    };
    contactServiceSpy = jasmine.createSpyObj('ContactService',
      ['getContactById', 'updateContactById', 'deleteContactById']
    );
 
    contactServiceSpy.getContactById.and.returnValue(of(mockContact));
    contactServiceSpy.updateContactById.and.returnValue(of(mockContact));
    contactServiceSpy.deleteContactById.and.returnValue(of({}));
 
    await TestBed.configureTestingModule({
      imports: [
        ContactDetailsComponent,
        ReactiveFormsModule
      ],
      providers: [
        provideRouter([]),
 
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        },
 
        { provide: ContactService, useValue: contactServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load contact on init', () => {
 
    component.ngOnInit();
 
    expect(contactServiceSpy.getContactById).toHaveBeenCalled();
 
  });
  it('should update contact', () => {
 
    component.contactForm.setValue({
      name: 'John',
      company: 'ABC',
      phone: '9876543210',
      address: 'Durgapur',
      email: 'john@test.com',
      lastDateContact: '2026-03-15'
    });
  });

  it('should delete contact', () => {
 
    component.DeleteContact();
 
    expect(contactServiceSpy.deleteContactById).toHaveBeenCalled();
 
  });

});
