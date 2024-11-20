import { Component } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { NotificationService } from './services/notificaciones.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{
  constructor(
    private nativeStorage: NativeStorage,
    private notificationService: NotificationService,
    
  ) {}
}
