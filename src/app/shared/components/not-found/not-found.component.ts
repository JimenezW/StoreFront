import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import urlConstRouting from '../../constants/url-const.routing';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  constructor( private readonly router : Router) { }

  ngOnInit() {
  }

  clickRegresar(){
    const url =urlConstRouting.dashboard.base;
    this.router.navigate([url]);
  }

}
