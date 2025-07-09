//Jogo de Adivinhação
function executarJogoAdivinhacao() {
    document.querySelector('h1').innerHTML = 'Bem-vindo!';
    document.querySelector('p').innerHTML = 'Clique em um botão abaixo';

    alert('Seja bem-vindo ao nosso jogo!');

    let numeroSecreto = 5;
    
    let chute;
    let tentativas = 0;

    while (chute != numeroSecreto) {
        chute = parseInt(prompt('Escolha um número entre 1 e 10'));
        tentativas++;

        if (chute == numeroSecreto) {
            alert(`Parabéns! Você acertou o número secreto ${numeroSecreto} na tentativa ${tentativas}.`);
        } else if (chute > numeroSecreto) {
            alert(`O número secreto é menor que ${chute}. Tente novamente.`);
        } else {
            alert(`O número secreto é maior que ${chute}. Tente novamente.`);
        }
    }
}

//Calcular Média
function calcularMediaNumeros() {
    // Restaurar título e parágrafo principal
    document.querySelector('h1').innerHTML = 'Bem-vindo!';
    document.querySelector('p').innerHTML = 'Clique em um botão abaixo';

    alert("Bem-vindo ao Jogo da Média!");

    let quantidade = prompt("Quantos números você quer digitar?");
    quantidade = Number(quantidade);

    if (quantidade <= 0 || quantidade === null || quantidade === "" || typeof quantidade !== "number" || isNaN(quantidade)) {
        alert("Quantidade inválida. Tente novamente com um número maior que zero.");
    } else {
        let soma = 0;

        for (let i = 1; i <= quantidade; i++) {
            let entrada = prompt(`Digite o ${i}º número:`);
            let numero = Number(entrada);

            if (entrada.trim() === "" || entrada === null || isNaN(numero)) {
                alert("Valor inválido. Digite um número.");
                i--; // repetir a rodada
                continue;
            }

            soma += numero;
        }

        let media = soma / quantidade;

        alert(`A média calculada entre os ${quantidade} números digitados é: ${media.toFixed(2)}`);
    }
}

//Jogo de Soma
function executarJogoDeSoma() {
    let titulo = document.querySelector('h1'); 
    if (titulo) {
        titulo.innerHTML = 'Jogo do número secreto';
    }
    
    let conteudo = document.querySelector('p');
    if (conteudo) {
        conteudo.innerHTML = 'Vamos jogar para esquentar!';
    }

    let num1 = parseInt(prompt("Digite o primeiro número inteiro:"));
    let num2 = parseInt(prompt("Digite o segundo número inteiro:"));

    let resultado = num1 + num2;
    alert("A soma dos números é: " + resultado);
}
