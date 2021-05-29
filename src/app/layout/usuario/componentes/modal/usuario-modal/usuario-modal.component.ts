import { Usuario } from './../../../models/usuario.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-usuario-modal',
  templateUrl: './usuario-modal.component.html',
  styleUrls: ['./usuario-modal.component.scss']
})
export class UsuarioModalComponent implements OnInit {

  @Input()
  usuario: Usuario | undefined;

  @Output()
  onSave: EventEmitter<Usuario> = new EventEmitter<Usuario>();

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  public salvar(): void {
    // Valida se o formulário está valido


    // Chama o service do usuário para salvar
    const newUsuario: any = {};

    // Emite o evento que salvou com sucesso e passa o usuário que retornou do serviço atualizado
    this.onSave.emit(newUsuario);

    // Fecha o modal
    this.activeModal.close();
  }

}
