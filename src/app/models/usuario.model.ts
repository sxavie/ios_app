import { environment } from '../../environments/environment'

const apiUrl = environment.apiUrl;

export class Usuario {

    constructor(
        public _id: string,
        public name: string,
        public email: string,
        public password: string, 
        public dateCreated: string,    
        public userType: string, 
        public birthday?: string,
        public gender?: string,
        public filename?: string,
        public mobile?: string, 
        public bloodType?: string, 
        public height?: string,
        public weight?: string,
        public paymentID?: string, 
        public terms?: boolean, 
        public verified?: boolean, 
        public verificationCode?: boolean, 
        public active?: boolean,
        public firebaseToken?: string, 
        public isOrder?: string,
        public skills?: [],
        public allergies?: [], 
        public diseases?: [], 
        public family?: [], 
    ) {}

    imprimirUsuario(){
        console.log( this.name );
    }

    get imageUrl(){
        if (this.filename) {
            let splitFormat = this.filename.split('.');
            return `${ apiUrl }/images/users/${ splitFormat[0] }`
        } else {
            return 'https://cdns.iconmonstr.com/wp-content/assets/preview/2018/240/iconmonstr-user-circle-thin.png'
        }
    }   
}

