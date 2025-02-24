import { Component, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { LoadingService } from '../../../core/services';

@Component({
  selector: 'app-loading',
  template: `
    @if(loading$ | async){
      <div class="loading-overlay">
        <div class="loading-spinner"></div>
      </div>
    }
  `,
  styleUrls: ['./loading.component.scss'],
  standalone: true,
  imports: [AsyncPipe],
})
export class LoadingComponent {
  private readonly loadingService = inject(LoadingService);

  public readonly loading$ = this.loadingService.loading$;
}
