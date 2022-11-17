import { OrderDetail } from "./orderdetail";
import { Payment } from "./payment";

export class Order {
  name: String="";
  phone: String="";
  address: String="";
  description: String="";
  order_details!:OrderDetail[];
  payment!:Payment;
}