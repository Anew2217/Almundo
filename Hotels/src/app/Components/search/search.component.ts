import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../Sevices/hotel.service';
import { Hotel } from '../../Models/hotel';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private hotelService: HotelService) { }

  private search: String = '/assets/icons/filters/search.svg';
  private star: String = '/assets/icons/filters/star.svg';

  private up1 = true;
  private up2 = true;
  private arrow1 = "";
  private arrow2 = "";
  private glyUp = "glyphicon-triangle-top";
  private glyDown = "glyphicon-triangle-bottom";
  private hotels: Hotel[];
  private filter: Hotel[];
  private filter1: Hotel[];
  filtro: string;
  private filtroStar: boolean[];
  private ckbDisabled: boolean;

  public stars = new Array<String>();

  ngOnInit() {
    this.ckbDisabled = true;
    this.filtroStar = [true, false, false, false, false, false]
    this.filtro = '';

    if (this.up1) { this.arrow1 = this.glyDown }
    if (this.up2) { this.arrow2 = this.glyDown }

    this.hotelService.getHotels().then(r => {
      if (r !== null) {
        this.hotels = r;
        this.filter = this.hotels;
        this.hotels.forEach(function (e, i) {

          var a = '<span class="glyphicon glyphicon-star"></span>';
          if (e.stars > 0) {
            e.html = a;
            for (var j = 1; j < e.stars; j++) {
              e.html += a;
            }
          }
        });
      }
    });
  }

  gly1() {
    this.up1 = !this.up1;
    if (this.up1) {
      this.arrow1 = this.glyDown;
    } else {
      this.arrow1 = this.glyUp;
    }
  }

  gly2() {
    this.up2 = !this.up2;
    if (this.up2) {
      this.arrow2 = this.glyDown;
    } else {
      this.arrow2 = this.glyUp;
    }
  }

  filtrar(t: boolean) {

    if ((t && !this.ckbDisabled) || this.todosVacios()) {
      this.filtroStar = [true, false, false, false, false, false];
      this.filter1 = this.hotels;
      this.ckbDisabled = true;
    }
    else {
      this.filtroStar[0] = false;
      this.ckbDisabled = false;

      this.filter1 = new Array<Hotel>();

      if (this.filtroStar[1]) { this.filStar(5); }
      if (this.filtroStar[2]) { this.filStar(4); }
      if (this.filtroStar[3]) { this.filStar(3); }
      if (this.filtroStar[4]) { this.filStar(2); }
      if (this.filtroStar[5]) { this.filStar(1); }

    }

    this.filtrarNombre();
  }

  filtrarNombre() {
    this.filter = new Array<Hotel>();

    if (this.filter1.length > 0) {
      for (var i = 0; i < this.filter1.length; i++) {
        if (this.filter1[i].name.toLowerCase().toString().includes(this.filtro.toLowerCase().toString())) {
          this.filter.push(this.filter1[i]);
        }
      }
    }
  }

  todosVacios() {
    var res = true;
    for (var i = 0; i < this.filtroStar.length; i++) {
      if (this.filtroStar[i]) {
        res = false;
      }
    }
    return res;
  }

  filStar(a: Number) {    
    for (var i = 0; i < this.hotels.length; i++) {
      if (this.hotels[i].stars === a) {
        this.filter1.push(this.hotels[i]);
      }
    }
  }
}