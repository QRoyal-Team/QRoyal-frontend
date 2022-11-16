import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/core/models/cartitem';
import { Product } from 'src/app/core/models/product';
import { AlertService } from 'src/app/core/services/alert.service';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css'],
})
export class ProductdetailComponent implements OnInit {
  product!: Product;
  loading: Boolean = false;
  quantity: any = 1;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private alertService: AlertService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    let params: any = this.activatedRoute.snapshot.queryParams;
    this.productService.get(params.id).subscribe((res) => {
      if (!res.hasErrors()) {
        this.loading = false;
        this.product = <Product>(<unknown>res);
      } else {
        this.alertService.error('Something error');
      }
    });
  }

  addToCart(product: Product) {
    this.cartService.add(product,this.quantity);
  }

  count(param: String) {
    if (param === '+') {
      if (this.quantity == 99) {
        return;
      }
      this.quantity++;
    } else {
      if (this.quantity == 1) {
        return;
      }
      this.quantity--;
    }
  }
}
