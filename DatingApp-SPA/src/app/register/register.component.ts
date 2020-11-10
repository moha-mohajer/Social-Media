import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  user: User; // Completing the Registration implementation
  registerForm: FormGroup; // Introduction to Reactive Forms in Angular
  bsConfig: Partial<BsDatepickerConfig>; // Handling Dates in Forms

  constructor(
    private authService: AuthService,
    private router: Router, // Completing the Registration implementation
    private alertify: AlertifyService,
    private fb: FormBuilder // Using the Reactive Forms FormBuilder Service
  ) {}

  // tslint:disable-next-line: typedef
  ngOnInit() {
    // Handling Dates in Forms
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.createRegisterForm();
  }
  // tslint:disable-next-line: typedef
  createRegisterForm() {
    // Using the Reactive Forms FormBuilder Service
    this.registerForm = this.fb.group(
      // Validation in Reactive forms
      {
        gender: ['male'], // Expanding the Registration form
        username: ['', Validators.required], // Validation in Reactive forms
        knownAs: ['', Validators.required], // Expanding the Registration form
        dateOfBirth: [null, Validators.required], // Expanding the Registration form
        city: ['', Validators.required], // Expanding the Registration form
        country: ['', Validators.required], // Expanding the Registration form
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8),
          ], // Validation in Reactive forms
        ],
        confirmPassword: ['', Validators.required], // Validation in Reactive forms
      },
      // (error) => {
      //   this.alertify.error(error);
      // }
      { validator: this.passwordMatchValidator }
    );
  }

  // Custom Validators in Reactive forms
  // tslint:disable-next-line: typedef
  passwordMatchValidator(g: FormGroup) { // Custom Validators in Reactive forms
    return g.get('password').value === g.get('confirmPassword').value
      ? null // if password match
      : { mismatch: true }; // if password not match
  }

  // tslint:disable-next-line: typedef
  register() {
    if (this.registerForm.valid) { // Completing the Registration implementation
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(
        () => {
          this.alertify.success('Registration succesful');
        },
        error => {
          this.alertify.error(error);
        },
        () => {
          this.authService.login(this.user).subscribe(() => {
            this.router.navigate(['/members']);
          });
        }
      );
    }
  }

  // tslint:disable-next-line: typedef
  cancel() {
    this.cancelRegister.emit(false);
  }
}
