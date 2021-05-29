import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { hasErrors, validateAllFormFields } from '../shared/helpers/iu.helper';
import { UsuarioService } from '../shared/services/usuario.service';
import { Usuario } from './usuario.model';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.scss']
})
export class FormUsuarioComponent implements OnInit {

  formGroup?: FormGroup;
  usuario?: Usuario;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private usuarioService: UsuarioService) {

  }

  ngOnInit(): void {
    const usuario: any = {};
    this.createForm(usuario);
  }

  private createForm(usuario: Usuario) {
    this.formGroup = this.formBuilder.group({
      username: [
        { value: usuario.username, disabled: usuario.id !== undefined },
        Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])
      ],
      password: [
        usuario.password,
        Validators.compose([Validators.required, Validators.minLength(5)])
      ],
      name: [
        usuario.name,
        Validators.compose([Validators.required, Validators.minLength(5)])
      ],
      email: [
        usuario.email,
        Validators.compose([Validators.required, Validators.email])
      ]
    });

    this.usuario = usuario;
  }

  salvar() {
    if (this.formGroup?.invalid) {
      this.toastr.error('Campos inválidos ou não preenchidos!');
      validateAllFormFields(this.formGroup);
      return;
    }

    const usuarioForm = this.formGroup?.getRawValue() as Usuario;
    const usuario = { ...this.usuario, ...usuarioForm };

    try {
      // Chama o service para salvar na API
      const userSaved = this.usuarioService.salvar(usuario)
        .subscribe(result => {
          this.toastr.success(`Usuário ${result.name} salvo com sucesso`, 'Ok');
        }, error => {
          this.toastr.error(error.message);
        }, () => {

        });

    } catch (error) {
      this.toastr.error(error.message);
    }

  }

  get username() {
    return this.formGroup?.get('username');
  }

  get password() {
    return this.formGroup?.get('password');
  }

  get name() {
    return this.formGroup?.get('name');
  }

  get email() {
    return this.formGroup?.get('email');
  }

  hasErrors = hasErrors;

}
