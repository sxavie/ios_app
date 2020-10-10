import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { tap } from 'rxjs/operators'
import { JwtHelperService } from '@auth0/angular-jwt'

import { LoginForm } from '../interfaces/interfaces';
import { Usuario } from '../models/usuario.model';

// variables
const helper = new JwtHelperService;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  public usuario: Usuario;

  constructor( 
    private http: HttpClient,
    // private router: Router // ROUTER 
    ) { }

  login( formData: LoginForm ) {

    return this.http.post(`${ apiUrl }/user/login`, formData)
      .pipe(tap( (resp: any)=>{  
        localStorage.setItem('jwttoken', resp.token)      
        this.decodeToken( resp.token );
      })
    );
  }

  decodeToken( token ) {
    const u = helper.decodeToken( token )

    // save to Usuario model
    // let usuario = new Usuario( u.name, u.email, '',  u.filename, u.id);
    // return usuario

    let splitImgFormat = u.filename.split('.');
    let imgPath = `${ apiUrl }/images/users/${ splitImgFormat[0] }`

    localStorage.setItem('user-name', u.name)
    localStorage.setItem('user-email', u.email)
    localStorage.setItem('user-filename', imgPath)
    localStorage.setItem('user-id', u.id)

  }
  
  logout() {
    localStorage.removeItem('jwttoken');
    localStorage.removeItem('user-name')
    localStorage.removeItem('user-email')
    localStorage.removeItem('user-filename')
    localStorage.removeItem('user-id')
  }

}
