import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
//
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  // constructor(public authService: AuthService, private alertify: AlertifyService) {}
  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    // Using routing in our components.
    private router: Router
  ) {}

  // tslint:disable-next-line: typedef
  ngOnInit() {
    // Using BehaviorSubject to add any to any communication to our app.
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  // tslint:disable-next-line: typedef
  login() {
    this.authService.login(this.model).subscribe(
      next => {
        this.alertify.success('Logged in successfully');
      },
      error => {
        this.alertify.error(error);
      },
      () => {
        this.router.navigate(['/members']); // After login navigate to members page.
      }
    );
  }

  // tslint:disable-next-line: typedef
  loggedIn() {
    return this.authService.loggedIn();
  }

  // tslint:disable-next-line: typedef
  logout() {
    localStorage.removeItem('token');
    //
    this.authService.decodedToken = null;
    this.authService.currentUser = null;

    this.alertify.message('logged out');
    this.router.navigate(['/home']); // After logout jump to home page.
  }
}
