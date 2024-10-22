import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  login : boolean = false
  usuario = '';

  constructor() { }

  login_user(user: string, password: string) {
    if (user == 'luz' && password == '2345' || user == 'rod' && password == '1234') {
      this.login = true;
      this.usuario = user;
    } else {
      this.login = false;
    }
  }
    logout_user() {
      this.login = false;
    }
  
    isLogged() {
      return this.login;
    }
  }

