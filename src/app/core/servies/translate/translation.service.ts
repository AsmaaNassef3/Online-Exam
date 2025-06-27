import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  defaultLang = 'en';
  langChange$ = new BehaviorSubject<string>(this.defaultLang);

  constructor(
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lng');
      if (savedLang) {
        this.defaultLang = savedLang;
      }
      this.setLanguage(this.defaultLang);
    }
  }

  changeLang(lang: string) {
    this.setLanguage(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lng', lang);
    }
  }

  private setLanguage(lang: string) {
    this.translateService.use(lang);
    this.langChange$.next(lang);
    this.setDirection(lang);
  }

  private setDirection(lang: string) {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    if (isPlatformBrowser(this.platformId)) {
      this.document.documentElement.dir = dir;
      this.document.body.dir = dir;
    }
  }
}
