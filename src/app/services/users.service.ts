// users.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from '../interface/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = "http://localhost:3000/users"; // Base API URL for users

  constructor(private http: HttpClient) { }

  getUsers():Observable<user[]> {
    const url = "http://localhost:3000/users"; // Fetch all users
    return this.http.get<user[]>(url);
  }

  saveUsers(user: user):Observable<user> {
    const url = "http://localhost:3000/users"; // Create new user
    return this.http.post<user>(url, user);
  }

  deleteUsers(id: string):Observable<user> {
    return this.http.delete<user>(this.url+'/'+id); // Delete user by ID
  }

  getSelectedUser(id: string):Observable<user> {
    return this.http.get<user>(this.url+'/'+id); // Fetch single user by ID
  }

  updateUser(user: user):Observable<user> {
    return this.http.put<user>(this.url+'/'+user.id, user); // Update user by ID
  }

}
