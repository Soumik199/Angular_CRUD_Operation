import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  api = "http://localhost:3000/contacts"

  constructor(private http :HttpClient){}

  getContacts(){
    return this.http.get(this.api)
  }
  CreateContacts(data:any){
    return this.http.post(this.api,data)
  }
  getContactById(id:any){
    return this.http.get(`${this.api}/${id}`)
  }
  updateContactById(id:any , data:any){
   return this.http.put(`${this.api}/${id}`,data)
  } 
  deleteContactById(id:any ){
   return this.http.delete(`${this.api}/${id}`)
  }
}
