export class AncestralProvider {
    public ROTA_BASE: string = "https://dadosabertos.camara.leg.br/api/v2"
    public TODOS_PARTIDOS_END_POINT: string = "/partidos/?itens=100"
    public PARTIDO_END_POINT: string = "/partidos/{id}"
    public DEPUTADO_END_POINT: string = "/deputados/{id}"
    public PROJETOS_END_POINT: string = "/proposicoes"
    public DETALHE_PROJETOS_END_POINT: string = "/proposicoes/{id}"
    public TRAMITACAO_PROJETOS_END_POINT: string = "/proposicoes/{id}/tramitacoes"
    public ORGAOS_END_POINT: string = "/deputados/{id}/orgaos"
    public DESPESAS_END_POINT: string = "/deputados/{id}/despesas"

    constructor(){

    }
}