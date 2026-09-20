import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';

// Componente raíz de la aplicación
@Component({
  imports: [Header, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
