import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideCharts, withDefaultRegisterables} from 'ng2-charts';
import {provideHttpClient} from '@angular/common/http';
import {provideEchartsCore} from 'ngx-echarts';
import * as echarts from 'echarts/core';
import {LineChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';
import {GridComponent, LegendComponent, TitleComponent, TooltipComponent} from 'echarts/components';
import {provideStore} from '@ngrx/store';
import {authReducer} from './store/auth.reducer';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getStorage, provideStorage} from '@angular/fire/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCrhGsL4XR0ViMmbph7swKNi4LSa5p3_hA",
  authDomain: "performance-center-92b36.firebaseapp.com",
  databaseURL: "https://performance-center-92b36-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "performance-center-92b36",
  storageBucket: "performance-center-92b36.firebasestorage.app",
  messagingSenderId: "870652792922",
  appId: "1:870652792922:web:65f9cddc3f00ffa28f8863",
  measurementId: "G-RTV2LJJ2GG"
};

echarts.use([LineChart, CanvasRenderer, GridComponent, TitleComponent, LegendComponent, TooltipComponent]);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(),
    provideEchartsCore({ echarts }),
    provideStore({
      auth: authReducer
    }),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideStorage(() => getStorage()),
]
};
