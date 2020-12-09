import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Pagination, PaginatedResult } from '../_models/pagination';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  users: User[]; // Creating the Lists component
  pagination: Pagination; // Creating the Lists component
  likesParam: string; // Creating the Lists component

  constructor(
    private authService: AuthService, // Creating the Lists component
    private userService: UserService, // Creating the Lists component
    private route: ActivatedRoute, // Creating the Lists component
    private alertify: AlertifyService // Creating the Lists component
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => { // Creating the Lists component
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.likesParam = 'Likers';
  }

  loadUsers() { // Creating the Lists component
    this.userService
      .getUsers(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        null,
        this.likesParam
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

  pageChanged(event: any): void { // Creating the Lists component
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }
}
