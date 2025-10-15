import { Component } from '@angular/core';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';

@Component({
  selector: 'app-ot-notes',
  imports: [NavBarComponent,SidebarComponent],
  templateUrl: './ot-notes.component.html',
  styleUrls: ['./ot-notes.component.css']
})
export class OtNotesComponent {

}
