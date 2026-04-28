import { Component ,OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table'
import { MatButton } from '@angular/material/button';
import { ContactService } from '../service/contact.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  imports: [MatTableModule, MatButton,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
   DisplayedColumns: string[] =[
    'name',
    'company',
    'phone',
    'address',
    'email',
    'lastDateContact'
   ]
   contacts:any = []
   constructor(private ContactService : ContactService){}
   ngOnInit(){
    this.ContactService.getContacts().subscribe((data:any)=> this.contacts =data)
   }
}
