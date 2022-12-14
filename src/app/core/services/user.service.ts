import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BaseService } from './base-service.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<User> {
  constructor(http:HttpClient) {
    super('user',http);
  }
}
