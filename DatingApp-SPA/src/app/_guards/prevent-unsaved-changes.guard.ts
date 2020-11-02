import {Injectable} from '@angular/core';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { CanDeactivate } from '@angular/router';

// Prevent the user to lose unsaved chengeds
@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {
    canDeactivate(component: MemberEditComponent) {
        if (component.editForm.dirty) {
            return confirm('Are you sure you want to continue?  Any unsaved changes will be lost');
        }
        return true;
    }
} 