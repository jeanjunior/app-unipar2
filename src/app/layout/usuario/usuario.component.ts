import { UsuarioModalComponent } from './componentes/modal/usuario-modal/usuario-modal.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from './models/usuario.model';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  usuarios?: Usuario[];

  // Para todos os service que o componente for usar precisa ser injetado recebendo pelo construtor
  constructor(
    private toastr: ToastrService,
    private usuarioService: UsuarioService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    // Quando iniciar a tela carrega os usuários através da api
    this.carregaUsuariosFromApi();

  }

  private carregaUsuariosFromApi(): void {
    // Chama o service de usuarios para buscar todos
    //    .buscarTodos() retorna um Observable<Usuario[]>
    //    como a chamada é assincrona para capturar o resultado é preciso "se inscrever" para receber o retorno

    this.usuarioService.buscarTodos()
      .subscribe(result => {
        // pega o retorno recebido pela api e joga na nossa lista de usuários
        this.usuarios = result;

      }, error => {
        // Deu erro na requisição
        this.toastr.error(error.message, 'Ops.');
      });
  }

  public abrirModal(usuario: Usuario | undefined): void {
    // Instancia o modal
    const modalRef = this.modalService.open(UsuarioModalComponent, { size: 'lg', });

    // Passa o parâmetro do usuário para dentro
    modalRef.componentInstance.usuario = usuario;

    // Pega a resposta emitidas
    modalRef.componentInstance.onSave.subscribe((result: Usuario) => {
      this.toastr.success('Usuário salvo com sucesso!');

      if (!usuario?.id) {
        // Se não tiver id no usuário de entrada então é uma insert
        this.usuarios?.push(result);
      } else {
        // Atualiza a variável usuário que irá refletir na lista da tela
        usuario = result;
      }
    });
  }

}
