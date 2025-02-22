import { Observable } from "rxjs";

export interface IApiServiceByName<T> {
  getByName(url: string, name: string): Observable<T[]>;
}
