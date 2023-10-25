import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  hide = true;
  loginForm: FormGroup;

  constructor(private toast: NgToastService, private router: Router, private formBuilder: FormBuilder, private accountService: AccountService,private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.router.navigate(['/signup']);
    }
  
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
  
    this.accountService.validateUser(email, password).subscribe(
      (response) => {
        this.authService.login(response);
        this.toast.success({detail: "SUCCESS", duration: 5000})
        this.router.navigate(['/dashboard']);
      }
    );
  }
}
