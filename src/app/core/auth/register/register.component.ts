import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  loading: Boolean = false;
  failure: Boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async register(form: any) {
    this.loading = true;
    let account = {
      name: form.firstName + ' ' + form.lastName,
      username: form.email,
      password: form.password,
    };
    this.authService.register(account).subscribe((res) => {
      if (!res.hasErrors()) {
        this.loading = false;
        this.router.navigate(['/otp', { username: account.username }]);
      } else {
        console.log(account)
        this.loading = false;
        this.failure = true;
      }
    });
  }

  setFailure() {
    this.failure = false;
  }
}
