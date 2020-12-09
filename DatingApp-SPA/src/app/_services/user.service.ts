import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

// Send token to server automaticly
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl; // Short Cut for http://localhost:5000/api/'.

  constructor(private http: HttpClient) {}

  // Get an array of users
  getUsers(
    page?,
    itemsPerPage?,
    userParams?, // Adding filtering functionality to the SPA
    likesParam?
  ): Observable<PaginatedResult<User[]>> { // Setting up pagination in the SPA
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult< // Setting up pagination in the SPA
      User[]
    >();

    // Setting up pagination in the SPA
    let params = new HttpParams();

    // Adding filtering functionality to the SPA
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Adding filtering functionality to the SPA
    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy); // Adding the Sorting functionality to the SPA
    }

    // Creating the Lists component
    if (likesParam === 'Likers') {
      params = params.append('Likers', 'true');
    }

    // Creating the Lists component
    if (likesParam === 'Likees') {
      params = params.append('Likees', 'true');
    }

    // Setting up pagination in the SPA
    return this.http
      .get<User[]>(this.baseUrl + 'users', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }

  // Get a user by id
  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  // Update a user
  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  // Adding the Set Main Photo functionality to the SPA
  setMainPhoto(userId: number, id: number) {
    return this.http.post(
      this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain',
      {}
    );
  }
  // Adding the Delete Photo functionality to the SPA
  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
  }

  // Adding the Send Like functionality in the API
  sendLike(id: number, recipientId: number) {
    return this.http.post(
      this.baseUrl + 'users/' + id + '/like/' + recipientId,
      {}
    );
  }
}
