import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'

import { Hotel } from '../Models/hotel'

import 'rxjs/add/operator/toPromise'

@Injectable()
export class HotelService {

  constructor(private http: Http) { }

  private url = "http://localhost:3000/";

  getHotels(): Promise<Hotel[]> {
    return this.http.get( this.url+'api/hotels').toPromise()
    .then(r=>{
      return r.json() as Hotel[];
    });
  }

}
