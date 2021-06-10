import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRestService } from 'src/app/shared/services/base-rest.service';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseRestService {

  public buscarTodos(): Observable<Cliente[]> {
    return this.getter<Cliente[]>('clientes').pipe(take(1));
  }

  public buscarPorId(id: number): Observable<Cliente> {
    return this.getter<Cliente>(`clientes/${id}`).pipe(take(1));
  }

  public salvar(cliente: Cliente): Observable<Cliente> {
    // Verifica se o cliente já tem ID, se tiver chama o PUT para atual, senão o POST para inserir
    if (cliente.id) {
      cliente.dateUpdate = new Date();
      return this.put<Cliente>(`clientes/${cliente.id}`, cliente);
    } else {
      cliente.dateInsert = new Date();
      return this.post<Cliente>('clientes', cliente);
    }
  }

  public excluir(id: number): Observable<void> {
    return this.delete(`clientes/${id}`).pipe(take(1));
  }

}