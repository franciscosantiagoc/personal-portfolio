import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Componente raíz de la aplicación
@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
