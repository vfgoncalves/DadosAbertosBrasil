import { DetalhePartido } from './detalhepartido';
export class Partido {
    public id: string = null;
    public sigla: string = null;
    public nome: string = null;
    public uri: string = null;
    public status: DetalhePartido = null;
    public urlLogo: string = null;
    public urlWebSite: string = null;
    public urlFacebook: string = null;

    constructor(){
    }
}