import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  items: Object;

  constructor(private _http: HttpService) { }
 
  ngOnInit() {
    this._http.getItems().subscribe( data => {
      this.items = data;
      console.log(this.items);
    });
  }

}
