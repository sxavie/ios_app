import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
// import Peer from 'peerjs';

declare var Peer: any;

interface Messenger{
  source: string,
  msg: string;
}

@Component({
  selector: 'app-purchasetrack',
  templateUrl: './purchasetrack.page.html',
  styleUrls: ['./purchasetrack.page.scss'],
})


export class PurchasetrackPage implements OnInit, OnDestroy {

  // userId = localStorage.getItem('user-id')
  public peer;
  perOptions = { pingInterval: 1000, debug:3 }

  messages:Messenger[] = [];
  msg;

  //VIDEO

  myId: 'us-tdx-02'
  myStream: MediaStream;
  myVideo: any;
  partnerVideo: any;

  newpeerid = '';

  constructor() { }

  ngOnDestroy() {

    console.log( 'peer destroy()')
    this.peer.destroy();
  }

  ngOnInit() {

    // let options = { host: '51.79.99.170', port:3091, debug:3 }

    // this.peer = new Peer('uxxx21');

    // this.peer.on('open', (id) => {
    //   console.log( 'my-id: ',id );
    // })
    
    // this.peer.on('error', (err) => {
    //   console.log( err )
    // })
   
    // this.peer.on('connection', (con) => {

    //   con.on('data', (data) => {
    //     console.log(data)
    //     this.messages.push({ source: 'addressee', msg: data })
    //   });
      
    // });


    // setTimeout(() => {
    //   console.log( ' Abriendo camara')
    //   this.openCam(); 
    // }, 5000);


  }

  sendMessage(){

    let con = this.peer.connect('user001');

    con.on('open', () => {
      con.send(this.msg)
      this.messages.push({ source: 'sender', msg: this.msg })
      this.msg = ''
    })

  }



  async openCam(){
    this.myVideo = document.getElementById('myvideo');
    try {
      this.getMedia();
    } catch (error) {
      console.log( error );
    };
    await this.createPeer(this.myId);
  }

  getMedia(){
    navigator.getUserMedia({audio:true, video:true}, (stream) => {
      this.myStream = stream;
      this.myVideo.srcObject = stream;
    }, (err) => {
      console.log( err)
    })

  }

  createPeer( userid: string ){

    console.log('creating peer')

    this.peer = new Peer('us-tdx-02', {
      host: '51.79.99.170',
      port: 3091,
      path: '/videocall'
  })

    this.peer.on('open', (id) => {
      this.newpeerid = id
      console.log('peer id created - ', this.newpeerid)
      this.await();
    })

  }

  await(){
    this.peer.on('call', (call) => {
      call.answer(this.myStream);

      // call.on('stream', (stream) => {
      // })

    })
  }

}
