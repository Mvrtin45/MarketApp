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
  private productosCarritoSubject = new BehaviorSubject<any[]>([]);


  // Variables de creación de Tablas
  tablaPublicaciones: string = "CREATE TABLE IF NOT EXISTS Publicaciones ( producto_id INTEGER PRIMARY KEY AUTOINCREMENT, titulo VARCHAR(100) NOT NULL, descripcion TEXT NOT NULL, talla VARCHAR(10) NOT NULL, ubicacion VARCHAR(50) NOT NULL, color VARCHAR(20) NOT NULL, precio INTEGER NOT NULL, foto_publicacion TEXT NOT NULL, usuario_id INTEGER, categoria_id INTEGER, FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id), FOREIGN KEY (categoria_id) REFERENCES Categorias(categoria_id) );";
  tablaUsuarios: string = "CREATE TABLE IF NOT EXISTS Usuarios ( usuario_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_usu VARCHAR(100) NOT NULL, email_usu VARCHAR(50) NOT NULL UNIQUE, telefono_usu INTEGER NOT NULL, contrasena_usu VARCHAR(20) NOT NULL, imagen_usu TEXT, rol_id INTEGER NOT NULL DEFAULT 1, estado INTEGER NOT NULL DEFAULT 1,  pregunta_seguridad VARCHAR(100) NOT NULL, respuesta_seguridad VARCHAR(100) NOT NULL, FOREIGN KEY (rol_id) REFERENCES ROL(rol_id));";
  tablaCategorias: string = "CREATE TABLE IF NOT EXISTS Categorias ( categoria_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_categoria VARCHAR(50) NOT NULL );";
  tablaRol: string = "CREATE TABLE IF NOT EXISTS ROL ( rol_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_rol TEXT NOT NULL);";
  tablaVentas: string = "CREATE TABLE IF NOT EXISTS Ventas ( venta_id INTEGER PRIMARY KEY AUTOINCREMENT, usuario_id INTEGER, producto_id INTEGER, fecha_venta DATETIME DEFAULT CURRENT_TIMESTAMP, precio INTEGER NOT NULL, FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id), FOREIGN KEY (producto_id) REFERENCES Publicaciones(producto_id));";
  tablaCarrito: string = "CREATE TABLE IF NOT EXISTS Carrito ( carrito_id INTEGER PRIMARY KEY AUTOINCREMENT, usuario_id INTEGER NOT NULL, producto_id INTEGER, cantidad INTEGER DEFAULT 1, estado TEXT DEFAULT 'pendiente', FOREIGN KEY (producto_id) REFERENCES Publicaciones(producto_id), FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id));";
  tablaItemsCarrito: string = "CREATE TABLE IF NOT EXISTS ItemsCarrito ( item_id INTEGER PRIMARY KEY AUTOINCREMENT, carrito_id INTEGER NOT NULL, producto_id INTEGER NOT NULL, cantidad INTEGER NOT NULL DEFAULT 1, FOREIGN KEY (carrito_id) REFERENCES Carritos(carrito_id), FOREIGN KEY (producto_id) REFERENCES Publicaciones(producto_id));";

  // Variables para los insert por defecto en nuestras tablas 
  registroUsuarioAdmin: string = "INSERT OR IGNORE INTO Usuarios(usuario_id, nombre_usu, email_usu, telefono_usu, contrasena_usu, imagen_usu, rol_id) VALUES (1, 'admin', 'admin@gmail.com', 123456789, 'soyadmin123','imagen', '2');";
  registroRol: string = "INSERT OR IGNORE INTO rol(rol_id, nombre_rol) VALUES (1,'usuario'), (2,'admin');";
  registroPublicacion: string = "INSERT OR IGNORE INTO Publicaciones(producto_id, titulo, descripcion, talla, ubicacion, color, precio, foto_publicacion) VALUES (1, 'Camiseta Deportiva', 'Camiseta de algodón ideal para entrenamientos', 'M', 'Madrid', 'Azul', 1999, '../assets/icon/logo.jpg');";
  registroPublicacionConUsuario: string = "INSERT INTO Publicaciones (titulo, descripcion, talla, ubicacion, color, precio, foto_publicacion, usuario_id) VALUES ('Producto Prueba', 'Descripción del producto', 'M', 'Madrid', 'Azul', 20.99, 'foto_prueba.jpg', 1);";
  registroPublicacionCargoCorteiz: string ="INSERT OR IGNORE INTO Publicaciones (producto_id, titulo, descripcion, talla, ubicacion, color, precio, foto_publicacion) VALUES (2, 'Pantalones Cargo Corteiz', 'En buen estado, con un ajuste cómodo y un estilo clásico que se adapta bien a cualquier ocasión.', 'M', 'Puerto Montt', 'Negro', 19990, '../assets/icon/cargocorteiz.jpg');";
  registroPublicacionChaquetaAmiri: string ="INSERT OR IGNORE INTO Publicaciones (producto_id, titulo, descripcion, talla, ubicacion, color, precio, foto_publicacion) VALUES (3, 'Chaqueta Amiri', 'Esta en buenas condiciones, con detalles de diseño que destacan su calidad y un estilo moderno que sigue siendo relevante.', 'L', 'Puerto Montt', 'Negra', 79990, '../assets/icon/chaquetaamiri.jpg');";
  registroPublicacionJeansAmiri: string ="INSERT OR IGNORE INTO Publicaciones (producto_id, titulo, descripcion, talla, ubicacion, color, precio, foto_publicacion) VALUES (4, 'Jeans Amiri', 'En buen estado, con un ajuste cómodo y un estilo clásico que se adapta bien a cualquier ocasión.', 'M', 'Cerrillos', 'Azul', 50000, '../assets/icon/pantalon1.jpg');";
  registroPublicacionJeansFn: string ="INSERT OR IGNORE INTO Publicaciones (producto_id, titulo, descripcion, talla, ubicacion, color, precio, foto_publicacion) VALUES (5, 'Jeans Fashon Nova', 'En buen estado, con un ajuste cómodo y un estilo clásico que se adapta bien a cualquier ocasión.', 'M', 'Lampa', 'Azul', 90000, '../assets/icon/jeansfn.jpg');";
  registroPublicacionJeansLevis: string ="INSERT OR IGNORE INTO Publicaciones (producto_id, titulo, descripcion, talla, ubicacion, color, precio, foto_publicacion) VALUES (6, 'Jeans Levis 501', 'En buen estado, con un ajuste cómodo y un estilo clásico que se adapta bien a cualquier ocasión.', 'S', 'Peñalolen', 'Azul', 30000, '../assets/icon/pantalon2.jpg');";
  registroPublicacionJeansAmericanEagle: string ="INSERT OR IGNORE INTO Publicaciones (producto_id, titulo, descripcion, talla, ubicacion, color, precio, foto_publicacion) VALUES (7, 'Jeans American Eagle', 'En buen estado, con un ajuste cómodo y un estilo clásico que se adapta bien a cualquier ocasión.', '42EUR', 'Puerto Montt', 'Azul', 29990, '../assets/icon/jeansfn.jpg');";
  registroPublicacionJeansSkinny: string ="INSERT OR IGNORE INTO Publicaciones (producto_id, titulo, descripcion, talla, ubicacion, color, precio, foto_publicacion) VALUES (8, 'Jeans Skinny', 'En buen estado, con un ajuste cómodo y un estilo clásico que se adapta bien a cualquier ocasión.', 'L', 'Puerto Montt', 'Azul', 25000, '../assets/icon/pantalon3.jpg');";
  registroPublicacionPoleraBasica: string ="INSERT OR IGNORE INTO Publicaciones (producto_id, titulo, descripcion, talla, ubicacion, color, precio, foto_publicacion) VALUES (9, 'Polera Básica Slim Fit', 'Es una polera de segunda mano que todavía está en muy buen estado. Tiene un estilo clásico y sigue siendo cómoda para usar a diario.', 'M', 'Puerto Montt', 'Negro', 23990, '../assets/icon/polerabasica.jpg');";
  registroPublicacionPoleraColo: string ="INSERT OR IGNORE INTO Publicaciones (producto_id, titulo, descripcion, talla, ubicacion, color, precio, foto_publicacion) VALUES (10, 'Polera Colo Colo 24/25', 'Es una polera de segunda mano que todavía está en muy buen estado. Tiene un estilo clásico y sigue siendo cómoda para usar a diario.', 'M', 'Puente Alto', 'Blanco', 34990, '../assets/icon/poleracolocolo.jpg');";
  registroPublicacionPoleraUchile: string ="INSERT OR IGNORE INTO Publicaciones (producto_id, titulo, descripcion, talla, ubicacion, color, precio, foto_publicacion) VALUES (11, 'Polera Universidad de Chile 23/24', 'Es una polera de segunda mano que todavía está en muy buen estado. Tiene un estilo clásico y sigue siendo cómoda para usar a diario.', 'M', 'Conchali', 'Azul', 34990, '../assets/icon/poleraudechile.jpg');";
  registroPublicacionPoleraPalm: string ="INSERT OR IGNORE INTO Publicaciones (producto_id, titulo, descripcion, talla, ubicacion, color, precio, foto_publicacion) VALUES (12, 'Polera Palm Angels', 'Es una polera de segunda mano que todavía está en muy buen estado. Tiene un estilo clásico y sigue siendo cómoda para usar a diario.', 'M', 'Puerto Montt', 'Negro', 29990, '../assets/icon/polerapalm.jpg');";
  registroPublicacionZapatillaCampus: string ="INSERT OR IGNORE INTO Publicaciones (producto_id, titulo, descripcion, talla, ubicacion, color, precio, foto_publicacion) VALUES (13, 'Adidas Campus 00', 'Estas zapatillas de segunda mano están en excelente estado, tienen mucha vida por delante y un estilo que sigue siendo irresistible.', '6.5US', 'Renca', 'Blanco', 90000, '../assets/icon/campus.jpg');";
  registroPublicacionZapatillaAirForce: string ="INSERT OR IGNORE INTO Publicaciones (producto_id, titulo, descripcion, talla, ubicacion, color, precio, foto_publicacion) VALUES (14, 'Air Force One Triple White', 'Estas zapatillas de segunda mano están en excelente estado, tienen mucha vida por delante y un estilo que sigue siendo irresistible.', '10US', 'Puente Alto', 'Blanco', 70000, '../assets/icon/airforceblancas.jpg');";
  registroPublicacionZapatillaBlackCat: string ="INSERT OR IGNORE INTO Publicaciones (producto_id, titulo, descripcion, talla, ubicacion, color, precio, foto_publicacion) VALUES (15, 'Zapatillas Air Jordan Retro 4 Black Cat', 'Estas zapatillas de segunda mano están en excelente estado, tienen mucha vida por delante y un estilo que sigue siendo irresistible.', '9US', 'Santiago', 'Negro', 129990, '../assets/icon/jordan4blackcat.jpg');";
  registroPublicacionZapatillaRetro3: string ="INSERT OR IGNORE INTO Publicaciones (producto_id, titulo, descripcion, talla, ubicacion, color, precio, foto_publicacion) VALUES (16, 'Air Jordan Retro 3', 'Estas zapatillas de segunda mano están en excelente estado, tienen mucha vida por delante y un estilo que sigue siendo irresistible.', '9US', 'Renca', 'Blanco', 50000, '../assets/icon/retro3.jpg');";
  registroPublicacionZapatillaRetro1: string ="INSERT OR IGNORE INTO Publicaciones (producto_id, titulo, descripcion, talla, ubicacion, color, precio, foto_publicacion) VALUES (17, 'Zapatillas Retro 1', 'Nuevas las pedí y me quedaron Chicas.', '10US', 'Puerto Montt', 'Blanco', 60000, '../assets/icon/retro1.jpg');";
  registroPublicacionZapatillaVaporMax: string ="INSERT OR IGNORE INTO Publicaciones (producto_id, titulo, descripcion, talla, ubicacion, color, precio, foto_publicacion) VALUES (18, 'Vapor Max Plus Metallic Gold', 'Estas zapatillas de segunda mano están en excelente estado, tienen mucha vida por delante y un estilo que sigue siendo irresistible.', '7.5US', 'Maipú', 'Negro', 90000, '../assets/icon/vapormax.jpg');";
  registroPublicacionZapatillaVestir: string ="INSERT OR IGNORE INTO Publicaciones (producto_id, titulo, descripcion, talla, ubicacion, color, precio, foto_publicacion) VALUES (19, 'Zapatos de Vestir', 'Estas zapatillas de segunda mano están en excelente estado, tienen mucha vida por delante y un estilo que sigue siendo irresistible.', '10US', 'Santiago', 'Negro', 30000, '../assets/icon/zapatosvestir.jpg');";

  // Variables para guardar los datos de las consultas en las tablas
  listadoPublicaciones = new BehaviorSubject([]);
  listadoUsuarios = new BehaviorSubject([]);
  listadoRol = new BehaviorSubject([]);
  listadoAgruparPublicacionesConUsuarios = new BehaviorSubject<Publicaciones[]>([]);
  listadoVentas = new BehaviorSubject([]);
  productosCarrito$ = this.productosCarritoSubject.asObservable();
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

  async presentAlert(titulo: string, msj: string) {
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

  fetchCarrito(): Observable<Carrito[]> {
    return this.productosCarritoSubject.asObservable();
  }

  dbState() {
    return this.isDBReady.asObservable();
  }

  //función para crear la Base de Datos
  createBD() {
    //verificar si la plataforma esta disponible
    this.platform.ready().then(() => {
      //crear la Base de Datos
      this.sqlite.create({
        name: 'AppMarket.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        //capturar la conexion a la BD
        this.database = db;
        //llamamos a la función para crear las tablas
        this.crearTablas();
      }).catch(e => {
        this.presentAlert('Base de Datos', 'Error en crear la BD: ' + JSON.stringify(e));
      })
    })

  }

  async crearTablas() {
    try {
      //await this.database.executeSql('DROP TABLE IF EXISTS Publicaciones', []);
      //await this.database.executeSql('DROP TABLE IF EXISTS Usuarios', []);
      // Ejecutar la creación de Tablas
      await this.database.executeSql(this.tablaPublicaciones, []);
      await this.database.executeSql(this.tablaUsuarios, []);
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaCarrito, []);
      await this.database.executeSql(this.tablaVentas, []);
      await this.database.executeSql(this.tablaCategorias, []);
      await this.database.executeSql(this.tablaItemsCarrito, []);

      // Ejecutar los insert por defecto en el caso que existan
      await this.database.executeSql(this.registroUsuarioAdmin, []);
      await this.database.executeSql(this.registroPublicacion, []);
      await this.database.executeSql(this.registroPublicacionCargoCorteiz, []);
      await this.database.executeSql(this.registroPublicacionChaquetaAmiri, []);
      await this.database.executeSql(this.registroPublicacionJeansAmiri, []);//Aaaaaaaaaaa
      await this.database.executeSql(this.registroPublicacionJeansFn, []);
      await this.database.executeSql(this.registroPublicacionJeansLevis, []);//aaaaaaaaaaaaa
      await this.database.executeSql(this.registroPublicacionJeansAmericanEagle, []);
      await this.database.executeSql(this.registroPublicacionJeansSkinny, []);
      await this.database.executeSql(this.registroPublicacionPoleraBasica, []);
      await this.database.executeSql(this.registroPublicacionPoleraColo, []);
      await this.database.executeSql(this.registroPublicacionPoleraUchile, []);
      await this.database.executeSql(this.registroPublicacionPoleraPalm, []);
      await this.database.executeSql(this.registroPublicacionZapatillaCampus, []);
      await this.database.executeSql(this.registroPublicacionZapatillaAirForce, []);
      await this.database.executeSql(this.registroPublicacionZapatillaBlackCat, []);
      await this.database.executeSql(this.registroPublicacionZapatillaRetro3, []);
      await this.database.executeSql(this.registroPublicacionZapatillaRetro1, []);
      await this.database.executeSql(this.registroPublicacionZapatillaVaporMax, []);
      await this.database.executeSql(this.registroPublicacionZapatillaVestir, []);
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
      this.productosCarritoSubject.next(items);
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

  getProductosCarrito(usuarioId: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT p.producto_id, p.titulo, p.descripcion, p.precio, p.foto_publicacion, c.cantidad
        FROM Carrito c
        JOIN Publicaciones p ON c.producto_id = p.producto_id
        WHERE c.usuario_id = ? AND c.estado = 'pendiente'
      `;
      this.database.executeSql(sql, [usuarioId]).then((res) => {
        const productos = [];
        for (let i = 0; i < res.rows.length; i++) {
          productos.push(res.rows.item(i));
        }
        resolve(productos);
        this.productosCarritoSubject.next(productos);
      }).catch(reject);
    });
  }

  async obtenerCarritoActual() {
    const storedUserId = await this.storage.getItem('usuario_id');
      console.log('ID de usuario almacenado:', storedUserId);

    const sql = `SELECT * FROM Carrito WHERE usuario_id = ? AND estado = 'pendiente'`;
    this.database.executeSql(sql, [storedUserId]).then((res) => {
      let productos = [];
      for (let i = 0; i < res.rows.length; i++) {
        productos.push(res.rows.item(i));
      }
      this.productosCarritoSubject.next(productos);  
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

  async eliminarProductoDelCarrito(producto_id: number) {
    try {
      const storedUserId = await this.storage.getItem('usuario_id');
      const query = `DELETE FROM Carrito WHERE usuario_id = ? AND producto_id = ?`;
      await this.database.executeSql(query, [storedUserId, producto_id]);
      this.obtenerCarritoActual(); // Vuelve a obtener el carrito actualizado
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  }

  
  // Vaciar el carrito
  async vaciarCarrito() {
    try {
      const storedUserId = await this.storage.getItem('usuario_id');
      const query = `DELETE FROM Carrito WHERE usuario_id = ?`;
      await this.database.executeSql(query, [storedUserId]);
      this.obtenerCarritoActual();
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
    return this.database.executeSql('UPDATE Publicaciones SET titulo = ?, descripcion = ?, talla = ?, ubicacion = ?, color = ?, precio = ? WHERE producto_id = ?', [titulo, descripcion, talla, ubicacion, color, precio, id]).then(res => {
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

  async insertarUsuario(nombre: string, email: string, telefono: number, contrasena: string, imagen_usu: string, estado: number = 1, preguntaSeguridad: string, respuestaSeguridad: string,) { // estado por defecto es 1
    try {
      // Insertar usuario en la base de datos
      const res = await this.database.executeSql(
        'INSERT INTO Usuarios (nombre_usu, email_usu, telefono_usu, contrasena_usu, imagen_usu, rol_id, estado, pregunta_seguridad, respuesta_seguridad) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre, email, telefono, contrasena, imagen_usu, 1, estado, preguntaSeguridad, respuestaSeguridad]
      );
      if (res.insertId) {
        // Guardar los datos del usuario recién creado en Native Storage
        const usuario = {
          iduser: res.insertId, // res.insertId devuelve el ID del usuario insertado
          nombre,
          email,
          telefono,
          preguntaSeguridad,
          respuestaSeguridad
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

  insertarProductoCarrito(usuarioId: number, productoId: number): Promise<void> {  
    return new Promise((resolve, reject) => {
      const checkSql = `SELECT * FROM Carrito WHERE usuario_id = ? AND producto_id = ? AND estado = 'pendiente'`;
      this.database.executeSql(checkSql, [usuarioId, productoId]).then((res) => {
        if (res.rows.length > 0) {
          const updateSql = `UPDATE Carrito SET cantidad = cantidad + 1 WHERE usuario_id = ? AND producto_id = ? AND estado = 'pendiente'`;
          this.database.executeSql(updateSql, [usuarioId, productoId]).then(() => {
            this.obtenerCarritoActual(); 
            this.seleccionarCarrito(); 
            resolve();  // No es necesario devolver nada, por eso 'void'
          }).catch(reject);
        } else {
          const insertSql = `INSERT INTO Carrito (usuario_id, producto_id, cantidad, estado) VALUES (?, ?, 1, 'pendiente')`;
          this.database.executeSql(insertSql, [usuarioId, productoId]).then(() => {
            this.obtenerCarritoActual();  
            this.seleccionarCarrito();
            resolve();  
          }).catch(reject);
        }
      }).catch(reject);
    });
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

  verificarCorreo(correo: string): Promise<{ correo: string } | null> {
    return this.database.executeSql('SELECT * FROM Usuarios WHERE email_usu = ?', [correo])
      .then(res => {
        if (res.rows.length > 0) {
          return { correo: res.rows.item(0).email_usu }; // Devuelve un objeto con el correo encontrado
        } else {
          return null; // Devuelve `null` si no se encuentra el correo
        }
      })
      .catch(e => {
        console.error('Error al verificar el correo:', e);
        return null; // Devuelve `null` en caso de error
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
