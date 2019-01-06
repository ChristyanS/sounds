import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {NativeAudio} from "@ionic-native/native-audio";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private currentSoundID: string;

  constructor(public nativeAudio: NativeAudio, public platform: Platform) {

  }

  /**
   * Metodo que reproduz um audio
   * @param id identificador unico do audio
   * @param path caminho que está o audio
   */
  async play(id: string, path: string) {
    //só funciona em dispositivos móveis
    if (this.platform.is('cordova')) {
      //se existe um ID do som atual ele descarrega da memória
      if (!!this.currentSoundID) {
        await this.unload(this.currentSoundID);
      }
      await this.preload(id, path);
      await this.nativeAudio.play(id).then((success) => {
        console.log('Audio reproduzindo com sucesso ' + success);
      }), (error) => {
        console.log('Ocorreu algum erro ao reproduzir o audio' + error);
      };
      this.currentSoundID = id;
    } else {
      console.log('Essa funcionalidade está disponível apenas para dispositivos móveis');
    }

  }cl
  /**
   * Metodo que descarrega um audio da memoria
   * @param id identificador unico do audio
   */
  async unload(id: string) {
    await this.nativeAudio.unload(id).then((success) => {
      console.log('Descarregado com sucesso ' + success)
    }, (error) => {
      console.log('Erro ao descarregar ' + error)
    });
  }

  /**
   * Metodo que carrega um audio na memória do dispositivo
   * @param id identificador unico do audio
   * @param path path caminho que está o audio
   */
  async preload(id: string, path: string) {
    await this.nativeAudio.preloadSimple(id, path).then((success) => {
      console.log('Preload realizado com sucesso ' + success)

    }, (error) => {
      console.log('Erro ao realizar o preload ' + error)
    })
  }
}

