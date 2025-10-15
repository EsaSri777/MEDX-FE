import { Component } from '@angular/core';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';

@Component({
  selector: 'app-user-staff',
  imports: [NavBarComponent, SidebarComponent],
  templateUrl: './user-staff.component.html',
  styleUrls: ['./user-staff.component.css']
})
export class UserStaffComponent {

}
