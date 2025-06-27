import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    component: AuthComponent,
    children: [
       {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
      {
        path: 'login',
        loadComponent: () =>
          import('./core/authencition/components/login/login.component')
            .then(m => m.LoginComponent),
        data: { title: 'Login' }
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./core/authencition/components/register/register.component')
            .then(m => m.RegisterComponent),
        data: { title: 'Register' }
      },
      {
        path: 'forgetpas',
        loadComponent: () =>
          import('./core/authencition/components/forgetpas/forgetpas.component')
            .then(m => m.ForgetpasComponent),
        data: { title: 'Forget Password' }
      }
    ]
  },{
    path: '',
    component: BlankComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'subjects',
        loadComponent: () =>
          import('./pages/subjects/subjects.component')
            .then(m => m.SubjectsComponent),canActivate: [authGuard],
        data: { title: 'subjects' }
      },
        {
        path: 'exams/:id',
        loadComponent: () =>
          import('./pages/exams/exams.component')
            .then(m => m.ExamsComponent),canActivate: [authGuard],
        data: { title: 'exams' }
      },
      {
        path: 'notfound',
        loadComponent: () =>
          import('./pages/notfound/notfound.component')
            .then(m => m.NotfoundComponent),
        data: { title: 'notfound' }
      }]}
];

