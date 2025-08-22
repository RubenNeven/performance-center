import {inject, Injectable, signal} from '@angular/core';
import {Training} from '../shared/models/models';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {


  private http = inject(HttpClient);

  _trainings = signal<Training[]>([]);
  trainings = this._trainings.asReadonly();

  getAllTraining() {
    return this.http.get(environment.realTimeDatabaseUrl + '/trainings.json').pipe(
      tap((response) => {
        console.log(response)
        const entries = Object.entries(response);
        const training = entries.map(([key, training]) => ({
          ...training,
          firebaseKey: key
        }));
       this._trainings.set(training)
      })
    )
  }
}
