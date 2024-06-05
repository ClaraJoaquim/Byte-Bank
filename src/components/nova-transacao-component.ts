import { Transacao } from "../types/Transacao.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import Conta from "../types/conta.js";
import SaldoComponent from "./saldo-component.js";
import ExtratoComponent from "./extrato-component.js";

const elementoFormulario = document.querySelector('.block-nova-transacao form') as HTMLFormElement;

elementoFormulario.addEventListener("submit", function() {
    try
    {
        event?.preventDefault();
        if (!elementoFormulario.checkValidity()) {
            alert("Por favor preencha todos os campos da transação!");
            return;
        }

        const inputTipoTransacao = document.querySelector('#tipoTransacao') as HTMLSelectElement;
        const inputValor = document.querySelector('#valor') as HTMLInputElement;
        const inputData = document.querySelector('#data') as HTMLInputElement;

        let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao;
        let valor: number = inputValor.valueAsNumber;
        let data: Date = new Date (inputData.value + "T00:00:00");

        const novaTransacao: Transacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data,
        }

        Conta.registrarTransacao(novaTransacao);

        alert("Transação realizada com Sucesso");

        SaldoComponent.atualizar();
        ExtratoComponent.atualizar();

        elementoFormulario.reset();
    }   
    catch(erro) {
        alert (erro.message);
    }
})
