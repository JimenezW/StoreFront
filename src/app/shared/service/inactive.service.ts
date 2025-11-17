import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, merge, timer } from 'rxjs';
import { switchMapTo, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class InactivityService {
  private readonly timeoutMs = 15 * 60 * 1000; // 15 minutos

  constructor(private router: Router, private zone: NgZone) {}

  startMonitoring() {
    const activityEvents = merge(
      fromEvent(window, 'mousemove'),
      fromEvent(window, 'keydown'),
      fromEvent(window, 'click')
    );

    this.zone.runOutsideAngular(() => {
      activityEvents
        .pipe(
          switchMapTo(timer(this.timeoutMs)),
          tap(() => {
            this.zone.run(() => {
              localStorage.clear();
              this.router.navigate(['/auth/login']);
              console.warn('Sesión cerrada por inactividad');
            });
          })
        )
        .subscribe();
    });
  }
}
