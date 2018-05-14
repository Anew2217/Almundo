import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { SearchComponent } from '../Components/search/search.component'

const routes: Routes = [
  {path: '', redirectTo: '/Search', pathMatch: 'full'},
  {path: 'Search', component: SearchComponent}
  
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
