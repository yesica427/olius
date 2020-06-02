import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shortcuts',
  templateUrl: './shortcuts.component.html',
  styleUrls: ['./shortcuts.component.css']
})
export class ShortcutsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getShortcut(tipo: string, _id: string) {
    return `{"tipo":"${tipo}","_id":"${_id}"}`;
  }

  getShortcutGaleria() {
    return `{"tipo":"galeria","imagenes":["5e97ec1011dcbe2ff4645ceb","5e9e47e3ff8c3a228cd63606"]}`;
  }

  getShortcutEnlace() {
    return `{"tipo":"enlace","_id":"5e97ba717149473bacc8d0d6","titulo":"Enlace a imagen"}`;
  }

  getEnlaceBreadCrumb() {
    return `{"tipo":"breadcrumb","activo":"true"}`;
  }

  getShorcutLogin() {
    return `{"tipo":"login","activo":"true"}`;
  }

}
