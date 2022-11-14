import { Component, OnInit } from '@angular/core';
import { AlertService } from '../core/services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private alertService: AlertService) {}

  ngOnInit(): void {}

  alert() {
    this.alertService.success('Hello');
  }
}
