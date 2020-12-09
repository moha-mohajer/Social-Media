import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RouterModule } from '@angular/router'; // Setting up routing in Angular
import { TimeagoModule } from 'ngx-timeago'; // Useig timeago pipe for dates in Angular
import { ButtonsModule } from 'ngx-bootstrap/buttons'; // Add the buttons component
import { PaginationModule } from 'ngx-bootstrap/pagination'; // Pagination links for multi-page
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload'; // Adding the Set Main Photo functionality to the SPA
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'; // Handling Dates in Forms
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';

import { appRoutes } from './routes';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { ListsResolver } from './_resolvers/lists.resolver';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { RegisterComponent } from './register/register.component';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';




// tslint:disable-next-line: typedef
export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      ListsComponent,
      MessagesComponent,
      MemberListComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      PhotoEditorComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule, // Introduction to Reactive Forms in Angular
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(), // Handling Dates in Forms
      ButtonsModule.forRoot(), // Adding the Sorting functionality to the SPA
      PaginationModule.forRoot(), // Using nix-bootstrap pagination module
      RouterModule.forRoot(appRoutes), // Setting up routing in Angular
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      FileUploadModule,
      TimeagoModule.forRoot(), // Using a timeago pipe for dates in Angular
      JwtModule.forRoot({
         config: {
            tokenGetter,
            allowedDomains: ['localhost:5000'],
            disallowedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      ErrorInterceptorProvider, // Error handler in the API
      //
      MemberDetailResolver,
      MemberListResolver,
      //
      MemberEditResolver,
      PreventUnsavedChanges,

      ListsResolver, // Creating the Lists component
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
