import { Component } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';

@Component({
  selector: 'app-patient-final-report',
  imports: [NavBarComponent,SidebarComponent],
  templateUrl: './patient-final-report.component.html',
  styleUrls: ['./patient-final-report.component.css']
})
export class PatientFinalReportComponent {

}
