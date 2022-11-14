import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnInit {
  loading!: Boolean;
  loadingResend!: Boolean;
  username!: String;
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router,private alertService:AlertService) {
    this.username = this.route.snapshot.paramMap.get('username') as string;
  }

  ngOnInit(): void {}

  async verify(form: any) {
    this.loading = true;
    let account = {
      username: this.username,
      otpCode: form.first + form.second + form.third + form.fourth,
    };
    this.authService.verify(account).subscribe((res) => {
      if (!res.hasErrors()) {
        this.loading = false;
        this.router.navigateByUrl('/login');
        this.alertService.success('Verify successfull');
      } else {
        console.log(account);
        this.loading = false;
      }
    });
  }

  async resend() {
    this.loadingResend = true;
    let account = {
      username: this.username,
    };
    this.authService.resend(account).subscribe((res) => {
      if (!res.hasErrors()) {
        this.loadingResend = false;
        this.alertService.success('Resended');
      } else {
        this.loadingResend = false;
        this.alertService.error('Error please try again!');
      }
    });
  }
}
