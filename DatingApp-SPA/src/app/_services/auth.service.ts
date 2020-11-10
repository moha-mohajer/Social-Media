import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // baseUrl = 'http://localhost:5000/api/auth/';
  baseUrl = environment.apiUrl + 'auth/'; // create shortcut for accesss baseurl
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  //
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: typedef
  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }


  // tslint:disable-next-line: typedef
  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);

          //
          localStorage.setItem('user', JSON.stringify(user.user));

          this.decodedToken = this.jwtHelper.decodeToken(user.token);

          //
          this.currentUser = user.user;
          // Using BehaviorSubject to add any to any communication to our app.
          this.changeMemberPhoto(this.currentUser.photoUrl);

        }
      })
    );
  }

  // tslint:disable-next-line: typedef
  // register(model: any) {
  //   return this.http.post(this.baseUrl + 'register', model);

  // tslint:disable-next-line: typedef
  register(user: User) { // Completing the Registration implementation
    return this.http.post(this.baseUrl + 'register', user);
  }

  // tslint:disable-next-line: typedef
  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
