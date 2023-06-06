import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import {Map, Popup, Marker, LngLatBounds} from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent  implements AfterViewInit  {

  @ViewChild('mapDiv') mapDivElement!:ElementRef;
  private markers:Marker[] = []  
  constructor(private placesService:PlacesService , private mapSrvice:MapService){}

    ngAfterViewInit(): void {
      if(!this.placesService.userLocation) throw Error('No hay placesServices.userLocation')

      const map = new Map({
        container: this.mapDivElement.nativeElement, // container ID       
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: this.placesService.userLocation, // starting position [lng, lat]
        zoom: 6, // starting zoom
        
        });
      
      const popup = new Popup() 
        .setHTML(`
          <h6>Aqui estoy </h6>
          <span>Estoy en este lugar del mundo</span>
        `);
      new Marker({color:'red'})
        .setLngLat(this.placesService.userLocation)
        .setPopup(popup)
        .addTo(map)

      this.placesService.getPlaces().subscribe({
        next:(resp)=>{      
          if(resp.length === 0) return;
         this.markers.forEach((marker:any) => marker.remove())    
         const newMarkers:any = []; 
          resp.forEach((marker:any) => {
            const popup = new Popup()
            .setHTML(`
            <h6>${marker.nombre} </h6>
            <b>latitud:</b>${marker.latitud}<br>
            <b>longitud:</b>${marker.longitud}<br>
            <span>Estoy en este lugar del mundo</span>
            <button class="btn btn-danger mt-2>Eliminar</button>`);
            const newMarker = new Marker()
              .setLngLat([ marker.longitud, marker.latitud])
              .setPopup(popup)
              .addTo(map);
            newMarkers.push(newMarker);
          });
          this.markers = newMarkers;
            
        }

      })  
      this.mapSrvice.setMap( map );
     
  }  

  deletePlace(place:any){
   console.log(place)
  }

}
  
