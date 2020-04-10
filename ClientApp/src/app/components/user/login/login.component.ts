import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invaidUserOrPassword: boolean = false;
  invalidForm: boolean = false;

  public get controls() {
    return this.loginForm.controls;
  }

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location
    ) { }

  ngOnInit(): void {
    if (this.authService.getCurrentUser()) {
      this.router.navigateByUrl('/user/profile');
    } else {
      this.loginForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]]
      });
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let user: User = {
        name: this.controls['username'].value,
        password: this.controls['password'].value
      };

      this.authService.loginUser(user).subscribe(user => {
        if (user) {
          this.authService.setUser(user);
          window.location.reload();
        } else {
          this.invaidUserOrPassword = true;
          setTimeout(() => {
            this.invaidUserOrPassword = false;
          }, 4000);
        }
      });
    } else {
      this.invalidForm = true;
    }
  }

}
