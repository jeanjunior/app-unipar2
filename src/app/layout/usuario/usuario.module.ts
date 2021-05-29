import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioComponent } from './usuario.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioModalComponent } from './componentes/modal/usuario-modal/usuario-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    UsuarioRoutingModule,
    SharedModule
  ],
  declarations: [
    UsuarioComponent,
    UsuarioModalComponent
  ],
  entryComponents: [
    UsuarioModalComponent
  ]
})
export class UsuarioModule { }
