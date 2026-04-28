import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import path from 'path';
export const routes: Routes = [
  {path:'' , component : DashboardComponent},
  {path:'create', component: CreateContactComponent},
  {path: 'contact/:id' , component : ContactDetailsComponent}
];
