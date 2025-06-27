import { Component } from '@angular/core';
import { AppComponent } from "../../app.component";
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { TranslationService } from '../../core/servies/translate/translation.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-auth',
  imports: [AppComponent,RouterOutlet,RouterLink,TranslatePipe],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  providers: [TranslationService]
})
export class AuthComponent {
  userToken = null;
  currentLang: string;

  constructor(private translationService: TranslationService) {
    this.currentLang = this.translationService.defaultLang;
    this.translationService.langChange$.subscribe((lang: string) => {
      this.currentLang = lang;
    });
  }

  switchLang(lang: string) {
    this.translationService.changeLang(lang);
  }
}
