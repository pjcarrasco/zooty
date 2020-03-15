import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  providers: [UsuarioService, FormBuilder]
})
export class RegistroPage implements OnInit {

  public form: FormGroup;
  public submitted: boolean;

  constructor(
    private _fb: FormBuilder,
    private _navCtrl: NavController,
    private _usuario: UsuarioService,
    private _auth: AuthService,
    private _storage: StorageService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(){
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      usuario:  ['', [Validators.required]],
    });
  }

  doRegistro(){
    this.submitted = true;
    if(this.form.valid){
      this._usuario.registro(this.form.value).subscribe(
        (response: any) => {
          this._storage.guardarUsuario({usuario: response.usuario, token: response.token});
          this._auth.setLogged(true, response.token);
          this.goUsuario();
        }, (error) => {
          console.log('No se ha podido realizar el registro');
        }
      );
    }
  }

  controlError(control: string, error: string){
    return this.form.get(control).hasError(error);
  }

  touched(control: string){
    this.form.get(control).touched;
  }

  goUsuario(){
    this._navCtrl.navigateForward('usuario');
  }

  goLogin(){
    this._navCtrl.navigateBack('');
  }

}
