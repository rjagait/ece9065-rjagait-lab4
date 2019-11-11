import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'; // Add this
import { ListComponent } from './list/list.component'; // Add this
import { InsertItemComponent } from './insert-item/insert-item.component'; // Add this


const routes: Routes = [
  { path: '', component: HomeComponent },              // Add this
  { path: 'list', component: ListComponent },           // Add this
  { path: 'insert-item', component: InsertItemComponent }           // Add this
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }