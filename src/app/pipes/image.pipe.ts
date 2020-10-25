import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base = environment.apiUrl;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, tipo: 'user'|'medicine'): string {

    if( img === null ) {
      return 'https://cdns.iconmonstr.com/wp-content/assets/preview/2018/240/iconmonstr-user-circle-thin.png';
    }else{
      let splitF = img.split('.');
      return  `${ base }/images/users/${ splitF[0] }`
    }
  }

}
