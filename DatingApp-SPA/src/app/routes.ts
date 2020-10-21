import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';

// Setting up routing in Angular
export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    // Protecting multiple routes with a single route guard using dummy routes
    path: '', // Dummy routes
    runGuardsAndResolvers: 'always',
    // Protecting our routes with a route guard
    canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MemberListComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'lists', component: ListsComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }  // Setting up routing in Angular
];
