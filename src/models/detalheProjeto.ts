import { StatusProjeto } from "./statusProjeto";

export class DetalheProjeto {
    id: string;
    uri: string;
    siglaTipo: string;
    idTipo: string;
    numero: string;
    ano: string;
    ementa: string;
    dataApresentacao: string;
    uriOrgaoNumerador: string;
    uriUltimoRelator: string;
    statusProposicao: StatusProjeto;
    tipoAutor: string;
    idTipoAutor: string;
    uriAutores: string;
    descricaoTipo: string;
    ementaDetalhada: string;
    keywords: string;
    uriPropPrincipal: string;
    uriPropAnterior: string;
    uriPropPosterior: string;
    urlInteiroTeor: string;
    urnFinal: string;
    texto: string;
    justificativa: string;
    constructor() {

    }
}