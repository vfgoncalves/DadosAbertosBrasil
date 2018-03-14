import { LoadingController, Loading, AlertController, NavController } from 'ionic-angular';
export class AncestralPage {
    constructor(
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController
    ) {

    }

    public showLoading(mensagem: string): Loading {
        let loading: Loading = this.loadingCtrl.create({
            content: mensagem
        });
        loading.present();
        return loading;
    }
    public showAlert(message: string): void {
        this.alertCtrl.create({
            message: message,
            buttons: ['Ok']
        }).present();
    }

    public tratarErro(loading: Loading, navCtrl: NavController){
        loading.dismiss();
        navCtrl.pop();
        this.showAlert("Ocorreu um erro, tente novamente!");
    }
            
}