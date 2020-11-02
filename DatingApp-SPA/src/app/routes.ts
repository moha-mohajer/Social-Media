import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

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
      // { path: 'members', component: MemberListComponent },
      //
      { path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver} },
      {
        path: 'members/:id',
        component: MemberDetailComponent,
        resolve: { user: MemberDetailResolver }
      },
      { // Add Edit User
        path: 'member/edit',
        component: MemberEditComponent,
        resolve: {user: MemberEditResolver},
        canDeactivate: [PreventUnsavedChanges]
      },
      { path: 'messages', component: MessagesComponent },
      { path: 'lists', component: ListsComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }  // Setting up routing in Angular
];
