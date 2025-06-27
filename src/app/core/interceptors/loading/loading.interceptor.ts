import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const ngxSpinnerService = inject(NgxSpinnerService);
   const toastrService = inject(ToastrService);
  ngxSpinnerService.show();
  return next(req).pipe(finalize(() => {
    ngxSpinnerService.hide();
toastrService.success('Request completed successfully', 'Success')
  }));
};
