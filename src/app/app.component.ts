import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatButtonToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent {
  title = 'hacker-news';

  constructor()
  {
    
  }

  
}
