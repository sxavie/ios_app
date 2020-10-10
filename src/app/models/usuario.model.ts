import { environment } from '../../environments/environment'

const apiUrl = environment.apiUrl;

export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img: string,
        public uid: string,
    ) {}

    get userName(){
       return this.nombre;
    }

    get imageUrl( ){
        if (this.img) {
            let splitFormat = this.img.split('.');
            return `${ apiUrl }/images/users/${ splitFormat[0] }`
        }
    }   
}

