import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signupForm: FormGroup;
  hide = true;

  constructor(private router: Router,private formBuilder: FormBuilder, private accountService: AccountService ){
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      firstName: ['', [Validators.required]], 
      lastName: ['', [Validators.required]] 
    });
  }
  
  signupCredentials() {
    if (this.signupForm.invalid) {
      return;
    }
  
    const user: User = {
      userId: 0, 
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      confirmPassword: this.signupForm.value.confirmPassword,
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName
    };
  
    this.accountService.registerUser(user).subscribe(
      (response) => {
        alert('User Registered');
        this.router.navigate(['/login']);
      }
    );
  }
}
