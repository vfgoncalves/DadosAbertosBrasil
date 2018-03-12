import { MembroPartido } from './membroPartido';
export class DetalhePartido{
    public data: Date = null;
    public idLegislatura: string = null;
    public situacao: string = null;
    public totalPosse: string = null;
    public totalMembros: string = null;
    public uriMembros: string = null;
    public lider: MembroPartido = null;
    public numeroEleitoral: string = null;    

    constructor(){

    }
}