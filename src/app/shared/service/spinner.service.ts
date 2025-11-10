import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SpinnerType } from "../components/spinner/SpinnerType";

@Injectable({ providedIn: 'root' })
export class SpinnerBackGroundService {
  private loadingSubject = new BehaviorSubject<{active: boolean, type?: SpinnerType}>({active: false});
  loading$ = this.loadingSubject.asObservable();

  show(type?: SpinnerType) {
    this.loadingSubject.next({active: true, type});
  }

  hide() {
    this.loadingSubject.next({active: false});
  }
}
