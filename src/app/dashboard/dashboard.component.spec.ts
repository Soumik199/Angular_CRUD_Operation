import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContactService } from '../service/contact.service';
import { DashboardComponent } from './dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let contactServiceSpy: jasmine.SpyObj<ContactService>;
  
  beforeEach(async () => {
    const mockContacts = [
      {
        id:'1',
        name: 'John Doe',
        company: 'TCS',
        phone: '9876543210',
        address: 'Kolkata',
        email: 'john@test.com',
        lastContactDate: '2024-02-10'
      },
      {
        name: 'Jane Smith',
        company: 'Infosys',
        phone: '9123456780',
        address: 'Durgapur',
        email: 'jane@test.com',
        lastContactDate: '2024-03-05'
      }
    ];
    contactServiceSpy = jasmine.createSpyObj('ContactService', ['getContacts']);
    contactServiceSpy.getContacts.and.returnValue(of(mockContacts));
    await TestBed.configureTestingModule({
      imports: [DashboardComponent ,MatTableModule,MatButtonModule],
      providers: [
        { provide: ContactService, useValue: contactServiceSpy },
        provideRouter([])
      ]
    })
    .compileComponents();
  
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //--- Load the Data in Table  -------
  it('should load contacts on init', () => {

    fixture.detectChanges();
    expect(contactServiceSpy.getContacts).toHaveBeenCalled();
 
  });
  //--- Display the data in the column------
  it('should have displayed columns', () => {
 
    expect(component.DisplayedColumns.length).toBeGreaterThan(0);
 
  });

});
