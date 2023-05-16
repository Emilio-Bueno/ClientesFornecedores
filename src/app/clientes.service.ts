import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clientes } from './Clientes';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  url = "http://localhost:3000/clients";
  constructor(private http: HttpClient) { }

  getClientes(): Observable<Clientes[]>{
    return this.http.get<Clientes[]>(this.url);
  }

  save(clientes : Clientes) : Observable<Clientes>{
    return this.http.post<Clientes>(this.url, clientes);
}

update(clientes: Clientes) : Observable<Clientes>{
  return this.http.put<Clientes>(`${this.url}/${clientes.id}`, clientes);
}

delete(Clientes: Clientes) : Observable<void>{
  return this.http.delete<void>(`${this.url}/${Clientes.id}`);
}
}
