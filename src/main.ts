import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
Mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FibzIyMTIiLCJhIjoiY2xocHExMHJuMDI4cjNmbzgxaG5iMG0xNSJ9.PND67A1rJlDvhVqXXxQ04w';


if( !navigator.geolocation){
  alert('Navegador no sopoeta la Geolacation');
  throw new Error('Navegador no sopoeta la Geolacation');


}


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
