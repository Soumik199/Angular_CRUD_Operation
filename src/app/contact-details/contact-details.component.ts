import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../service/contact.service';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-contact-details',
  imports: [CommonModule,MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule,MatIconModule,MatDatepickerModule,MatNativeDateModule,MatSnackBarModule],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css',
  providers:[DatePipe]
})
export class ContactDetailsComponent {

  contactForm!:FormGroup
  contactId:any
  constructor(
    private route : ActivatedRoute,
    private fb : FormBuilder,
    private router : Router,
    private contactservice : ContactService,
    private snackbar : MatSnackBar,
    private datepipe:DatePipe){}

  
  ngOnInit(){
    this.contactForm = this.fb.group({
      name: [''],
       company:[''],
       phone:[''],
       address:[''],
       email:[''],
       lastDateContact:['']
    })
    this.contactId = this.route.snapshot.paramMap.get('id');
    console.log("Contactid:", this.contactId)
    this.LoadContactDetails()
    
  }

  LoadContactDetails(){
    this.contactservice.getContactById(this.contactId).subscribe((data :any)=>{
      if(data.lastDateContact){
        data.lastDateContact = new Date(data.lastDateContact)
      }
      this.contactForm.patchValue(data)
      //Path value is used add the form data to the form
      console.log(this.contactForm.patchValue(data))
    })
  }
  
  UpdateContact(){

    const formData = this.contactForm.value;
    formData.lastDateContact = this.datepipe.transform(formData.lastDateContact,'yyyy-MM-dd')
    this.contactservice.updateContactById(this.contactId,formData).subscribe(()=>{
      this.snackbar.open("Updated on the Records", "Close",{
        duration :3000
      })
      this.router.navigate(['/'])
    }
      
    )
  }

  DeleteContact(){
    this.contactservice.deleteContactById(this.contactId).subscribe(()=>{
      this.snackbar.open("Delete Sucessfully", "Close",{
        duration:3000
      })
      this.router.navigate(['/'])
    })
  }
}
