import { Component, OnDestroy, OnInit } from '@angular/core';
import Peer, { PeerJSOption } from 'peerjs'

interface Messenger{
  source: string,
  msg: string;
}


@Component({
  selector: 'app-purchasechat',
  templateUrl: './purchasechat.page.html',
  styleUrls: ['./purchasechat.page.scss'],
})


export class PurchasechatPage implements OnInit, OnDestroy {


  userId = localStorage.getItem('user-id');
  peer: Peer;
  PeerOptions: PeerJSOption = { debug: 3, host: '51.79.99.170', port: 3091  }
  
  // { pingInterval: 1000, debug:3 }

  messages:Messenger[] = [{source:'addressee', msg: 'Hola'},{source:'sender', msg: 'Buenos dias!'},];
  msg = '';


  //Video
  myId: 'uxxx20'
  callingid: 'uxxx21'
  myStream: MediaStream;
  myVideo: any;
  partnerVideo: any;

  
  
newpeerid = ''

  constructor() { }

  ngOnDestroy() {

    console.log( 'peer destroy()')
    this.peer.destroy();
  }

  ngOnInit() {

    // let options = { pingInterval: 1000, debug:3 }
    // this.peer = new Peer(this.myId, options);
    // this.peer.on('open', (id) => {
    //   console.log( 'my-id: ',id );
    // })
    // this.peer.on('error', (err) => {
    //   console.log( err )
    // })
    // this.peer.on('connection', (con) => {
    //   con.on('data', (data) => {
    //     console.log(data )
    //     this.messages.push({ source: 'addressee', msg: data })
    //   });
    // })

  }

  sendMessage(){
    this.peer.connect(this.callingid)
    this.peer.on('open', () => {
      
    })
  }
  
  async openCam(){

    this.myVideo = document.getElementById('myvideo');
    this.partnerVideo = document.getElementById('partnerVideo');

    try {
      this.getMedia();
    } catch (error) {
      console.log( error );
    };
    await this.createPeer(this.myId);
  }

  getMedia(){

    // navigator.mediaDevices.getUserMedia({audio:true, video:true}).then( function (media) {
    // })

    navigator.getUserMedia({audio:true, video:true}, (stream) => {
      
      this.myStream = stream;
      this.myVideo.srcObject = stream;
      
    }, (err) => {
      console.log( err)
    })

  }

  createPeer( userid: string ){

    console.log('creating peer')

    this.peer = new Peer( 'myId_007',this.PeerOptions )
    this.peer.on('open', (id) => {
      console.log('peer id created - ', id)
      this.newpeerid = id;
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

  videoCall(){
    console.log( 'videocall event' , this.msg )


    const call = this.peer.call(this.msg, this.myStream );
    call.on('stream', (stream) => {
      this.partnerVideo.srcObject = stream
    })
  }


}
