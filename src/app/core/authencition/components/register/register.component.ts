import { Component, inject } from '@angular/core';
import { AuthUseCaseService } from '../../domain/auth-use-case.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthBtnComponent } from '../../../../shared/components/ui/auth-btn/auth-btn.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../../servies/translate/translation.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, AuthBtnComponent,RouterLink, TranslateModule, TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
private readonly authUseCaseService = inject(AuthUseCaseService)
private readonly formBuilder = inject(FormBuilder)
private readonly router = inject(Router)
readonly translate = inject(TranslationService)



registerForm:FormGroup = this.formBuilder.group({
  username:[null,[Validators.required,Validators.pattern(/^[a-zA-Z][a-zA-Z0-9_]{5,20}$/)]],
    firstName:[null,[Validators.required,Validators.pattern(/^[A-Z][a-z]{2,19}$/)]],
    lastName:[null,[Validators.required,Validators.pattern(/^[A-Z][a-z]{2,19}$/) ]],
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{8,}$/)]],
    rePassword:[null,[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{8,}$/)]],
    phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],

  },{validator:[this.confirmPassword]})



confirmPassword(group:AbstractControl){
const password = group.get('password')?.value;
const rePassword = group.get('rePassword')?.value;
return password === rePassword ? null : {misMatch:true}
}

registerSubmit():void{

  if(this.registerForm.valid){
 this.authUseCaseService.excuteRegister(this.registerForm.value).subscribe({
    next:(res)=>{
      console.log('formRegister',res)
       if(res.message =='success'){
 setTimeout(() => {
   this.router.navigate(['/login'])
 },500)
       }
    },
    error:(err)=>{
      console.log(err)
    }
  })
}else{
  this.registerForm.markAllAsTouched();
}
  }

}
