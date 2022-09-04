import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CartsService {
  dataEmitter=new BehaviorSubject(false)
  constructor(private http: HttpClient) {}

  createNewCart(model: any) {
    return this.http.post(environment.baseAPI + 'carts', model);
  }

  raiseDateEmitterEvent(data:boolean){
    this.dataEmitter.next(data)
  }
}
