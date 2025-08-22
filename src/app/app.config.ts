import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideEchartsCore} from 'ngx-echarts';
import * as echarts from 'echarts/core';
import {LineChart} from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { GridComponent } from 'echarts/components';
import { TitleComponent } from 'echarts/components';
import { LegendComponent } from 'echarts/components';
import { TooltipComponent } from 'echarts/components';
import { provideStore } from '@ngrx/store';
import {authReducer} from './store/auth.reducer';

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
    })
]
};
