import { ClienteModalComponent } from './componentes/modal/cliente-modal.component';
import { ClienteComponent } from './cliente.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { ClienteRoutingModule } from './cliente-routing.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ClienteRoutingModule,
    SharedModule,
    ToastrModule
  ],
  declarations: [
    ClienteComponent,
    ClienteModalComponent
  ],
  entryComponents: [
    ClienteModalComponent
  ]
})
export class ClienteModule { }
