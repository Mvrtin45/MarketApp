import { Injectable, isDevMode } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Publicaciones } from './publicaciones';
import { Usuarios } from './usuarios';
import { Rol } from './rol';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Ventas } from './ventas';
import { Carrito } from './carrito';

@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  // Variable de conexión a Base de Datos
  public database!: SQLiteObject;
  

  // Variables de creación de Tablas
  tablaPublicaciones: string = "CREATE TABLE IF NOT EXISTS Publicaciones ( producto_id INTEGER PRIMARY KEY AUTOINCREMENT, titulo VARCHAR(100) NOT NULL, descripcion TEXT NOT NULL, talla VARCHAR(10) NOT NULL, ubicacion VARCHAR(50) NOT NULL, color VARCHAR(20) NOT NULL, precio INTEGER NOT NULL, foto_publicacion TEXT NOT NULL, usuario_id INTEGER, categoria_id INTEGER, FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id), FOREIGN KEY (categoria_id) REFERENCES Categorias(categoria_id) );";
  tablaUsuarios: string = "CREATE TABLE IF NOT EXISTS Usuarios ( usuario_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_usu VARCHAR(100) NOT NULL, email_usu VARCHAR(50) NOT NULL UNIQUE, telefono_usu INTEGER NOT NULL, contrasena_usu VARCHAR(20) NOT NULL, imagen_usu TEXT, rol_id INTEGER NOT NULL DEFAULT 1, estado INTEGER NOT NULL DEFAULT 1,  FOREIGN KEY (rol_id) REFERENCES ROL(rol_id));";
  tablaCategorias: string = "CREATE TABLE IF NOT EXISTS Categorias ( categoria_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_categoria VARCHAR(50) NOT NULL );";
  tablaRol: string = "CREATE TABLE IF NOT EXISTS ROL ( rol_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_rol TEXT NOT NULL);";
  tablaVentas: string = "CREATE TABLE IF NOT EXISTS Ventas ( venta_id INTEGER PRIMARY KEY AUTOINCREMENT, usuario_id INTEGER, producto_id INTEGER, fecha_venta DATETIME DEFAULT CURRENT_TIMESTAMP, precio INTEGER NOT NULL, FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id), FOREIGN KEY (producto_id) REFERENCES Publicaciones(producto_id));";
  tablaCarrito: string = "CREATE TABLE IF NOT EXISTS Carrito ( carrito_id INTEGER PRIMARY KEY AUTOINCREMENT, usuario_id INTEGER NOT NULL, producto_id INTEGER NOT NULL, cantidad INTEGER NOT NULL DEFAULT 1, fecha_agregado DATETIME DEFAULT CURRENT_TIMESTAMP, estado VARCHAR(20) DEFAULT 'pendiente', FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id), FOREIGN KEY (producto_id) REFERENCES Publicaciones(producto_id) );";
  tablaHistorialCarrito: string = "CREATE TABLE IF NOT EXISTS HistorialCarrito ( historial_id INTEGER PRIMARY KEY AUTOINCREMENT, carrito_id INTEGER NOT NULL, producto_id INTEGER NOT NULL, usuario_id INTEGER NOT NULL, accion VARCHAR(10) NOT NULL, fecha_accion DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (carrito_id) REFERENCES Carrito(carrito_id), FOREIGN KEY (producto_id) REFERENCES Publicaciones(producto_id), FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id) );";

  // Variables para los insert por defecto en nuestras tablas 
  registroUsuarioAdmin: string = "INSERT OR IGNORE INTO Usuarios(usuario_id, nombre_usu, email_usu, telefono_usu, contrasena_usu, imagen_usu, rol_id) VALUES (1, 'admin', 'admin@gmail.com', 123456789, 'soyadmin123','imagen', '2');";
  registroRol: string = "INSERT OR IGNORE INTO rol(rol_id, nombre_rol) VALUES (1,'usuario'), (2,'admin');";
  registroPublicacion: string = "INSERT OR IGNORE INTO Publicaciones(producto_id, titulo, descripcion, talla, ubicacion, color, precio, foto_publicacion) VALUES (1, 'Camiseta Deportiva', 'Camiseta de algodón ideal para entrenamientos', 'M', 'Madrid', 'Azul', 1999, '../assets/icon/logo.jpg');";
  registroPublicacionConUsuario: string = "INSERT INTO Publicaciones (titulo, descripcion, talla, ubicacion, color, precio, foto_publicacion, usuario_id) VALUES ('Producto Prueba', 'Descripción del producto', 'M', 'Madrid', 'Azul', 20.99, 'foto_prueba.jpg', 1);";

  // Variables para guardar los datos de las consultas en las tablas
  listadoPublicaciones = new BehaviorSubject([]);
  listadoUsuarios = new BehaviorSubject([]);
  listadoRol = new BehaviorSubject([]);
  listadoAgruparPublicacionesConUsuarios = new BehaviorSubject<Publicaciones[]>([]);
  listadoVentas = new BehaviorSubject([]);
  listadoCarrito = new BehaviorSubject<Carrito[]>([]);

  //variable para el status de la Base de datos
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

   constructor(
    private sqlite: SQLite, 
    private platform: Platform, 
    private alertController: AlertController,
    private storage: NativeStorage) { 
      if (!isDevMode()) {
        this.createBD();
      }
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


  fetchPublicacionesConUsuarios(): Observable<Publicaciones[]> {
    return from(this.obtenerUsuariosConPublicaciones()).pipe(
        tap((publicaciones: Publicaciones[]) => {
            console.log('Publicaciones obtenidas:', JSON.stringify(publicaciones, null, 2)); 
            this.listadoAgruparPublicacionesConUsuarios.next(publicaciones);
        })
    );
  }

  fetchVentas(): Observable<Ventas[]> {
    return this.listadoVentas.asObservable();
  }
  
  fetchCarrito(usuarioId: number): Observable<Carrito[]> {
    return from(this.obtenerProductosCarritoPendientes(usuarioId)).pipe(
      tap((productos: Carrito[]) => {
        console.log('Productos obtenidos del carrito:', JSON.stringify(productos, null, 2));
        this.listadoCarrito.next(productos); // Actualiza el estado del carrito
      })
    );
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
      //await this.database.executeSql('DROP TABLE IF EXISTS Publicaciones', []);
      //await this.database.executeSql('DROP TABLE IF EXISTS Carrito', []);
      // Ejecutar la creación de Tablas
      await this.database.executeSql(this.tablaPublicaciones, []);
      await this.database.executeSql(this.tablaUsuarios, []);
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaCarrito, []);
      await this.database.executeSql(this.tablaVentas, []);
      await this.database.executeSql(this.tablaHistorialCarrito, []);
      await this.database.executeSql(this.tablaCategorias, []);

      // Ejecutar los insert por defecto en el caso que existan
      await this.database.executeSql(this.registroUsuarioAdmin, []);
      await this.database.executeSql(this.registroPublicacion, []);
      await this.database.executeSql(this.registroRol, []);



      this.seleccionarPublicaciones();
      this.seleccionarUsuarios();
      this.seleccionarVentas();
      this.seleccionarCarrito();

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
            precio: res.rows.item(i).precio,
            usuario_id: res.rows.item(i).usuario_id,
            foto_publicacion: res.rows.item(i).foto_publicacion,
            nombre_usu: res.rows.item(i).nombre_usu,
            email_usu: res.rows.item(i).email_usu
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
            imagen_usu: res.rows.item(i).imagen_usu,
            rol: res.rows.item(i).rol,
            estado: res.rows.item(i).estado
          });
        }
      }
      // Actualizar el observable
      this.listadoUsuarios.next(items as any);
    });
  }

  seleccionarVentas() {
    return this.database.executeSql('SELECT * FROM Ventas', []).then(res => {
      // Variable para almacenar el resultado de la consulta
      let items: Ventas[] = [];
      // Validar si trae al menos un registro
      if (res.rows.length > 0) {
        // Recorrer el resultado
        for (var i = 0; i < res.rows.length; i++) {
          // Agregar los registros a la lista
          items.push({
            venta_id: res.rows.item(i).venta_id,
            usuario_id: res.rows.item(i).usuario_id,
            producto_id: res.rows.item(i).producto_id,
            fecha_venta: res.rows.item(i).fecha_venta,
            monto: res.rows.item(i).monto
          });
        }
      }
      // Actualizar el observable
      this.listadoVentas.next(items as any);
    });
  }
  
  seleccionarCarrito(): void {
    this.database.executeSql('SELECT * FROM Carrito', []).then(res => {
      let items: Carrito[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            carrito_id: res.rows.item(i).carrito_id,
            usuario_id: res.rows.item(i).usuario_id,
            producto_id: res.rows.item(i).producto_id,
            cantidad: res.rows.item(i).cantidad,
            fecha_agregado: res.rows.item(i).fecha_agregado,
            precio: res.rows.item(i).precio,
            subtotal: res.rows.item(i).subtotal,
            foto_publicacion: res.rows.item(i).foto_publicacion,
            titulo: res.rows.item(i).titulo
          });
        }
      }
      // Actualizamos el Observable con los elementos del carrito
      this.listadoCarrito.next(items);
    }).catch(error => {
      console.error('Error al seleccionar elementos del carrito:', error);
      this.presentAlert('Error', 'Hubo un problema al cargar el carrito.');
    });
  }
  
  //OBTENER
  getPublicacionById(id: number) {
    return this.database.executeSql('SELECT * FROM Publicaciones WHERE producto_id = ?', [id]).then(data => {
      let publicacion = {};
      if (data.rows.length > 0) {
        publicacion = {
          producto_id: data.rows.item(0).producto_id,
          titulo: data.rows.item(0).titulo,
          descripcion: data.rows.item(0).descripcion,
          talla: data.rows.item(0).talla,
          ubicacion: data.rows.item(0).ubicacion,
          color: data.rows.item(0).color,
          precio: data.rows.item(0).precio,
          foto_publicacion: data.rows.item(0).foto_publicacion
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
      SELECT nombre_usu, email_usu, telefono_usu , imagen_usu
      FROM Usuarios 
      WHERE usuario_id = ?
    `;

    return this.database.executeSql(query, [usuario_id]).then(res => {
      if (res.rows.length > 0) {
        const usuario = {
          nombre_usu: res.rows.item(0).nombre_usu,
          email_usu: res.rows.item(0).email_usu,
          telefono_usu: res.rows.item(0).telefono_usu,
          imagen_usu: res.rows.item(0).imagen_usu
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

  obtenerUsuariosConPublicaciones(): Promise<Publicaciones[]> {
    if (!this.database) {
      console.warn('La conexión a la base de datos no está inicializada.');
      return Promise.resolve([]); // Retorna un array vacío en caso de que la base de datos no esté disponible
    }
    const query = `SELECT u.usuario_id, u.nombre_usu, u.email_usu, p.producto_id, p.titulo, p.descripcion, p.talla, p.ubicacion, p.color, p.precio, p.foto_publicacion FROM Usuarios u LEFT JOIN Publicaciones p ON u.usuario_id = p.usuario_id ORDER BY u.usuario_id;`;
    return this.database.executeSql(query, []).then(res => {
      let items: Publicaciones[] = []; 
      for (let i = 0; i < res.rows.length; i++) {
        items.push(res.rows.item(i));
      }
      console.log('Resultados de la consulta:', items);
      return items;
    }).catch(e => {
      console.error('Error al obtener usuarios con publicaciones:', e);
      return [];
    });
  }

  async obtenerUsuarioActual() {
    try {
      const storedUserId = await this.storage.getItem('usuario_id');
      console.log('ID de usuario almacenado:', storedUserId); // Verifica el valor
  
      const query = `SELECT imagen_usu, usuario_id, nombre_usu, email_usu, telefono_usu FROM Usuarios WHERE usuario_id = ?`;
      const res = await this.database.executeSql(query, [storedUserId]);
  
      if (res.rows.length > 0) {
        return {
          imagen_usu: res.rows.item(0).imagen_usu,
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

  loadFavorites(usuario_id: number) {
    const query = `
      SELECT P.titulo, P.precio, P.foto_publicacion AS foto FROM Favoritos F JOIN Publicaciones P ON F.producto_id = P.producto_id WHERE F.usuario_id = ?`;
    return this.database.executeSql(query, [usuario_id]).then(res => {
      let favoritos = [];
      for (let i = 0; i < res.rows.length; i++) {
        favoritos.push(res.rows.item(i));
      }
      return favoritos;
    }).catch(e => {
      console.error("Error al obtener favoritos:", e.message);
      return [];
    });
  }

  obtenerProductosCarritoPendientes(usuarioId: number): Observable<Carrito[]> {
    const query = `
      SELECT p.producto_id, p.titulo, p.descripcion, p.precio, p.foto_publicacion, c.cantidad
      FROM Carrito c
      JOIN Publicaciones p ON c.producto_id = p.producto_id
      WHERE c.usuario_id = ? AND c.estado = 'pendiente'
    `;
    
    return new Observable((observer) => {
      this.database.executeSql(query, [usuarioId]).then(res => {
        let productos: Carrito[] = [];
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            productos.push(res.rows.item(i));
          }
        }
        // Actualizamos el estado del carrito en el BehaviorSubject
        this.listadoCarrito.next(productos);
        observer.next(productos); // Emitimos los productos al Observable
        observer.complete(); // Completa el Observable
      }).catch(error => {
        console.error("Error al obtener productos pendientes:", error);
        observer.error(error); // Si ocurre un error, lo emitimos al Observable
      });
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
  
  banearUsuario(usuario_id: number) {
    const query = `UPDATE Usuarios SET estado = 0 WHERE usuario_id = ?`;
    return this.database.executeSql(query, [usuario_id])
      .then(() => {
        this.presentAlert('Éxito', `Usuario ${usuario_id} baneado correctamente.`);
      })
      .catch(e => {
        this.presentAlert('Error', `Error al banear el usuario: ${e.message}`);
      });
  }

  async eliminarProductoCarrito(usuarioId: number, productoId: number) {
    try {
      // Primero obtenemos el carrito_id correspondiente al usuario y producto
      const carritoQuery = `SELECT carrito_id FROM Carrito WHERE usuario_id = ? AND producto_id = ?`;
      const carritoResult = await this.database.executeSql(carritoQuery, [usuarioId, productoId]);

      if (carritoResult.rows.length > 0) {
        const carritoId = carritoResult.rows.item(0).carrito_id; // Obtenemos el carrito_id

        // Eliminar el producto del carrito
        const queryEliminar = `DELETE FROM Carrito WHERE usuario_id = ? AND producto_id = ?`;
        await this.database.executeSql(queryEliminar, [usuarioId, productoId]);

        // Registrar la acción en el historial con el carrito_id correcto
        const queryHistorial = `INSERT INTO HistorialCarrito (carrito_id, producto_id, usuario_id, accion, fecha_accion) 
                                VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`;
        await this.database.executeSql(queryHistorial, [carritoId, productoId, usuarioId, 'eliminado']);
      } else {
        console.log('No se encontró el carrito para este usuario y producto.');
      }

      // Actualizar el listado del carrito después de eliminar
      await this.obtenerProductosCarritoPendientes(usuarioId);
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error);
    }
  }
  
  async vaciarCarrito(usuarioId: number) {
    try {
      // Obtener los carrito_id del usuario
      const carritoQuery = `SELECT carrito_id FROM Carrito WHERE usuario_id = ?`;
      const carritoResult = await this.database.executeSql(carritoQuery, [usuarioId]);

      if (carritoResult.rows.length > 0) {
        const carritoId = carritoResult.rows.item(0).carrito_id; // Obtenemos el carrito_id

        // Eliminar todos los productos del carrito
        const queryVaciar = `DELETE FROM Carrito WHERE usuario_id = ?`;
        await this.database.executeSql(queryVaciar, [usuarioId]);

        // Registrar la acción de vaciar el carrito en el historial
        const queryHistorial = `INSERT INTO HistorialCarrito (carrito_id, producto_id, usuario_id, accion, fecha_accion) 
                                VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`;
        await this.database.executeSql(queryHistorial, [carritoId, null, usuarioId, 'vaciar']);
      } else {
        console.log('No se encontró el carrito para este usuario.');
      }

      // Actualizar el listado del carrito después de vaciarlo
      await this.obtenerProductosCarritoPendientes(usuarioId);
    } catch (error) {
      console.error('Error al vaciar el carrito:', error);
    }
  }

  // MODIFICAR
  modificarUsuario(id: string, nombre: string, email: string, telefono: number, contrasena: string, rol: string) {
    return this.database.executeSql('UPDATE Usuarios SET nombre_usu = ?, email_usu = ?, telefono_usu = ?, contrasena_usu = ?, rol_id = ? WHERE usuario_id = ?', [nombre, email, telefono, contrasena, rol, id]).then(res => {
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

  async modificarUsuarioPerfil(nombre: string, correo: string, telefono: number, iduser: number) {
    try {
      await this.database.executeSql(
        'UPDATE Usuarios SET nombre_usu = ?, email_usu = ?, telefono_usu = ? WHERE usuario_id = ?',
        [nombre, correo, telefono, iduser]
      );
  
      // Guardar el usuario actualizado en el almacenamiento local para que se pueda usar después
      const usuarioActualizado = { iduser, nombre, telefono, correo };
      await this.storage.setItem('usuario', usuarioActualizado);
      this.seleccionarUsuarios();
  
    } catch (error) {
      // Mostrar alerta de error si la modificación falla
      await this.presentAlert("Modificar", "Error al modificar perfil: " + JSON.stringify(error));
    }
  }

  // INSERTAR
  insertarPublicacion(titulo: string, descripcion: string, talla: string, ubicacion: string, color: string, precio: number, imagen: string, usuario_id: number) {
    return this.database.executeSql('INSERT INTO Publicaciones (titulo, descripcion, talla, ubicacion, color, precio, foto_publicacion, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [titulo, descripcion, talla, ubicacion, color, precio, imagen, usuario_id]).then(res => {
      this.seleccionarPublicaciones();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    });
  } 

  async insertarUsuario(nombre: string, email: string, telefono: number, contrasena: string, imagen_usu: string, estado: number = 1) { // estado por defecto es 1
    try {
      // Insertar usuario en la base de datos
      const res = await this.database.executeSql(
        'INSERT INTO Usuarios (nombre_usu, email_usu, telefono_usu, contrasena_usu, rol_id, estado, imagen_usu) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [nombre, email, telefono, contrasena, 1, estado, imagen_usu]  // estado pasa como parámetro
      );
      if (res.insertId) {
        // Guardar los datos del usuario recién creado en Native Storage
        const usuario = {
          iduser: res.insertId, // res.insertId devuelve el ID del usuario insertado
          nombre,
          email,
          telefono
        };
        await this.storage.setItem('usuario', usuario);
      }
      // Seleccionar usuarios para refrescar cualquier lista o datos dependientes
      this.seleccionarUsuarios();
    } catch (e) {
      // Mostrar alerta de error si falla la inserción
      await this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    }
  }

  insertarVenta(usuario_id: number, producto_id: number, monto: number) {
    const query = `INSERT INTO Ventas (usuario_id, producto_id, monto) VALUES (?, ?, ?)`;
    return this.database.executeSql(query, [usuario_id, producto_id, monto])
      .then(() => {
        this.presentAlert('Éxito', 'Venta registrada correctamente.');
      })
      .catch(e => {
        this.presentAlert('Error', `Error al registrar la venta: ${e.message}`);
      });
  }

  async registrarHistorialCarrito(usuarioId: number, carritoId: number, productoId: number, accion: string) {
    const query = `
      INSERT INTO HistorialCarrito (carrito_id, producto_id, usuario_id, accion)
      VALUES (?, ?, ?, ?)
    `;
    return this.database.executeSql(query, [carritoId, productoId, usuarioId, accion])
      .then(res => {
        console.log('Acción registrada en el historial', res);
      })
      .catch(error => {
        console.error('Error al registrar acción en el historial:', error);
        throw error; // Lanza el error si falla la inserción
      });
  }

  async insertarProductoCarrito(usuarioId: number, productoId: number, cantidad: number = 1) {
    try {
      const existingProduct = await this.database.executeSql(
        `SELECT * FROM Carrito WHERE usuario_id = ? AND producto_id = ?`,
        [usuarioId, productoId]
      );
  
      if (existingProduct.rows.length > 0) {
        // Producto ya está en el carrito, actualizar cantidad
        const currentQuantity = existingProduct.rows.item(0).cantidad;
        await this.database.executeSql(
          `UPDATE Carrito SET cantidad = ? WHERE usuario_id = ? AND producto_id = ?`,
          [currentQuantity + cantidad, usuarioId, productoId]
        );
      } else {
        // Producto no está en el carrito, agregarlo
        await this.database.executeSql(
          `INSERT INTO Carrito (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)`,
          [usuarioId, productoId, cantidad]
        );
      }
  
      // Actualizar el listado del carrito
      await this.obtenerProductosCarritoPendientes(usuarioId);
      this.presentAlert('Éxito', 'Producto añadido o actualizado en el carrito');
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Si el error es una instancia de Error, se puede acceder a .message
        this.presentAlert('Error', 'Error al agregar producto al carrito: ' + error.message);
      } else {
        // Si el error no es una instancia de Error, se puede manejar de otra manera
        this.presentAlert('Error', 'Error desconocido al agregar producto al carrito');
      }
    }
  }

  // VERIFICAR
  async verificarUsuario(email_usu: string, contrasena_usu: string): Promise<any> {
    try {
        const query = 'SELECT usuario_id, nombre_usu, email_usu, telefono_usu FROM Usuarios WHERE email_usu = ? AND contrasena_usu = ?';
        const res = await this.database.executeSql(query, [email_usu, contrasena_usu]);
        if (res.rows.length > 0) {
            // Retornar el objeto del usuario encontrado
            return {
                usuario_id: res.rows.item(0).usuario_id,
                nombre_usu: res.rows.item(0).nombre_usu,
                email_usu: res.rows.item(0).email_usu,
                telefono_usu: res.rows.item(0).telefono_usu,
            };
        } else {
            return null; // Si no se encuentra el usuario
        }
    } catch (e) {
        // Manejar errores y registrar si es necesario
        await this.presentAlert('Verificación de Usuario', 'Error: ' + JSON.stringify(e));
        return null;
    }
  }
  
  async verificarContrasena(currentPassword: string): Promise<boolean> {  
    try {
      // Obtener el usuario actual desde NativeStorage
      const usuarioActual = await this.storage.getItem('usuario');
      const email = usuarioActual.correo; // Cambia 'email' a 'correo'
  
      // Verificar si el correo existe en la base de datos
      const correoValido = await this.verificarCorreo(email);
      if (!correoValido) {
        console.error('El correo no es válido o no existe.');
        return false;
      }
  
      // Obtener la contraseña almacenada para el correo
      const res = await this.database.executeSql('SELECT contrasena_usu FROM Usuarios WHERE email_usu = ?', [email]);
      if (res.rows.length > 0) {
        const contrasenaAlmacenada = res.rows.item(0).contrasena_usu;
  
        // Verificar si la contraseña ingresada coincide con la almacenada
        return currentPassword === contrasenaAlmacenada;
      } else {
        console.error('No se encontró el usuario con el correo proporcionado.');
        return false;
      }
    } catch (error) {
      console.error('Error al verificar la contraseña:', error);
      return false;
    }
  }

  verificarCorreo(correo: string) {
    return this.database.executeSql('SELECT * FROM Usuarios WHERE email_usu = ?', [correo]).then(res => {
      if (res.rows.length > 0) {
        return true;
      } else {
        return false;
      }
    }).catch(e => {
      console.error('Error al verificar el correo:', e);
      return false;
    });
  }

  comprobarEstadoUsuario(usuario_id: number) {
    const query = `SELECT estado FROM Usuarios WHERE usuario_id = ?`;
    return this.database.executeSql(query, [usuario_id])
      .then(res => {
        if (res.rows.length > 0) {
          return res.rows.item(0).estado; // Retorna 0 o 1, dependiendo del estado
        } else {
          throw new Error('Usuario no encontrado');
        }
      })
      .catch(e => {
        this.presentAlert('Error', 'No se pudo verificar el estado del usuario. Intenta nuevamente.');
        console.error('Error al comprobar estado de usuario:', e);
        throw e;  // Vuelvo a lanzar el error para que el flujo de la aplicación lo maneje
      });
  }

  obtenerDatosUsuarioPorEmail(email_usu: string) {
    const query = `
      SELECT nombre_usu, email_usu, telefono_usu, imagen_usu
      FROM Usuarios
      WHERE email_usu = ?
    `;
  
    return this.database.executeSql(query, [email_usu]).then(res => {
      if (res.rows.length > 0) {
        const usuario = {
          nombre_usu: res.rows.item(0).nombre_usu,
          email_usu: res.rows.item(0).email_usu,
          telefono_usu: res.rows.item(0).telefono_usu,
          imagen_usu: res.rows.item(0).imagen_usu
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
  
  // ACTUALIZAR
  async actualizarContra(email_usu: string, contrasena_usu: string): Promise<void> {
    try {
      // Asegurarse de que el correo esté limpio
      email_usu = email_usu.trim().toLowerCase();
  
      // Verificar si el correo existe antes de intentar actualizar
      const resSelect = await this.database.executeSql('SELECT * FROM Usuarios WHERE email_usu = ?', [email_usu]);
      console.log('Usuarios encontrados:', resSelect.rows.length);
  
      if (resSelect.rows.length === 0) {
        this.presentAlert("Error", "No se encontró un usuario con ese correo.");
        return;
      }
  
      // Realizar la actualización de la contraseña
      const resUpdate = await this.database.executeSql('UPDATE Usuarios SET contrasena_usu = ? WHERE email_usu = ?', [contrasena_usu, email_usu]);
  
      if (resUpdate.rowsAffected > 0) {
        this.seleccionarUsuarios();
      } else {
        this.presentAlert("Error", "No se encontró un usuario con ese correo.");
      }
    } catch (e) {
      this.presentAlert('Actualizar', 'Error: ' + JSON.stringify(e));
    }
  }

  async actualizarImagenUsuario(usuario_id: number, imagen_usu: string): Promise<void> {
    const sql = 'UPDATE Usuarios SET imagen_usu = ? WHERE usuario_id = ?';
    const data = [imagen_usu, usuario_id];
  
    try {
      const res = await this.database.executeSql(sql, data);
      if (res.rowsAffected > 0) {
        alert("Imagen guardada correctamente.");
        this.seleccionarUsuarios();
      } else {
        alert("No se encontró un usuario con ese ID.");
      }
    } catch (error) {
      alert("Error al actualizar la imagen: " + error);
    }
  }
  

  async convertirBlobABase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string); // Esto devolverá el base64 completo, incluyendo el encabezado
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  restaurarUsuario(usuario_id: number) {
    return this.database.executeSql('UPDATE Usuarios SET estado = 1 WHERE usuario_id = ?', [usuario_id]);
  }
}
