import { Component } from '@angular/core';
import { RouterService } from './router.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private routerService: RouterService) {
    routerService.getPreviousUrl();
  }
}
