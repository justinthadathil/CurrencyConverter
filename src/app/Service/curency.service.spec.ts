import { TestBed } from '@angular/core/testing';

import { CurencyService } from './curency.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { curencyModel } from '../curency.model';
import { environment } from 'src/environments/environment.development';

describe('CurencyService', () => {
  let service: CurencyService;
  let testingControler: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CurencyService);
    testingControler = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Get latest data from Fixer API', () => {
    service.getLatestRates().subscribe((data: curencyModel) => {
      expect(data).toBeTruthy();
    });
    const mockAPI = testingControler.expectOne(`http://data.fixer.io/api/latest?access_key=${environment.apiKey}&format=1`)
    expect(mockAPI.request.method).toBe('GET');
    testingControler.verify();
  });

});
