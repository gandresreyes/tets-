import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapScreenComponent } from './screens/map-screen/map-screen.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { LoadingComponent } from './components/loading/loading.component';
import { BtnMylocationComponent } from './components/btn-mylocation/btn-mylocation.component';
import { HumboltLogoComponent } from './components/humbolt-logo/humbolt-logo.component';
import { TablePlacesComponent } from './components/table-places/table-places.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    MapScreenComponent,
    MapViewComponent,
    LoadingComponent,
    BtnMylocationComponent,
    HumboltLogoComponent,
    TablePlacesComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,    
    ReactiveFormsModule

  ],
  exports:[
    MapScreenComponent
  ]
})
export class MapsModule { }
