import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MenuItem } from './menu.model';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    RouterModule
  ]
})
export class MenuComponent implements OnInit, OnChanges, OnDestroy {

  @Input() menuOptions: MenuItem[] = [];

  constructor(
    private router: Router
  ) { }

  ngOnDestroy(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {

  }

  navigate(route?: string): void {
    if (route) this.router.navigate([route]);
  }
}
