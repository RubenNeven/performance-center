import {AfterViewInit, Component, input, OnChanges, output, SimpleChanges} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-gpx';
import {type Training, type Time} from '../models/models';


@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements  OnChanges {

  training = input.required<Training>();
  completedTraining = output<Training>();

  private map!: L.Map;
  gpxLayer?: L.Layer;

  ngOnChanges(): void {
    if (!this.map) this.initMap();
    if (this.map && this.training().gpxFilePath) {
      this.loadGpx(`${this.training().gpxFilePath}`)
    } else if (!this.training().gpxFilePath) {
      this.destroyMap();
      return;
    }
  }

  private destroyMap() {
    if (this.map) {
      this.map.remove();
      this.map = undefined!;
      this.gpxLayer = undefined;
    }
  }

  private initMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map('map', {
      zoom: 10,
      attributionControl: false
    });
    L.tileLayer(baseMapURl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  private loadGpx(gpxFile: string): void {
    if (this.gpxLayer) {
      this.map.removeLayer(this.gpxLayer);
      this.gpxLayer = undefined;
    }

    this.gpxLayer = new (L as any).GPX(gpxFile, {
      async: true,
      polyline_options: {
        color: 'blue',
        weight: 4,
        opacity: 0.9
      },
      marker_options: {
        startIconUrl: '',
        endIconUrl: '',
        shadowUrl: ''
      }
    }).on('loaded', (e: any) => {
      this.map.fitBounds(e.target.getBounds());
      const gpx = e.target;
      const trainingId = this.training().id;
      const completedTraining: Training = {
        id: trainingId,
        sport: 'running',
        status: 'completed',
        planned: {
          title: gpx.get_name(),
          date: gpx.get_start_time(),
          description: 'description',
          stats: [
            {id: 18, trainingId, label: 'Distance', value: gpx.get_distance() / 1000},
            {id: 19, trainingId, label: 'Pace', value: String(this.msPerKmTominPerKm(gpx.get_moving_pace()))},
            {id: 20, trainingId, label: 'Time', value: this.msToHMS(gpx.get_moving_time())}
          ],
        },
        gpxFilePath: this.training().gpxFilePath
      }
      this.completedTraining.emit(completedTraining);
    }).addTo(this.map);
  }

  private msToHMS(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
/*    return {
      hours:  Math.floor(totalSeconds / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60
    };*/
    return `${Math.floor(totalSeconds / 3600)}:${Math.floor((totalSeconds % 3600) / 60)}:${totalSeconds % 60}`
  }

  private msPerKmTominPerKm(msPerKm: number){
    const totalSeconds = Math.floor(msPerKm / 1000);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return {
      minutes,
      seconds
    };
  }
}
