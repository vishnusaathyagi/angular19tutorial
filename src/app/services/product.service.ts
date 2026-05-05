import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() {
    console.log('ProductService instance created');
  }

  getProductData(){
    return [
      {name:'I phone 14 Pro', price: 120000, category: 'mobile'},
      {name:'I phone 14 Pro Max', price: 130000, category: 'mobile'},
      {name:'I phone 14', price: 90000, category: 'mobile'},
      {name:'I phone 14 Plus', price: 100000, category: 'mobile'}
    ]
  }


}
