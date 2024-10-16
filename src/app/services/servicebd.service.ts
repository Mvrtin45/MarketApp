import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Publicaciones } from './publicaciones';
import { Usuarios } from './usuarios';

@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  // Variable de conexión a Base de Datos
  public database!: SQLiteObject;

  // Variables de creación de Tablas
  tablaPublicaciones: string = "CREATE TABLE IF NOT EXISTS Publicaciones( producto_id INTEGER PRIMARY KEY AUTOINCREMENT, titulo VARCHAR(100) NOT NULL, descripcion TEXT NOT NULL, talla VARCHAR(10) NOT NULL, ubicacion VARCHAR(50) NOT NULL, color VARCHAR(20) NOT NULL, precio INTEGER NOT NULL);";
  tablaUsuarios: string = "CREATE TABLE IF NOT EXISTS Usuarios( usuario_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_usu VARCHAR(100) NOT NULL , email_usu VARCHAR(50) NOT NULL UNIQUE , contrasena_usu VARCHAR(20) NOT NULL, telefono_usu INTEGER NOT NULL, rol TEXT NOT NULL DEFAULT 'usuario');";
  
  // Variables para los insert por defecto en nuestras tablas 
  registroPublicaciones: string = "INSERT OR IGNORE INTO Publicaciones(producto_id, titulo, descripcion, talla, ubicacion, color, precio) VALUES (1, 'Titulo ejemplo', 'Descripción del producto de ejemplo', 'M', 'Iquique', 'Rojo', 1000);";
  
  // Variables para guardar los datos de las consultas en las tablas
  listadoPublicaciones = new BehaviorSubject([]);
  listadoUsuarios = new BehaviorSubject([]);

  //variable para el status de la Base de datos
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

   constructor(
    private sqlite: SQLite, 
    private platform: Platform, 
    private alertController: AlertController) { 
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

      // Ejecutar los insert por defecto en el caso que existan
      await this.database.executeSql(this.registroPublicaciones, []);

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
            contrasena_usu: res.rows.item(i).contrasena_usu,
            telefono_usu: res.rows.item(i).telefono_usu,
            rol: res.rows.item(i).rol
          });
        }
      }
      // Actualizar el observable
      this.listadoUsuarios.next(items as any);
    });
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
  modificarUsuario(id: string, nombre: string, email: string, contrasena: string, telefono: number, rol: string) {
    return this.database.executeSql('UPDATE Usuarios SET nombre_usu = ?, email_usu = ?, contrasena_usu = ?, telefono_usu = ?, rol = ? WHERE usuario_id = ?', [nombre, email, contrasena, telefono, rol, id]).then(res => {
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

  insertarUsuario(nombre: string, email: string, contrasena: string, telefono: number, rol: string) {
    return this.database.executeSql('INSERT INTO Usuarios (nombre_usu, email_usu, contrasena_usu, telefono_usu, rol) VALUES (?, ?, ?, ?, ?)', [nombre, email, contrasena, telefono, rol]).then(res => {
      this.seleccionarUsuarios();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    });
  }
}
