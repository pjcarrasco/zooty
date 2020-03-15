import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  public form: FormGroup;
  public submitted: boolean;

  constructor(
    private _fb: FormBuilder,
    private _navCtrl: NavController,
    private _usuario: UsuarioService,
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm(){
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
    });
  }

  modificarDatosUsuario(){
    this.submitted = true;
    if(this.form.valid){
      this._usuario.modificarDatosUsuario(this.form.value).subscribe(
        (response: any) => {
          //Cambiar por toast
          alert('tus datos han sido guardados');
        }, (error) => {
          console.log('No se ha podido realizar el registro');
        }
      );
    }
  }

  controlError(control: string, error: string){
    return this.form.get(control).hasError(error);
  }

  goHome(){
    this._navCtrl.navigateBack('home');
  }

}
