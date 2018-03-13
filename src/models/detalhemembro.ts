import { StatusMembro } from './statusmembro';
export class DetalheMembro{
    public id: string;
    public uri: string;
    public nomeCivil: string;
    public ultimoStatus: StatusMembro;
    public cpf: string;
    public sexo: string;
    public urlWebsite: string;
    public redeSocial: string[];
    public dataNascimento: Date;
    public dataFalecimento: Date
    public ufNascimento: string;
    public municipioNascimento: string;
    public escolaridade: string;

    constructor(){

    }
}