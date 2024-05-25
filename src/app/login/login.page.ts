import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder, private router: Router) { 
    this.formularioLogin = this.fb.group({
      usuario: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(8),
          Validators.pattern('^[a-zA-Z0-9]+$') 
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{4}$') 
        ]
      ]
    });
  }

  navigateToHome() {
    if (this.formularioLogin.valid) {
      // Guardar datos en localStorage
      const usuario = this.formularioLogin.get('usuario')?.value;
      const password = this.formularioLogin.get('password')?.value;

      if (usuario && password) {
        localStorage.setItem('usuario', usuario);
        localStorage.setItem('password', password);
      }

      this.router.navigate(['/home']);
    } else {
      console.log('Formulario inválido');
    }
  }

  ngOnInit() {
  }

}


