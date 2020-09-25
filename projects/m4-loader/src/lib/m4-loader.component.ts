import { Component, OnInit } from '@angular/core';
import {M4LoaderService} from "./m4-loader.service";

@Component({
  selector: 'lib-m4-loader',
  template: `
    <div class="progress-loader" [hidden]="!loading">
      <div class="loading-spinner">
        <img src="./assets/loader.gif" style="width: inherit;">
        <!-- <span class="loading-message">Please wait...</span> -->
      </div>
    </div>
  `,
  styles: [
  ]
})
export class M4LoaderComponent implements OnInit {

  loading: boolean = true;

  constructor(private loaderService: M4LoaderService) {

    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    });

  }
  ngOnInit() {
  }
}
