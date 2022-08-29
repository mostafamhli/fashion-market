import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { productData } from '../product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) {}

  getAllProducts():Observable<productData[]>{
    return this.http.get<productData[]>(environment.baseAPI + 'products')
  }

  getAllCategories():Observable<string[]> {
    return this.http.get<string[]>(environment.baseAPI + 'products/categories')
  }

  getProductsByCategory(category:string):Observable<productData[]>{
    return this.http.get<productData[]>(environment.baseAPI + 'products/category/'+ category)
  }

  getProductByID(id:any):Observable<productData> {
    return this.http.get<productData>(environment.baseAPI + 'products/'+id) 
  }
}
