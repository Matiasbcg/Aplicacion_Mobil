import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  usuario: string | null = null;
  formularioHome: FormGroup;
  
  @ViewChild('nombreInput') nombreInput: ElementRef | null = null;
  @ViewChild('apellidoInput') apellidoInput: ElementRef | null = null;

  constructor(private fb: FormBuilder, private alertController: AlertController) { 
    this.formularioHome = this.fb.group({
      nombre: [''],
      apellido: [''],
      nivelEducacion: [''],
      fechaNacimiento: ['']
    });
  }

  ngOnInit() {
    this.usuario = localStorage.getItem('usuario');
  }

  limpiarCampos() {
    this.formularioHome.reset();
    if (this.nombreInput) {
      this.applyAnimation(this.nombreInput.nativeElement);
    }
    if (this.apellidoInput) {
      this.applyAnimation(this.apellidoInput.nativeElement);
    }
  }

  async mostrarInformacion() {
    const nombre = this.formularioHome.get('nombre')?.value;
    const apellido = this.formularioHome.get('apellido')?.value;

    const alert = await this.alertController.create({
      header: 'Información',
      message: `Nombre: ${nombre}, Apellido: ${apellido}`,
      buttons: ['Cerrar']
    });

    await alert.present();
  }

  applyAnimation(element: any) {
    if (element) {
      element.style.animation = 'moveRight 1s forwards';
      element.addEventListener('animationend', () => {
        element.style.animation = '';
      });
    }
  }
}





