import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { FooterComponent } from './components/footer/footer';

// Componente raíz de la aplicación
@Component({
  imports: [Header, RouterOutlet, FooterComponent],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
