export class AncestralProvider {
    public ROTA_BASE: string = "https://dadosabertos.camara.leg.br/api/v2/"
    public TODOS_PARTIDOS_END_POINT: string = "/partidos/?itens=100"
    public PARTIDO_END_POINT: string = "/partidos/{id}"
    public DEPUTADO_END_POINT: string = "/deputado/{id}"

    constructor(){

    }
}