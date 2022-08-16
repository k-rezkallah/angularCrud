import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../store/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  dataSource!: Product[];

  private _refreshRequired = new Subject<void>();

  get RefreshRequired() {
    return this._refreshRequired;
  }

  constructor(private http: HttpClient) {}

  addProduct(data: Product): Observable<Product> {
    return this.http.post<Product>(environment.apiUrl, data).pipe(
      tap(() => {
        this.RefreshRequired.next();
      })
    );
  }

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/productList');
  }

  putProduct(data: Product, id: number) {
    return this.http.put<Product>(environment.apiUrl + id, data).pipe(
      tap(() => {
        this.RefreshRequired.next();
      })
    );
  }
  deleteProduct(id: number) {
    return this.http.delete<Product>(environment.apiUrl + id).pipe(
      tap(() => {
        this.RefreshRequired.next();
      })
    );
  }
}
