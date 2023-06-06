import { Component } from '@angular/core';
import { MapService , PlacesService} from '../../services';

@Component({
  selector: 'app-btn-mylocation',
  templateUrl: './btn-mylocation.component.html',
  styleUrls: ['./btn-mylocation.component.css']
})
export class BtnMylocationComponent {

  constructor( private mapService:MapService, private placesService:PlacesService){}
  goToMyLocation(){

    if(!this.placesService.isUserLocationReady) throw new Error('No hay ubicaion del usuario')
    if(!this.mapService.isMapReady) throw new Error('No hay mapa disponible')
    this.mapService.flyTo(this.placesService.userLocation!)

  }
}
