import { Observable } from "rxjs";

export interface IApiService<T> {
  getAll(url: string): Observable<T[]>;
  getById(url: string): Observable<T>;
  getByName(url: string, name: string): Observable<T[]>;
  post(url: string, body: T): Observable<T>;
  put(url: string, body: T): Observable<T>;
  delete(url: string): Observable<T[]>;
}
