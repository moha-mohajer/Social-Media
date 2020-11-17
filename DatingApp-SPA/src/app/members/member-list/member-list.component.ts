import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[]; // Bring user from user model
  user: User = JSON.parse(localStorage.getItem('user')); // Adding filtering functionality to the SPA
  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
    { value: 'both', display: 'Both' }
  ];
  userParams: any = {};
  pagination: Pagination; // Using nix-bootstrap pagination module

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  // tslint:disable-next-line: typedef
  ngOnInit() {

    this.route.data.subscribe(data => {
      // this.users = data[`users`];
      this.users = data['users'].result;
      this.pagination = data['users'].pagination; // Using nix-bootstrap pagination module
    });

    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female'; // Adding filtering functionality to the SPA
    this.userParams.minAge = 18; // Adding filtering functionality to the SPA
    this.userParams.maxAge = 99; // Adding filtering functionality to the SPA
    this.userParams.orderBy = 'lastActive'; // Adding the Sorting functionality to the SPA
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page; // Using nix-bootstrap pagination module
    this.loadUsers();
  }

  resetFilters() { // Adding filtering functionality to the SPA
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }

  loadUsers() {
    this.userService // Using nix-bootstrap pagination module
      .getUsers(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.userParams
      )
      .subscribe(
        (res: PaginatedResult<User[]>) => {
          this.users = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.alertify.error(error);
        }
      );
  }
}
