// import { inject } from '@angular/core';
// import { PlatformService } from '../servies/platForm/platform.service';
// import { CanActivateFn, Router } from '@angular/router';
// export const authGuard: CanActivateFn = (route, state) => {
//   const platformService = inject(PlatformService)
//   const routerService = inject(Router)
//   if(platformService.checkPlatform())
//   {
//     if(localStorage.getItem("token"))
//     {
//       return true
//     }
//   }
//   routerService.navigate(['/login'])
//   return false;

// };
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PlatformService } from '../servies/platForm/platform.service';

export const authGuard: CanActivateFn = () => {
  const platformService = inject(PlatformService);
  const router = inject(Router);

  const isPlatformValid = platformService.checkPlatform();
  const token = localStorage.getItem('token');

  if (isPlatformValid && token) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
