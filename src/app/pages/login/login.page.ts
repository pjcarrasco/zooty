import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  providers: [UsuarioService, FormBuilder]
})
export class LoginPage implements OnInit {

  public form: FormGroup;
  public submitted: boolean;

  constructor(
    private _fb: FormBuilder,
    private _navCtrl: NavController,
    private _usuario: UsuarioService,
    private _auth: AuthService,
    private _storage: StorageService
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm(){
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  doLogin(){
    console.log('doLogin');
    this.submitted = true;
    if(this.form.valid){
      this._usuario.login(this.form.value).subscribe(
        (response: any) => {
          this._storage.guardarUsuario({token: response.token});
          this._auth.setLogged(true, response.token);
          this.goHome();
        }, (error) => {
          console.log('No se ha podido realizar el login');
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

  goRegistro(){
    this._navCtrl.navigateForward('registro');
  }

  goHome(){
    this._navCtrl.navigateForward('home');
  }

  changeRate(event){
    console.log(event);
  }

}
