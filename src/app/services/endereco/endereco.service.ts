import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  private apiUrl = 'http://localhost:8080/enderecos';

  constructor(private http: HttpClient) {}

  cadastrar(dados: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, dados)
      .pipe(map(response => response.codigo));
  }

  consultar(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  remover(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  atualizar(dados: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${dados.id}`, dados);
  }

  listar(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
