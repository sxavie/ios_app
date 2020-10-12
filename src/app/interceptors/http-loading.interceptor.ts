
import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { catchError, delay, finalize, map, retryWhen, take, tap } from 'rxjs/operators';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor( private loadingCtrl: LoadingController, 
        private toastCtrl: ToastController,
        private alterCtrl: AlertController ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        this.loadingCtrl.getTop().then(hasLoading => {
            if (!hasLoading) {
                this.loadingCtrl.create({
                    spinner: 'lines',
                    translucent: true
                }).then(loading => loading.present());
            }
        })
        
        return next.handle(request).pipe(
            retryWhen(err => {
                return err.pipe(
                    delay(1000),
                    // tap(() => {
                    //     this.showToast(retries)
                    // }),
                    take(3),
                    map(error => {
                        
                        throw error
                    })
                )
            }),
            catchError(err => {
                console.log('error: ', err);
                this.showToast(err.error.message)
                return EMPTY;
            }),
            finalize( () => {
                this.loadingCtrl.getTop().then(hasLoading => {
                    if (hasLoading) {
                        this.loadingCtrl.dismiss();
                    }
                })
            })
        );
    }

    async showToast(msg) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 1000
        });
        toast.present();
    }

    async presentAlert(msg){
        const alert = await this.alterCtrl.create({
            header: 'Oops',
            message: msg,
            buttons: ['OK']
        });
        await alert.present();
    }
}