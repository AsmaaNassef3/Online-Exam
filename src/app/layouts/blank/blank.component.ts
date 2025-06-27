import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../feature/ui/sidebar/sidebar.component";

@Component({
  selector: 'app-blank',
  imports: [AppComponent, RouterOutlet, RouterLink, SidebarComponent],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.scss'
})
export class BlankComponent {

}
