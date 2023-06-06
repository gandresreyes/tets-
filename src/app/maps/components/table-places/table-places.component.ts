import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlacesService } from '../../services/places.service';
import { MapService } from '../../services';
declare var window: any

@Component({
  selector: 'app-table-places',
  templateUrl: './table-places.component.html',
  styleUrls: ['./table-places.component.css']
})
export class TablePlacesComponent implements OnInit {

  modal: any = null;
  formMarket!: FormGroup;
  Feature: any = []
  isNewPlce:boolean = false;
  placeEdit:any = [];

  open:boolean=true;

  constructor(private fb: FormBuilder, private placesService: PlacesService ,  private mapService:MapService) { }
  ngOnInit(): void {
    this.formMarket = this.initForm();
    this.placesService.getPlaces().subscribe({
      next: (resp) => {
        this.Feature = resp        
      },
      error: () => {
        this.Feature = []
      }
    });
  }

  openModal(isNew:boolean , feature = null) {
    this.modal = new window.bootstrap.Modal('#formModal')
    this.isNewPlce=isNew;
    if (isNew){     
      this.formMarket.reset();      
    }else{
      this.placeEdit = feature
      this.setData(feature);      
    }
   
    this.modal.show();
  }
  setData(feature:any):void{
    this.formMarket.setValue({
      nombre:feature.nombre,
      latitud:feature.latitud,
      longitud:feature.longitud,
      id:feature.id
    })

  }
  openClose(){
    if(this.open){
      this.open=false;
    }else this.open=true;
  }

  async onSubmit() {
    if(!this.formMarket.valid){
      this.formMarket.markAllAsTouched();
      return 
    }
    let coords:[number,number]
    const formValue = this.formMarket.value
    if(this.isNewPlce){
      console.log("nuevo ")
      let data = {...formValue}    
      delete data.id 
       await this.placesService.addPlace(data)    
    }else{
      console.log("edit ")
      await this.placesService.updatePlace(formValue)      
    }
    coords = [this.formMarket.get('longitud')?.value, this.formMarket.get('latitud')?.value]
    this.formMarket.reset();
    this.mapService.flyTo(coords);
  

    this.modal.hide();    
    await this.placesService.updatePlace(formValue)
  }
  initForm() {
    return this.fb.group({
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
      nombre: ['', Validators.required],
      id: ['', ]
    })
  }

  centerMarket(pos:any) {
    const coords:[number,number]= [pos.longitud, pos.latitud]
    this.mapService.flyTo(coords)
  }

  delePlace(){
    this.placesService.deletePlace(this.formMarket.value)
    this.modal.hide();  
  }


}
