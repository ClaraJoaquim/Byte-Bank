import Conta from "../types/conta.js";
import SaldoComponent from "./saldo-component.js";
import ExtratoComponent from "./extrato-component.js";
const elementoFormulario = document.querySelector('.block-nova-transacao form');
elementoFormulario.addEventListener("submit", function () {
    try {
        event?.preventDefault();
        if (!elementoFormulario.checkValidity()) {
            alert("Por favor preencha todos os campos da transação!");
            return;
        }
        const inputTipoTransacao = document.querySelector('#tipoTransacao');
        const inputValor = document.querySelector('#valor');
        const inputData = document.querySelector('#data');
        let tipoTransacao = inputTipoTransacao.value;
        let valor = inputValor.valueAsNumber;
        let data = new Date(inputData.value + "T00:00:00");
        const novaTransacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data,
        };
        Conta.registrarTransacao(novaTransacao);
        alert("Transação realizada com Sucesso");
        SaldoComponent.atualizar();
        ExtratoComponent.atualizar();
        elementoFormulario.reset();
    }
    catch (erro) {
        alert(erro.message);
    }
});
