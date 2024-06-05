import { TipoTransacao } from "./TipoTransacao.js"

export type Transacao = {
    tipoTransacao: TipoTransacao,
    data: Date,
    valor: number,
}

export type ResumoTransacoes = {
    totalDepositos: number;
    totalTransferencias: number;
    totalPagamentosBoleto: number;
}