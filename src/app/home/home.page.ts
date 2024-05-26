import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  usuario: string | null = null;
  password: string | null = null;
  formularioHome: FormGroup;
  
  @ViewChild('nombreInput') nombreInput: ElementRef | null = null;
  @ViewChild('apellidoInput') apellidoInput: ElementRef | null = null;

  constructor(
    private fb: FormBuilder, 
    private alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.formularioHome = this.fb.group({
      nombre: [''],
      apellido: [''],
      nivelEducacion: [''],
      fechaNacimiento: ['']
    });
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.usuario = navigation.extras.state['usuario'];
      this.password = navigation.extras.state['password'];
    }
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
      element.classList.add('move-right');
      element.addEventListener('animationend', () => {
        element.classList.remove('move-right');
      });
    }
  }
}







