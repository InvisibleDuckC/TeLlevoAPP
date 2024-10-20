import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-chofer',
  templateUrl: './chofer.page.html',
  styleUrls: ['./chofer.page.scss'],
})
export class ChoferPage implements OnInit {
 
  formularioVisible: string = '';

  constructor() { }

  mostrarFormulario(tipo: string) {
  this.formularioVisible = tipo;
  }
  
  ngOnInit() {
  }

}
