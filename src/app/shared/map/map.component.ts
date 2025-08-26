import {AfterViewInit, Component, inject, input, OnChanges, signal, SimpleChanges} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Training} from '../models/models';
import 'leaflet-gpx';
import {FileService} from '../../services/file.service';


@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnChanges, AfterViewInit {

  training = input<Training>();
  private url = signal<string>('')
  private fileService = inject(FileService);

  private map!: L.Map;
  private gpxLayer?: L.Layer;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['training'] && this.map) {
      this.loadGpx();
    }
  }

  private loadGpx() {
    this.getFile();

    setTimeout(() => {
      const gpxFile = this.url();
      console.log(gpxFile)

      if (this.gpxLayer) {
        this.map.removeLayer(this.gpxLayer);
      }


      if (!gpxFile) return;

      this.gpxLayer = new (L as any).GPX(gpxFile, { async: true })
        .on('loaded', (e: any) => {
          this.map.fitBounds(e.target.getBounds());
        });

      if (this.gpxLayer){
        this.gpxLayer.addTo(this.map);
      }
    }, 1000)
  }

  ngAfterViewInit(): void {

    const diepenbeekCoords: L.LatLngExpression = [50.9307, 5.4187];

    this.map = L.map('map').setView(diepenbeekCoords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
    }).addTo(this.map);
  }

  getFile() {
    const trainingValue = this.training();
    if (!trainingValue?.gpxFilePath) return;

    if (trainingValue && trainingValue.gpxFilePath) {
      const path = trainingValue.gpxFilePath;
      this.fileService.downloadFile(path)
        .then(url => {
          this.url.set(url);
          console.log(this.url())
        })
        .catch(err => console.error('Fout bij downloaden GPX'));
    }
  }
}
