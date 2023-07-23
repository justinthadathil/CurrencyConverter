import { Injectable } from '@angular/core';
import { curencyResp } from '../curency-model';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurencyService {

  fixerLatest = `http://data.fixer.io/api/latest?access_key=${environment.apiKey}&format=1`;

  constructor(
    private http: HttpClient
  ) { }

  getLatestRates(): Observable<curencyResp>{
    return this.http.get<curencyResp>(`${this.fixerLatest}`)
  }
}
