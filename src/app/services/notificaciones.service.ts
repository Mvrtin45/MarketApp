import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private mensajes = [
    '¡Descubre las nuevas tendencias en 2Market! 🌟',
    '¿Ya viste nuestros productos especiales? Visítanos en 2Market 💸',
    '¡Vuelve a 2Market y renueva tu estilo! 🔥',
    'El mejor estilo para ti está en 2Market 🔥'
  ];

  constructor(
    private platform: Platform,
    private toastController: ToastController
  ) {
    this.platform.ready().then(() => {
      this.solicitarPermisoNotificaciones();
      this.programarNotificaciones();
      this.configurarListeners();
    });
  }

  private async configurarListeners() {
    await LocalNotifications.addListener('localNotificationReceived', (notification: { body: any; }) => {
      this.mostrarToastEnApp(notification.body);
    });
  }

  private async mostrarToastEnApp(body: string) {
    const toast = await this.toastController.create({
      message: body,
      duration: 4000, // Se queda en pantalla por 4 segundos
      position: 'top',
    });
    toast.present();
  }

  private async programarNotificaciones() {
    try {
      const notificaciones = [];
  
      for (let i = 0; i < 10; i++) {
        notificaciones.push({
          title: '2Market',
          body: this.mensajes[i % this.mensajes.length],
          id: i + 1,
          schedule: {
            at: new Date(Date.now() + (1000 * 60 * 3 * (i + 1))) // Cada 3 minutos
          },
          allowWhileIdle: true,
          foreground: true
        });
      }
  
      await LocalNotifications.schedule({
        notifications: notificaciones
      });
    } catch (error) {
      console.error('Error al programar notificaciones:', error);
    }
  }  
  

  private async solicitarPermisoNotificaciones() {
    const result = await LocalNotifications.requestPermissions();
    if (result.display === 'granted') {
      console.log("Permiso concedido para mostrar notificaciones");
    } else {
      console.log("Permiso denegado para mostrar notificaciones");
    }
  }

}
