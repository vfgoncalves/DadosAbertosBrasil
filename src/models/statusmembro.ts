import { GabineteMembro } from "./gabineremembro";

export class StatusMembro{
    public id: string;
    public uri: string;
    public nome: string;
    public siglaPartido: string;
    public uriPartido: string;
    public siglaUf: string;
    public idLegislatura: string;
    public urlFoto: string;
    public data: string;
    public nomeEleitoral: string;
    public gabinete: GabineteMembro;
    public situacao: string;
    public condicaoEleitoral: string;
    public descricaoStatus: string; 

    constructor(){

    }
}