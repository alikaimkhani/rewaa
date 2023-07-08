import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }


  postProductData(data: any) {
    return this.http.post('https://dummy.restapiexample.com/api/v1/create', data);
  }
}
