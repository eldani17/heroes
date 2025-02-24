import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class LocalHttpInterceptor {
  readonly loadinService = inject(LoadingService);
  intercept(request: Observable<any>): Observable<any> {
    this.loadinService.show();
    return request.pipe(
      finalize(
        () => this.loadinService.hide()
      )
    );
  }
}
