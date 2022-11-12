import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css'],
})
export class PublicComponent implements OnInit {
  user!:User;
  constructor(private authService:AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    new Promise((resolve) => {
      this.loadScript();
    });
  }

  public logout(){
    this.authService.logout();
    location.reload();
  }

  public loadScript() {
    const node = document.createElement('script');
    node.src = 'assets/js/index.js';
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
