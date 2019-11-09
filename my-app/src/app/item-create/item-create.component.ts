import { Component} from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-list-create',
    templateUrl: './item-create.cmponent.html'
})
export class ItemCreateComponent{
    itemName:Object;
    itemType:Object;

    constructor(private _http: HttpService) { }

    onAddItem(name: string, type: string){
        this._http.postItems().subscribe( data=> {
            this.itemName = name;  
            this.itemType=type; 
            console.log(name);
        })
    }
}