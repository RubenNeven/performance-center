import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, tap, throwError} from 'rxjs';
import {HealthData} from '../shared/models/models';

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  baseUrl = 'https://performance-center-92b36-default-rtdb.europe-west1.firebasedatabase.app/';
  private http = inject(HttpClient);
  _healthData = signal<HealthData[]>([]);
  healthData$ = this._healthData.asReadonly();

  getHealthData() {
    return this.http.get<HealthData[]>(this.baseUrl + "healthData.json")
      .pipe(
        tap({
          next: (healthData) => {
            let data = Object.entries(healthData).map( ([key, healthData]) => (
              {
                ...healthData
              }
            )).sort( (a,b) => a.date < b.date ? -1 : 1);
            this._healthData.set(data);
          },
          error: (error) => {
            console.log(error)
            catchError(() => {
              return throwError(() => new Error("Error getting health data"))
            })
          }
        })
      )
  }

  saveData(healthData: HealthData){
    const prevData = this._healthData();
    const newData = [...prevData, healthData].sort( (a, b) => a.date < b.date ? -1 : 1);
    this._healthData.set(newData);

    return this.http.post<HealthData[]>(this.baseUrl + "healthData.json", healthData)
      .pipe(
        tap({
          error: (err) => {
            catchError(() => {
              this._healthData.set(prevData);
              return throwError(() => new Error('Error saving data!'))
            })
          }
        })
      );
  }
}
