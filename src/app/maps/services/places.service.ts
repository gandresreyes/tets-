import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc , deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  public userLocation:[number, number] | undefined;
  public placeEditMarket = []



  get isUserLocationReady():boolean{
    return !!this.userLocation;
  } 
  constructor(private firestore:Firestore ,private http:HttpClient) {
    this.getUserLocation();
  }  

  public async getUserLocation():Promise<[number,number]>{
    return new Promise((resolve , reject)=>{
      navigator.geolocation.getCurrentPosition(
        ({coords})=>{
          this.userLocation = [coords.longitude , coords.latitude];
          resolve(this.userLocation);
        },
        (err)=>{
          alert("No se pudo obtener la geolocalizacion ")
          console.log(err)
          reject
        }       
      );
    })
  }  

  addPlace(place:any){
    const placeRef = collection(this.firestore , 'places');
    return addDoc(placeRef , place )
     
  }  

  getPlaces():Observable<any>{
    const placeRef = collection(this.firestore , 'places');
    return collectionData(placeRef, {idField: 'id'}) as Observable<any>
  }

  updatePlace(place:any){
    const placeRef = doc(this.firestore , `places/${place.id}`);    
    return updateDoc(placeRef, {...place})
  }
  
  deletePlace(place:any){
    const placeRef = doc(this.firestore , `places/${place.id}`);  
    return deleteDoc(placeRef)

  }
}
