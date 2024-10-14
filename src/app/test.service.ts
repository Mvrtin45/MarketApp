import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})
export class TestService {
  constructor(private http: HttpClient) { }
 
  fetchData() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
  }
}
