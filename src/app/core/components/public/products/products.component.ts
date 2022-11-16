import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/core/models/pagination';
import { Product } from 'src/app/core/models/product';
import { AlertService } from 'src/app/core/services/alert.service';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products!: Product[];
  pageable!: Pagination;
  loading: Boolean = false;
  error: Boolean = false;

  constructor(
    private productService: ProductService,
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cartService:CartService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    let params: any = this.activatedRoute.snapshot.queryParams;
    let pagination;
    if (params.page != null) {
      pagination = {
        size: 10,
        page: params.page - 1,
        sort: params.sort,
        desc: params.desc,
      };
    } else {
      pagination = {
        size: 10,
        page: 0,
        sort: 'id',
        desc: true,
      };
    }

    this.productService.gets(pagination).subscribe((res) => {
      if (!res.hasErrors()) {
        this.loading = false;
        this.pageable = <Pagination>(<unknown>res);
        this.products = this.pageable.content;
        if (this.products == null) {
          this.alertService.error('Something error');
          this.loading = true;
        }
      } else {
        this.error = true;

        this.alertService.error('Something error');
      }
    });
  }

  setPage(page: any) {
    let pagination = {
      size: 10,
      page: page,
      sort: 'id',
      desc: true,
    };
    this.router.navigateByUrl('/products?page=' + (pagination.page + 1) + '&sort=' + pagination.sort + '&desc=' + pagination.desc);
    this.productService.gets(pagination).subscribe((res) => {
      if (!res.hasErrors()) {
        this.loading = false;
        this.pageable = <Pagination>(<unknown>res);
        this.products = this.pageable.content;
        window.scroll(0, 0);
        if (this.products == null) {
          this.alertService.error('Something error');
          this.loading = true;
        }
      } else {
        this.error = true;

        this.alertService.error('Something error');
      }
    });
  }
  addToCart(product: Product) {
    this.cartService.add(product,1);
  }
}
