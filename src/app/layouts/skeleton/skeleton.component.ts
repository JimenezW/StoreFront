import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, effect, inject,
  OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {BreakpointObserver, Breakpoints, LayoutModule} from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';

import { NavigationComponent } from '../navigation/navigation.component';
import { HeaderComponent } from '../header/header.component';
import { InactivityService } from '../../shared/service/inactive.service';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    LayoutModule,
    NavigationComponent,
    HeaderComponent
  ]
})
export class SkeletonComponent implements OnInit, OnDestroy, AfterViewInit {
 destroyed = new Subject<void>();
 currentScreenSize: string ='Unknown';
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium']//,
    //[Breakpoints.Large, 'Large'],
    //[Breakpoints.XLarge, 'XLarge'],
  ]);
  mobile = signal(false);
  mode: 'over' | 'side' = 'side';
  opened = signal(true);

  constructor(private changeDetectorRef: ChangeDetectorRef,
    private inactiveService : InactivityService
  )
  {

    inject(BreakpointObserver)
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {

        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';

            this.mobile.set(this.currentScreenSize === 'XSmall' || this.currentScreenSize === 'Small');

          }
        }
      });

      effect(() => {
        // Se ejecuta cada vez que mobile cambia
        const isMobile = this.mobile();
        if (isMobile) {
          console.log('🔹 Modo móvil activo → cerrando sidenav');
          this.opened.set(false);
          this.mode = 'over';
        } else {
          console.log('🔹 Modo escritorio → abriendo sidenav');
          this.opened.set(true);
          this.mode = 'side';
        }
      });


  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  ngOnInit() {
    this.inactiveService.startMonitoring();
  }

  toggle() {
    this.opened.update(value => !value);
  }

}
