import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AuthRepo } from './core/authencition/domain/auth.repo';
import { AuthDataLayerService } from './core/authencition/data/auth-data-layer.service';
import { headersInterceptor } from './core/interceptors/headers.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';
import { provideStore } from '@ngrx/store';
import { examReducer } from './shared/store/exams/exam.reducer';
import { loadQuestionReducer } from './shared/store/questions/question.reducer';
import { provideEffects } from '@ngrx/effects';
import { QuestionsEffects } from './shared/store/questions/question.effect';
import { NgChartsModule } from 'ng2-charts';
import { errorsInterceptor } from './core/interceptors/errors/errors.interceptor';
import { ToastrModule } from 'ngx-toastr';

 import { HttpClient} from '@angular/common/http';
 import { TranslateHttpLoader } from '@ngx-translate/http-loader';
 import { TranslateLoader, TranslateModule } from '@ngx-translate/core';


 export function HttpLoaderFactory(http: HttpClient) {
   return new TranslateHttpLoader(http, './i18n/', '.json');
 }


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withFetch(),
      withInterceptors([headersInterceptor, loadingInterceptor, errorsInterceptor])
    ),
    importProvidersFrom(NgxSpinnerModule),
    importProvidersFrom(NgChartsModule),
    importProvidersFrom(ToastrModule.forRoot()),
    importProvidersFrom(
       TranslateModule.forRoot({
         loader: {
           provide: TranslateLoader,
           useFactory: HttpLoaderFactory,
           deps: [HttpClient]
         }
       })
     ) ,
    provideAnimations(),
    provideStore({
      exam: examReducer,
      question: loadQuestionReducer,
    }),
    provideEffects([QuestionsEffects]),
    provideRouter(routes),
    {
      provide: AuthRepo,
      useClass: AuthDataLayerService,
    },
    provideClientHydration(withEventReplay()),
    provideEffects(),
  ],
};
