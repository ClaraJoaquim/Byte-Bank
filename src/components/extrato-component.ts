import { FormatoData } from "../types/FormatoData.js";
import { GrupoTransacao } from "../types/GrupoTransacao.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import Conta from "../types/conta.js";
import { formatarData, formatarMoeda } from "../utils/formatters.js";

const elementoRegistroTransacoesExtrato: HTMLElement = document.querySelector(".extrato .registro-transacoes");

renderizarExtrato();
  
function renderizarExtrato(): void {
    const gruposTransacoes: GrupoTransacao[] = Conta.getGruposTransacoes();
    elementoRegistroTransacoesExtrato.textContent = "";
    let htmlRegistroTransacoes: string = "";


    for (let GrupoTransacao of gruposTransacoes){

        let htmlTransacaoItem: string = "";
        for (let transacao of GrupoTransacao.transacoes){
            if (transacao.tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO || transacao.tipoTransacao === TipoTransacao.PIX || transacao.tipoTransacao === TipoTransacao.TRANSFERENCIA){
                htmlTransacaoItem += `
                    <div class="transacao-item">
                    <div class="transacao-info">
                        <span class="tipo">${transacao.tipoTransacao}</span>
                        <strong class="valor corVermelho">${formatarMoeda(transacao.valor)}</strong>
                    </div>
                        <time class="data">${formatarData(transacao.data, FormatoData.DIA_MES)}</time>
                    </div>
                `;
            } else {
                htmlTransacaoItem += `
                    <div class="transacao-item">
                    <div class="transacao-info">
                        <span class="tipo">${transacao.tipoTransacao}</span>
                        <strong class="valor corVerde">${formatarMoeda(transacao.valor)}</strong>
                    </div>
                        <time class="data">${formatarData(transacao.data, FormatoData.DIA_MES)}</time>
                    </div>
                `;
            }
        }

        htmlRegistroTransacoes += `
            <div class="transacoes-group">
                <strong class="mes-group">${GrupoTransacao.label}</strong>
                ${htmlTransacaoItem}
            <div>
        `
    }

    if (htmlRegistroTransacoes === "") {
        htmlRegistroTransacoes = `
            <div>Não há transações registradas.<div>
        `;
    }

    elementoRegistroTransacoesExtrato.innerHTML = htmlRegistroTransacoes;

}

const ExtratoComponent = {
    atualizar(): void {
        renderizarExtrato();
    }
}

export default ExtratoComponent;