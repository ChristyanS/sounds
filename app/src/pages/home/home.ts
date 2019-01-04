import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NativeAudio} from "@ionic-native/native-audio";
import {StreamingMedia} from '@ionic-native/streaming-media'
import {StreamingAudioOptions} from "@ionic-native/streaming-media";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private onSuccess: any;
  private onError: any;

  constructor(public navCtrl: NavController, private nativeAudio: NativeAudio, public streamingMedia: StreamingMedia ) {

  }

  play() {
    this.nativeAudio.preloadSimple('naruto', 'src/assets/sounds/narutoSound.mp3').then(this.onSuccess, this.onError)
    this.nativeAudio.play('naruto',()=>console.log('tururu tocando'))

  }
  play2(){
    console.log('dsa')
    let options: StreamingAudioOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
    };
    this.streamingMedia.playAudio('src/assets/sounds/narutoSound.mp3', options)
  }
}
