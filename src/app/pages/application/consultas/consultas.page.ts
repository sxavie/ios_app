import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt'
import { UserserviceService } from 'src/app/services/userservice.service';

const helper = new JwtHelperService;

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.page.html',
  styleUrls: ['./consultas.page.scss'],
})
export class ConsultasPage implements OnInit {
  
  constructor(
    public userservice: UserserviceService,
    private router: Router
  ) { }

  ngOnInit() { }

  validarToken(){
    // let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTYwMjIxNTAzNSwiZXhwIjoxNjAyMjE4NjM1LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1jdGZkM0B0aWR1eC1lOWU1ZC5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLWN0ZmQzQHRpZHV4LWU5ZTVkLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoiVXZ0eTI3YzEyM3giLCJjbGFpbXMiOnsibm9tYnJlIjoieGF2aWVyIiwiZW1haWwiOiJ4YXZpZXIuaGVybmFuZGV6QHZhc3N0ZXIuY29tIiwibnVtZXJvIjoiODEyNjM4Nzc5OSIsImlzQWRtaW4iOnRydWUsInBhc3N3b3JkIjoiMTIzIn19.VMXTHFrjZJ39Qcpn1CXxkpTiW28JHWBdPJblL9l7I9lYdSamTLbw5ZP7pfyUjlU9uUjmMhBgR5Telxspi3lNLyGqZn6fNbjtMXMDu8oH4jvHAVF9MO9f8MgDbCuaB8wJho2xlZwcbQkFUMbdQxziqg_MM2Im4oYu9vNAcZC4tSqP01FnbISrk8nSY3udrkNLiAY_cFgOYEja6L7UK-7-9Sd2KSoxVQr4WHekGS2vOZ1CuiEg_WEAG9VTXd5O8be1fVsaK_pQ8nQ6yEk-YuakLsDba8izJvdpcFk3_QBs_8-GNvTvaoDIx3JqncYlc_fYE3Dc_57eqe_viX4ofocZCg'
    // this.afAuth.signInWithCustomToken( token )
    // .then(datas => {
    //   console.log( datas )
    // })

    // const token = localStorage.getItem('jwttoken')
    // const decodeToken = helper.decodeToken( token )
    // console.log( decodeToken )
  }

  logOut(){
    this.userservice.logout();
    this.router.navigate(['/'])
  }

}
