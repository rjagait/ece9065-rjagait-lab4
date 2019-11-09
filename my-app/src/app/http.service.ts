import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  //get and list the brewries in the area
  getItems(){
    return this.http.get('http://localhost:4200/api');
  }

  //post the brewries in the area
  postItems(itemName, itemType){
    return this.http.post('http://localhost:4200/api/name='+name+'&type='+itemType);
  }
}
