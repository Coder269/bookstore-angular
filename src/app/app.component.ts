import { Component } from '@angular/core';
import { User } from './Model/User';
import { AutheticationService } from './Service/authetication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'book-store-front';
}
