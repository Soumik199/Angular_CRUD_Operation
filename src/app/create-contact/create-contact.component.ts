import { Component } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ContactService } from '../service/contact.service';
import { RouterModule ,Router} from '@angular/router';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-create-contact',
  imports: [CommonModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,RouterModule,MatDatepickerModule,MatNativeDateModule,MatCardModule,MatIconModule,MatSnackBarModule],
  templateUrl: './create-contact.component.html',
  styleUrl: './create-contact.component.css',
  providers:[DatePipe]
})
export class CreateContactComponent {
  ContactForm!: FormGroup
  constructor(
    private router : Router,
    private contactService : ContactService , 
    private fb : FormBuilder,
    private datepipe:DatePipe,
    private snackBar : MatSnackBar
     ){}
  ngOnInit(){
    this.ContactForm = this.fb.group({
       name: ['', Validators.required],
       company:['',Validators.required],
       phone:['',Validators.required],
       address:[''],
       email:['',Validators.required],
       lastDateContact:['',Validators.required]
    })
}
  saveContact(){
    if(this.ContactForm.invalid){
      alert("Please fill all the required field")
    }
    const formData = this.ContactForm.value
    formData.lastDateContact = this.datepipe.transform(formData.lastDateContact, 'yyyy-MM-dd')
    this.contactService.CreateContacts(formData)
    .subscribe(()=>{
      this.snackBar.open("Contact Updated ","Close",{
        duration:3000
      }),
      this.router.navigate(['/'])
    })
  }


}
