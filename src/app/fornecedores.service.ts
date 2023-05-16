
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fornecedores } from './Fornecedores';


@Injectable({
  providedIn: 'root'
})
export class FornecedoresService {
  url = "http://localhost:3000/Fornecedores";
  constructor(private http: HttpClient) { }

  getFornecedores(): Observable<Fornecedores[]>{
    return this.http.get<Fornecedores[]>(this.url);
  }

  save(Fornecedores : Fornecedores) : Observable<Fornecedores>{
    return this.http.post<Fornecedores>(this.url, Fornecedores);
}

update(Fornecedores: Fornecedores) : Observable<Fornecedores>{
  return this.http.put<Fornecedores>(`${this.url}/${Fornecedores.id}`, Fornecedores);
}

delete(Fornecedores: Fornecedores) : Observable<void>{
  return this.http.delete<void>(`${this.url}/${Fornecedores.id}`);
}
}
