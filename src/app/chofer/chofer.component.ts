import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chofer',
  templateUrl: './chofer.component.html',
  styleUrls: ['./chofer.component.scss'],
})
export class ChoferComponent  implements OnInit {

  choferForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    // Inicializa el formulario de chofer
    this.choferForm = this.fb.group({
      nombre: ['', Validators.required],
      licencia: ['', Validators.required]
    });
  }

  ngOnInit() {}

}
