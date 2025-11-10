import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SpinnerType } from './SpinnerType';
import { BehaviorSubject } from 'rxjs';
import { SpinnerBackGroundService } from '../../service/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  imports:[
    CommonModule
  ]
})
export class SpinnerComponent implements OnInit {
  isLoading$ = new BehaviorSubject<boolean>(false);
  spinnerType: SpinnerType = 'spinner';

  @ViewChild('blobTpl', { static: true }) blobTpl!: TemplateRef<any>;
  @ViewChild('flippingTpl', { static: true }) flippingTpl!: TemplateRef<any>;
  @ViewChild('pulseTpl', { static: true }) pulseTpl!: TemplateRef<any>;
  @ViewChild('spinnerTpl', { static: true }) spinnerTpl!: TemplateRef<any>;

  constructor(private spinnerService: SpinnerBackGroundService) {}

  ngOnInit() {
    this.spinnerService.loading$.subscribe(state => {
      this.isLoading$.next(state.active);
      if (state.type) this.spinnerType = state.type;
    });
  }

  get activeTemplate(): TemplateRef<any> {
    switch (this.spinnerType) {
      case 'blob': return this.blobTpl;
      case 'flipping': return this.flippingTpl;
      case 'pulse': return this.pulseTpl;
      default: return this.spinnerTpl;
    }
  }
}

