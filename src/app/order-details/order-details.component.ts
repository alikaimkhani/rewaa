import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/productService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Toaster } from '../services/toaster';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})

export class OrderDetailsComponent {
  products: any[] = [];
  
  selectedProduct: any;
  supplierName: string = '';
  location: string = '';
  supplierInvoice: string = '';
  notes: string = '';
  orderSubmitted: boolean = false;




  showDetails: boolean = false;


  cart: any[] = [];
  selectedPaymentMethod: string = '';
selectedCardOption: string = '';

  searchResults: any[] = [];

  search(event: any) {
    
    const query = (event?.target?.value || '').trim();
    if (query !== '') {
      this.searchResults = Object.values(this.products).filter((product: any) =>
      
        product.title.toLowerCase().includes(query.toLowerCase()) 
      );
    } else {
      this.searchResults = [];
    }
  }
  
  
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.products = data.products;
        console.log(this.products);
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  
  


  addToCart(product: any) {

    console.log("in the add product", product)
    const found = this.cart.find(item => item.id === product.id);
    if (!found) {
      
      this.cart.push({ ...product, quantity: 1 });
      console.log("in the if statement ", this.cart)
      console.log(this.cart)
    }
    this.search(null);
  }

  removeFromCart(product: any) {
    const index = this.cart.findIndex(item => item.id === product.id);
    if (index !== -1) {
      const item = this.cart[index];
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        this.cart.splice(index, 1);
      }
    }
  }

  updateQuantity(event: any, product: any) {
    const quantity = parseInt(event.target.value, 10);
    const found = this.cart.find(item => item.id === product.id);
    if (found) {
      found.quantity = quantity;
    }
  }

  getTotalPrice() {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  updateCartItem(item: any) {
    // No action needed as the quantity is updated automatically with two-way data binding
  }


  toggleProductDetails(item: any) {
    this.showDetails = !this.showDetails;
    if (this.showDetails) {
      this.selectedProduct = item;
    } else {
      this.selectedProduct = null;
    }
  }
  
  submitOrder() {
    const data = {
      orderDetails: {
        supplierName: this.supplierName,
        location: this.location,
        supplierInvoice: this.supplierInvoice,
        notes: this.notes
      },
      cart: this.cart,
      paymentMethod: this.selectedPaymentMethod,
      cardOption: this.selectedCardOption
    };
  
    this.productService.postProductData(data).subscribe(
      response => {
        // Handle success response
        this.orderSubmitted = true;
      },
      error => {
        console.log('Error:', error);
        // Handle error response
      }
    );
  }
  
  showToaster(): void {
    // Add your logic to show the toaster message here
  }

  
}
