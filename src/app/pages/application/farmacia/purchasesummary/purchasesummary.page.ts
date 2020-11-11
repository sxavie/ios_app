import { Component, OnInit } from '@angular/core';

declare var Peer: any;

@Component({
  selector: 'app-purchasesummary',
  templateUrl: './purchasesummary.page.html',
  styleUrls: ['./purchasesummary.page.scss'],
})
export class PurchasesummaryPage implements OnInit {

localVideo:any;
remoteVideo:any;

public peer;
public localStream;
public idToCall = 'us-tdx-02'

constructor() { }

  ngOnInit() {

    // this.localVideo.style.opacity = '0'
    // this.remoteVideo.style.opacity = '0'

    // this.localVideo.onplaying = () => { this.localVideo.style.opacity = '1' }
    // this.remoteVideo.onplaying = () => { this.remoteVideo.style.opacity = '1' }

    this.localVideo = document.getElementById("local-video")
    this.remoteVideo = document.getElementById("remote-video")

    this.init('xd');

  }

  init(userId) {
    this.peer = new Peer(userId, {
        host: '51.79.99.170',
        port: 3091,
        path: '/videocall'
    })

    this.peer.on('open', ( id ) => {
        console.log('my_id: ',  id)
    })

    this.listen();

    
  }

  listen(){

    this.peer.on('call', (call) => {

      navigator.getUserMedia({
        audio: true,
        video: true,
      }, (stream) => {
        this.localVideo.srcObject = stream;
        this.localStream = stream

        call.answer(stream)
        call.on('stream', (remoteStream) => {
          this.remoteVideo.srcObject = remoteStream;
          this.remoteVideo.className = 'primary-video',
          this.localVideo.className = 'secondary-video'
        })
      }, ( err )=>
      console.log( err ))

    })
  }

  startCall(  ){

    if (this.idToCall === '') return false;

    console.log( 'calling', this.idToCall )

    navigator.getUserMedia({
      audio:true,
      video: true
    }, (stream) => {
      this.localVideo.srcObject = stream;
      this.localStream = stream

      const call = this.peer.call( this.idToCall, stream)
      call.on('stream', (remoteStream) => {
        this.remoteVideo.srcObject = remoteStream;

        this.remoteVideo.className = 'primary-video';
        this.localVideo = 'secondary-video';
      })

    }, (err)=>console.log(err))

  }

  toggleVideo(b){
    if( b == 'true' ){
      this.localStream.getVideoTrack()[0].enabled = true;
    }else {
      this.localStream.getVideoTrack()[0].enabled = false;
    }
  }

  toggleAudio(b){
    if( b == 'true') {
      this.localStream.getAudioTracks()[0].enabled = true;
    }else {
      this.localStream.getAudioTracks()[0].enabled = false;
    }
  }



}
