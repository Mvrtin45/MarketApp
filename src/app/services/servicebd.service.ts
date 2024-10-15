import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appmarket } from './appmarket';

@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  // Variable de conexión a Base de Datos
  public database!: SQLiteObject;

  // Variables de creación de Tablas
  tablaProductos: string = "CREATE TABLE IF NOT EXISTS Productos( producto_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(100), descripcion TEXT NOT NULL, talla VARCHAR(10) NOT NULL, ubicacion VARCHAR(50) NOT NULL, color VARCHAR(20) NOT NULL, precio INTEGER NOT NULL);";

  // Variables para los insert por defecto en nuestras tablas 
  registroProducto: string = "INSERT OR IGNORE INTO Productos(producto_id, nombre, descripcion, talla, ubicacion, color, precio) VALUES (1, 'Producto de Ejemplo', 'Descripción del producto de ejemplo', 'M', 'Iquique', 'Rojo', 1000);";
  
  // Variables para guardar los datos de las consultas en las tablas
  listadoProductos = new BehaviorSubject([]);

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
  fetchProductos(): Observable<any[]> {
    return this.listadoProductos.asObservable();
  }

  dbState(){
    return this.isDBReady.asObservable();
  }

  //función para crear la Base de Datos
  createBD(){
    //varificar si la plataforma esta disponible
    this.platform.ready().then(()=>{
      //crear la Base de Datos
      this.sqlite.create({
        name: 'productos.db',
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
      await this.database.executeSql(this.tablaProductos, []);

      // Ejecutar los insert por defecto en el caso que existan
      await this.database.executeSql(this.registroProducto, []);

      this.seleccionarProductos();
      // Modificar el estado de la Base de Datos
      this.isDBReady.next(true);

    } catch (e) {
      this.presentAlert('Creación de Tablas', 'Error en crear las tablas: ' + JSON.stringify(e));
    }
  }
    
  seleccionarProductos() {
    return this.database.executeSql('SELECT * FROM Productos', []).then(res => {
      // Variable para almacenar el resultado de la consulta
      let items: any[] = [];
      // Validar si trae al menos un registro
      if (res.rows.length > 0) {
        // Recorrer el resultado
        for (var i = 0; i < res.rows.length; i++) {
          // Agregar los registros a la lista
          items.push({
            producto_id: res.rows.item(i).producto_id,
            nombre: res.rows.item(i).nombre,
            descripcion: res.rows.item(i).descripcion,
            talla: res.rows.item(i).talla,
            ubicacion: res.rows.item(i).ubicacion,
            color: res.rows.item(i).color,
            precio: res.rows.item(i).precio
          });
        }
      }
      // Actualizar el observable
      this.listadoProductos.next(items as any);
    });
  }
  
  eliminarProducto(id: string) {
    return this.database.executeSql('DELETE FROM Productos WHERE producto_id = ?', [id]).then(res => {
      this.presentAlert("Eliminar", "Producto Eliminado");
      this.seleccionarProductos();
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    });
  }

  modificarProducto(id: string, nombre: string, descripcion: string, talla: string, ubicacion: string, color: string, precio: number) {
    return this.database.executeSql('UPDATE Productos SET nombre = ?, descripcion = ?, talla = ?, ubicacion = ?, color = ?, precio = ? WHERE producto_id = ?', [nombre,descripcion,talla,ubicacion,color,precio,id]).then(res => {
      this.presentAlert("Modificar", "Producto Modificado");
      this.seleccionarProductos();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    });
  }

  insertarProducto(nombre: string, descripcion: string, talla: string, ubicacion: string, color: string, precio: number) {
    return this.database.executeSql('INSERT INTO Productos (nombre, descripcion, talla, ubicacion, color, precio) VALUES (?, ?, ?, ?, ?, ?)', [nombre, descripcion, talla, ubicacion, color, precio]).then(res => {
      this.presentAlert("Insertar", "Producto Registrado");
      this.seleccionarProductos();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    });
  }
}
