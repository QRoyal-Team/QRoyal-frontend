import { base } from './base';

export class User extends base {
  sub!: Number;
  name!: String;
  username!: String;
  role!: String[];
}
