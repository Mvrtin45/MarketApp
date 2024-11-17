import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicebdService } from './servicebd.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthfireBaseService {
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  
  private apiUrl = 'https://openexchangerates.org/api/latest.json?app_id=4ac0b15502bf4e969e92ab022061d130';

  constructor(
    private AFauth: AngularFireAuth,
    private bd: ServicebdService,
    private http: HttpClient
  ) {}

  // Iniciar sesión
  inicioSesion(nombreUsuario: string, contrasenia: string) {
    return this.bd.verificarCorreo(nombreUsuario)
      .then(usuarioInfo => {
        if (usuarioInfo && usuarioInfo.correo) {
          // Iniciar sesión en Firebase con el correo obtenido
          return this.AFauth.signInWithEmailAndPassword(usuarioInfo.correo, contrasenia);
        } else {
          throw new Error('No se encontró el correo del usuario');
        }
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
        return null;
      });
  }

  // Eliminar usuario
  eliminarUsuario(usuarioid: string) {
    return this.AFauth.currentUser.then(user => {
      if (user) {
        // Eliminar el usuario autenticado
        return user.delete();
      } else {
        return null;
      }
    });
  }

  // Registrar nuevo usuario
  registro(correo: string, contrasenia: string) { 
    return this.AFauth.createUserWithEmailAndPassword(correo, contrasenia);
  }

  // Enviar correo de restablecimiento de contraseña
  resetContra(email: string) {
    return this.AFauth.sendPasswordResetEmail(email);
  }

  // Método para obtener datos desde la API
  obtenerDatosApi(): Observable<any> {
    return this.http.get<any>(this.apiUrl, this.httpOptions);
  }
}
