import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Account } from '../../models/account';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  account!: Account;
  invalidLogin!: boolean;
  loading: boolean = false;
  rememberMe: boolean = false;
  constructor(private authService: AuthService, private alertService: AlertService, private router: Router) {
    this.account = new Account();
  }

  ngOnInit(): void {}

  async login() {
    this.loading = true;
    this.authService.login(this.account).subscribe((res) => {
      if (!res.hasErrors() && !res.hasError()) {
        let token = (<any>res).accessToken;
        if (this.rememberMe) {
          console.log(this.rememberMe);
          this.authService.rememberToken(token);
        } else {
          this.authService.saveToken(token);
        }

        this.invalidLogin = false;
        this.loading = false;
        this.router.navigateByUrl('/home');
        console.log(this.authService.getUser());
      } else {
        this.invalidLogin = true;
        setTimeout(() => {
          this.loading = false;
        }, 200);
      }
    });
  }
}
