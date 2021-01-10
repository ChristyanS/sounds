import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {NativeAudio} from "@ionic-native/native-audio";
import {Sound} from "../../models/sound";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public sounds: Array<Sound> = new Array<Sound>();
  private currentSoundID: string;

  constructor(public nativeAudio: NativeAudio, public platform: Platform) {
    this.initialize()
  }

  /**
   * Filtra a coleção para mostrar músicas de acordo com uma string de busca
   * @param event
   */
  search(event: any) {
    this.initialize();
    const val = event.target.value;

    if (val && val.trim() != '') {
      this.sounds = this.sounds.filter((sound) => {
        return (sound.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  /**
   * Inicializa todas as músicas do sistema
   */
  initialize() {
    let sounds: Array<Sound> = new Array<Sound>();
    sounds.push(new Sound('0', 'assets/sounds/narutoSound.mp3', 'custom-naruto', 'Sadness And Sorrow'));
    sounds.push(new Sound('1', 'assets/sounds/xfiles.mp3', 'custom-xfiles', 'X Files'));
    sounds.push(new Sound('2', 'assets/sounds/ayrtonSenna.mp3', 'custom-formula1', 'Ayrton Senna'));
    sounds.push(new Sound('3', 'assets/sounds/turnDownForWhat.mp3', 'custom-glasses', 'Turn Down For What'));
    sounds.push(new Sound('4', 'assets/sounds/pracaNossa.mp3', 'custom-bench', 'A Praça É Nossa'));
    sounds.push(new Sound('5', 'assets/sounds/errou.mp3', 'custom-error', 'Faustão Errou'));
    sounds.push(new Sound('6', 'assets/sounds/marchaImperial.mp3', 'custom-darth-vader', 'Marcha Imperial'));
    sounds.push(new Sound('7', 'assets/sounds/globo.mp3', 'custom-globo', 'Plantão da Globo'));
    sounds.push(new Sound('8', 'assets/sounds/missaoImposivel.mp3', 'custom-spy', 'Missão Impossível '));
    sounds.push(new Sound('9', 'assets/sounds/faroeste.mp3', 'custom-sheriff', 'Faroeste'));
    sounds.push(new Sound('10', 'assets/sounds/pegandoFogoBicho.mp3', 'custom-fire', 'Faustão Ta Pegando Fogo'));
    sounds.push(new Sound('11', 'assets/sounds/aquiTemCoragem.mp3', 'custom-cowboy-hat', 'Aqui Tem Coragem'));
    sounds.push(new Sound('12', 'assets/sounds/harryPotter.mp3', 'custom-harry-potter-logo', 'Harry Potter Main Theme'));
    sounds.push(new Sound('13', 'assets/sounds/mais8000.mp3', 'custom-goku', 'Dragon Ball Mais De 8000'));
    sounds.push(new Sound('14', 'assets/sounds/R2D2Scream.mp3', 'custom-R2D2', 'R2D2 Scream'));
    sounds.push(new Sound('15', 'assets/sounds/rufemOsTambores.mp3', 'custom-drum', 'Rufém Os Tambores'));
    sounds.push(new Sound('16', 'assets/sounds/narutoRisingSpirit.mp3', 'custom-naruto', 'Naruto Rising Spirit'));
    sounds.push(new Sound('17', 'assets/sounds/titanic.mp3', 'custom-titanic', 'Titanic'));
    sounds.push(new Sound('18', 'assets/sounds/toBeContinued.mp3', 'custom-continued', 'To be Continued'));
    sounds.push(new Sound('19', 'assets/sounds/globoEsporte.mp3', 'custom-soccer', 'Esporte Espetacular'));
    sounds.push(new Sound('20', 'assets/sounds/berrante.mp3', 'custom-ox', 'Berrante'));
    sounds.push(new Sound('21', 'assets/sounds/differentStrokes.mp3', 'custom-sam', 'Different Strokes'));
    sounds.push(new Sound('22', 'assets/sounds/shootingStars.mp3', 'custom-star', 'Shooting Stars'));
    sounds.push(new Sound('23', 'assets/sounds/circus.mp3', 'custom-circus', 'Circo'));
    sounds.push(new Sound('24', 'assets/sounds/spongebobDisappointed.mp3', 'custom-sponge2', 'Bob Esponja Desapontado'));
    sounds.push(new Sound('25', 'assets/sounds/rockyTheme.mp3', 'custom-box', 'Rocky Theme'));
    sounds.push(new Sound('26', 'assets/sounds/eyeOfTheTiger.mp3', 'custom-tiger', 'Eye Of The Tiger'));
    sounds.push(new Sound('27', 'assets/sounds/aFewMomentsLater.mp3', 'custom-sponge', 'A Few Momments Later'));
    sounds.push(new Sound('28', 'assets/sounds/CeTaBrabo.mp3', 'custom-naruto', 'Cê Ta Brabo?'));
    sounds.push(new Sound('27', 'assets/sounds/PauNaMaquina.mp3', 'desktop', 'Pau na Maquina'));

    this.sounds = sounds
  }

  /**
   * Metodo que reproduz um audio aleatóriamente
   */
  async random() {
    let random = Math.floor(Math.random() * this.sounds.length);
    console.log('Audio aleatorio');
    await this.play(this.sounds[random].id, this.sounds[random].path);
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
      }, (error) => {
        console.log('Ocorreu algum erro ao reproduzir o audio' + error);
      });
      this.currentSoundID = id;
    } else {
      console.log('Essa funcionalidade está disponível apenas para dispositivos móveis');
    }

  }


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

