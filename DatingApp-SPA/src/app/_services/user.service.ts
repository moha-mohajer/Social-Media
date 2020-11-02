import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

// Send token to server automaticly
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl; // Short Cut for http://localhost:5000/api/'.

  constructor(private http: HttpClient) {}

  // Get an array of users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  // Get a user by id
  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  // Update a user
  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }
}
