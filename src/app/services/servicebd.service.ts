import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Publicaciones } from './publicaciones';
import { Usuarios } from './usuarios';
import { Rol } from './rol';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  // Variable de conexión a Base de Datos
  public database!: SQLiteObject;

  // Variables de creación de Tablas
  tablaPublicaciones: string = "CREATE TABLE IF NOT EXISTS Publicaciones( producto_id INTEGER PRIMARY KEY AUTOINCREMENT, titulo VARCHAR(100) NOT NULL, descripcion TEXT NOT NULL, talla VARCHAR(10) NOT NULL, ubicacion VARCHAR(50) NOT NULL, color VARCHAR(20) NOT NULL, precio INTEGER NOT NULL, foto_publicacion TEXT NOT NULL);";
  tablaUsuarios: string = "CREATE TABLE IF NOT EXISTS Usuarios( usuario_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_usu VARCHAR(100) NOT NULL , email_usu VARCHAR(50) NOT NULL UNIQUE , telefono_usu INTEGER NOT NULL, contrasena_usu VARCHAR(20) NOT NULL, rol_id INTEGER NOT NULL DEFAULT 1,  FOREIGN KEY (rol_id) REFERENCES ROL(rol_id));";
  tablaRol: string = "CREATE TABLE IF NOT EXISTS ROL (rol_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_rol TEXT NOT NULL);";

  // Variables para los insert por defecto en nuestras tablas 
  registroUsuarioAdmin: string = "INSERT OR IGNORE INTO Usuarios(usuario_id, nombre_usu, email_usu, telefono_usu, contrasena_usu, rol_id) VALUES (1, 'admin', 'admin@gmail.com', 123456789, 'soyadmin123', '2');";
  registroRol: string = "INSERT or IGNORE INTO rol(rol_id, nombre_rol) VALUES (1,'usuario'), (2,'admin');";
  
  // Variables para guardar los datos de las consultas en las tablas
  listadoPublicaciones = new BehaviorSubject([]);
  listadoUsuarios = new BehaviorSubject([]);
  listadoRol = new BehaviorSubject([]);

  //variable para el status de la Base de datos
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

   constructor(
    private sqlite: SQLite, 
    private platform: Platform, 
    private alertController: AlertController,
    private storage: NativeStorage) { 
       this.createBD();
   }
   
  async presentAlert(titulo: string, msj:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  //metodos para manipular los observables
  fetchPublicaciones(): Observable<Publicaciones[]> {
    return this.listadoPublicaciones.asObservable();
  }

  fetchUsuarios(): Observable<Usuarios[]> {
    return this.listadoUsuarios.asObservable();
  }

  fetchRol(): Observable<Rol[]> {
    return this.listadoRol.asObservable();
  }

  dbState(){
    return this.isDBReady.asObservable();
  }

  //función para crear la Base de Datos
  createBD(){
    //verificar si la plataforma esta disponible
    this.platform.ready().then(()=>{
      //crear la Base de Datos
      this.sqlite.create({
        name: 'AppMarket.db',
        location: 'default'
      }).then((db: SQLiteObject)=>{
        //capturar la conexion a la BD
        this.database = db;
        //llamamos a la función para crear las tablas
        this.crearTablas();
      }).catch(e=>{
        this.presentAlert('Base de Datos', 'Error en crear la BD: ' + JSON.stringify(e));
      })
    })

  }

  async crearTablas() {
    try {
      // Ejecutar la creación de Tablas
      await this.database.executeSql(this.tablaPublicaciones, []);
      await this.database.executeSql(this.tablaUsuarios, []);
      await this.database.executeSql(this.tablaRol, []);

      // Ejecutar los insert por defecto en el caso que existan
      await this.database.executeSql(this.registroUsuarioAdmin, []);
      await this.database.executeSql(this.registroRol, []);

      this.seleccionarPublicaciones();
      this.seleccionarUsuarios();

      // Modificar el estado de la Base de Datos
      this.isDBReady.next(true);

    } catch (e) {
      this.presentAlert('Creación de Tablas', 'Error en crear las tablas: ' + JSON.stringify(e));
    }
  }

  // SELECCIONAR
  seleccionarPublicaciones() {
    return this.database.executeSql('SELECT * FROM Publicaciones', []).then(res => {
      // Variable para almacenar el resultado de la consulta
      let items: Publicaciones[] = [];
      // Validar si trae al menos un registro
      if (res.rows.length > 0) {
        // Recorrer el resultado
        for (var i = 0; i < res.rows.length; i++) {
          // Agregar los registros a la lista
          items.push({
            producto_id: res.rows.item(i).producto_id,
            titulo: res.rows.item(i).titulo,
            descripcion: res.rows.item(i).descripcion,
            talla: res.rows.item(i).talla,
            ubicacion: res.rows.item(i).ubicacion,
            color: res.rows.item(i).color,
            precio: res.rows.item(i).precio
          });
        }
      }
      // Actualizar el observable
      this.listadoPublicaciones.next(items as any);
    });
  }
  
  seleccionarUsuarios() {
    return this.database.executeSql('SELECT * FROM Usuarios', []).then(res => {
      // Variable para almacenar el resultado de la consulta
      let items: Usuarios[] = [];
      // Validar si trae al menos un registro
      if (res.rows.length > 0) {
        // Recorrer el resultado
        for (var i = 0; i < res.rows.length; i++) {
          // Agregar los registros a la lista
          items.push({
            usuario_id: res.rows.item(i).usuario_id,
            nombre_usu: res.rows.item(i).nombre_usu,
            email_usu: res.rows.item(i).email_usu,
            telefono_usu: res.rows.item(i).telefono_usu,
            contrasena_usu: res.rows.item(i).contrasena_usu,
            rol: res.rows.item(i).rol
          });
        }
      }
      // Actualizar el observable
      this.listadoUsuarios.next(items as any);
    });
  }

  //OBTENER
  getPublicacionById(id: string) {
    return this.database.executeSql('SELECT * FROM Publicaciones WHERE producto_id = ?', [id]).then(data => {
      let publicacion = {};
      if (data.rows.length > 0) {
        publicacion = {
            producto_id: data.rows.item(0).producto_id,
            titulo: data.item(0).titulo,
            descripcion: data.rows.item(0).descripcion,
            talla: data.item(0).talla,
            ubicacion: data.rows.item(0).ubicacion,
            color: data.item(0).color,
            precio: data.item(0).precio,
            foto_publicacion: data.item(0).foto_publicacion
        };
      }
      return publicacion;
    });
  }

  obtenerRolUsuarioPorId(usuario_id: number) {
    return this.database.executeSql('SELECT rol_id FROM Usuarios WHERE usuario_id = ?', [usuario_id])
      .then(res => {
        if (res.rows.length > 0) {
          return res.rows.item(0).rol_id;
        } else {
          return null;
        }
      })
      .catch(e => {
        console.error('Error al obtener el rol del usuario:', JSON.stringify(e));
        return null;
      });
  }

  obtenerDatosUsuario(usuario_id: number) {
    const query = `
      SELECT nombre_usu, email_usu, telefono_usu
      FROM Usuarios 
      WHERE usuario_id = ?
    `;

    return this.database.executeSql(query, [usuario_id]).then(res => {
      if (res.rows.length > 0) {
        const usuario = {
          nombre_usu: res.rows.item(0).nombre_usu,
          email_usu: res.rows.item(0).email_usu,
          telefono_usu: res.rows.item(0).telefono_usu,
        };
        return usuario;
      } else {
        return null;
      }
    }).catch(e => {
      this.presentAlert("ERROR", `No se pudo obtener los datos del usuario. ${e.message}`); 
      return null;
    });
  }

  async obtenerUsuarioActual() {
    try {
      const storedUserId = await this.storage.getItem('usuario_id');
      console.log('ID de usuario almacenado:', storedUserId); // Verifica el valor
  
      const query = `SELECT usuario_id, nombre_usu, email_usu, telefono_usu FROM Usuarios WHERE usuario_id = ?`;
      const res = await this.database.executeSql(query, [storedUserId]);
  
      if (res.rows.length > 0) {
        return {
          usuario_id: res.rows.item(0).usuario_id,
          nombre_usu: res.rows.item(0).nombre_usu,
          email_usu: res.rows.item(0).email_usu,
          telefono_usu: res.rows.item(0).telefono_usu,
        };
      } else {
        return null; // No se encontró el usuario
      }
    } catch (e) {
      console.error('Error al obtener el usuario actual:', JSON.stringify(e));
      return null;
    }
  }

  // ELIMINAR
  eliminarPublicacion(id: string) {
    return this.database.executeSql('DELETE FROM Publicaciones WHERE producto_id = ?', [id]).then(res => {
      this.presentAlert("Eliminar", "Publicacion Eliminada");
      this.seleccionarPublicaciones();
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    });
  }

  eliminarUsuario(id: string) {
    return this.database.executeSql('DELETE FROM Usuarios WHERE usuario_id = ?', [id]).then(res => {
      this.presentAlert("Eliminar", "Usuario Eliminado");
      this.seleccionarUsuarios();
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    });
  }
  
  // MODIFICAR
  modificarUsuario(id: string, nombre: string, email: string, telefono: number, contrasena: string, rol: string) {
    return this.database.executeSql('UPDATE Usuarios SET nombre_usu = ?, email_usu = ?, telefono_usu = ?, contrasena_usu = ?, rol = ? WHERE usuario_id = ?', [nombre, email, telefono, contrasena, rol, id]).then(res => {
      this.presentAlert("Modificar", "Usuario Modificado");
      this.seleccionarUsuarios();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    });
  }

  modificarPublicacion(id: string, titulo: string, descripcion: string, talla: string, ubicacion: string, color: string, precio: number) {
    return this.database.executeSql('UPDATE Publicaciones SET titulo = ?, descripcion = ?, talla = ?, ubicacion = ?, color = ?, precio = ? WHERE producto_id = ?', [titulo,descripcion,talla,ubicacion,color,precio,id]).then(res => {
      this.presentAlert("Modificar", "Publicacion Modificada");
      this.seleccionarPublicaciones();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    });
  }

  // INSERTAR
  insertarPublicacion(titulo: string, descripcion: string, talla: string, ubicacion: string, color: string, precio: number) {
    return this.database.executeSql('INSERT INTO Publicaciones (titulo, descripcion, talla, ubicacion, color, precio) VALUES (?, ?, ?, ?, ?, ?)', [titulo, descripcion, talla, ubicacion, color, precio]).then(res => {
      this.seleccionarPublicaciones();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    });
  } 

  insertarUsuario(nombre: string, email: string, telefono: number, contrasena: string) {
    return this.database.executeSql(
        'INSERT INTO Usuarios (nombre_usu, email_usu, telefono_usu, contrasena_usu, rol_id) VALUES (?, ?, ?, ?, ?)', 
        [nombre, email, telefono, contrasena, 1]  
    ).then(res => {
        this.seleccionarUsuarios();
    }).catch(e => {
        this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    });
}

  // VERIFICAR
  async verificarUsuario(email_usu: string, contrasena_usu: string): Promise<any> {
    const query = 'SELECT usuario_id, nombre_usu, email_usu, telefono_usu FROM Usuarios WHERE email_usu = ? AND contrasena_usu = ?';
    const res = await this.database.executeSql(query, [email_usu, contrasena_usu]);
  
    if (res.rows.length > 0) {
      // Retornar el objeto del usuario
      return {
        usuario_id: res.rows.item(0).usuario_id,
        nombre_usu: res.rows.item(0).nombre_usu,
        email_usu: res.rows.item(0).email_usu,
        telefono_usu: res.rows.item(0).telefono_usu,
      };
    } else {
      return null; // Si no se encuentra el usuario
    }
  }

  // ACTUALIZAR
  actualizarContra(email_usu: string, contrasena_usu: string): Promise<void> {
    return this.database.executeSql('UPDATE Usuarios SET contrasena_usu = ? WHERE email_usu = ?', [email_usu, contrasena_usu])
      .then(res => {
        if (res.rowsAffected > 0) {
          this.presentAlert("Actualización", "Contraseña actualizada exitosamente.");
        } else {
          this.presentAlert("Error", "No se encontró un usuario con ese correo.");
        }
      })
      .catch(e => {
        this.presentAlert('Actualizar', 'Error: ' + JSON.stringify(e));
      });
  }

}
