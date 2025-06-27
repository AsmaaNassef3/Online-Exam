import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthDataLayerService } from '../../../core/authencition/data/auth-data-layer.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
private readonly authDataLayerService = inject(AuthDataLayerService)
private readonly router = inject(Router);
logOut(): void {
this.authDataLayerService.logout().subscribe({
  next: (res) => {
    console.log('Logout successful:', res);
this.router.navigate(['/login']);
localStorage.removeItem('token');
  },
  error: (err) => {
    console.error('Logout failed:', err);
  }
});
}
}
