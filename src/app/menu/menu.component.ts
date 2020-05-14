import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms'
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public contentCSS = `p{color:black;}`;


  constructor() { }
  
  ngOnInit(): void {
  }




openMymodal() {
    let myDialog:any = <any>document.getElementById("myModal");
    
    myDialog.showModal();
}


menuForm = new FormGroup({
  nombreMenu: new FormControl("", [
    Validators.required,
    Validators.minLength(5),
  ]),
  opciones: new FormControl("", [
    Validators.required,
    Validators.minLength(5),
  ]),
  enlaces: new FormControl("", [
    Validators.required,
    Validators.minLength(5),
  ]),
});


get nombreMenu() {
  return this.menuForm.get("nombreMenu");
}

get opciones() {
  return this.menuForm.get("opciones");
}


get enlaces() {
  return this.menuForm.get("enlaces");
}


}
