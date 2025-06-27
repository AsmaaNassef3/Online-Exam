import { Component, inject } from '@angular/core';
import { AuthUseCaseService } from '../../domain/auth-use-case.service';
import { AuthBtnComponent } from "../../../../shared/components/ui/auth-btn/auth-btn.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../../servies/translate/translation.service';

@Component({
  selector: 'app-login',
  imports: [AuthBtnComponent,ReactiveFormsModule,RouterLink, CommonModule, TranslatePipe, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
private readonly authUseCaseService = inject(AuthUseCaseService)
private readonly formBuilder = inject(FormBuilder)
private readonly router = inject(Router)
readonly translate = inject(TranslationService)

loginForm:FormGroup = this.formBuilder.group({
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{8,}$/)]],
  })


loginSubmit():void{
  if(this.loginForm.valid){
  this.authUseCaseService.excuteLogin(this.loginForm.value).subscribe({
    next:(res)=>{
      console.log('formLogin',res)
      if(res.message=='success'){
        localStorage.setItem('token',res.token)
        setTimeout(() => {
            this.router.navigate(['/subjects'])
        }, 500);
      }
    },
    error:(err)=>{
      console.log(err)
    }
  })
}else{
  this.loginForm.markAllAsTouched();
}}
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/subjects']);
    }
  }}
