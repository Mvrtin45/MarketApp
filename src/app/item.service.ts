import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:3000/';
 
  constructor(private http: HttpClient) {}
  
  // CAPTURAR DATOS
  getItems(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  
  // AGREGAR
  addItem(item: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, item);
  }
  
  // ACTUALIZAR
  updateItem(id: number, item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, item);
  }
  
  // BORRAR
  deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
