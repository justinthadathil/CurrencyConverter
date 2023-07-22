import { Injectable } from '@angular/core';
import { curencyResp } from '../curency-model';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurencyService {

  fixerURL = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getRates(): Observable<curencyResp>{
    return this.http.get<curencyResp>(`${this.fixerURL}`)
  }
}
