import { Component } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';

@Component({
  selector: 'app-user-medications',
  imports: [NavBarComponent, SidebarComponent],
  templateUrl: './user-medications.component.html',
  styleUrls: ['./user-medications.component.css']
})
export class UserMedicationsComponent {

}
