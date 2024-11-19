import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {
  
  httpOptions = {
    Headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }
  private apiUrl = 'https://openexchangerates.org/api/latest.json?app_id=4ac0b15502bf4e969e92ab022061d130'

  constructor( private http: HttpClient) { }

  // ------------------------------ API CONVERSORA DE MONEDAS ------------------------------------------------------

  obtenerValorMoneda(MonedaBase: string): Observable<any> {
    const url = `https://api.exchangerate-api.com/v4/latest/${MonedaBase}`; 
    return this.http.get(url)
  }
  
}
