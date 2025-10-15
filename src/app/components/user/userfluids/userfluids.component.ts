import { Component } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';

@Component({
  selector: 'app-userfluids',
  imports: [NavBarComponent, SidebarComponent],
  templateUrl: './userfluids.component.html',
  styleUrls: ['./userfluids.component.css']
})
export class UserfluidsComponent {

}
