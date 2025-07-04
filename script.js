function loadCss(filename) {
    const head = document.head;
    document.querySelectorAll('link[data-example-css]').forEach(link => link.remove());
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = filename; 
    link.setAttribute('data-example-css', true); 
    head.appendChild(link);
}

// LÓGICA DO JOGO DO NÚMERO SECRETO
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto;
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let elemento = document.querySelector(tag);
    if (elemento) {
        elemento.innerHTML = texto;
        if (typeof responsiveVoice !== 'undefined') {
            responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
        }
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    if (listaDeNumerosSorteados.length === numeroLimite) {
        listaDeNumerosSorteados = []; 
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio(); 
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    let inputChute = document.querySelector('.container__input'); 
    if (inputChute) {
        inputChute.value = '';
    }
}

window.verificarChute = function() { 
    const inputChute = document.querySelector('.container__input');
    if (!inputChute) return; 

    let chute = inputChute.value;
    
    if (parseInt(chute) === numeroSecreto) {
        exibirTextoNaTela('h1', 'Parabéns, você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p.texto__paragrafo', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (parseInt(chute) > numeroSecreto) {
            exibirTextoNaTela('p.texto__paragrafo', 'O número secreto é menor!');
        } else {
            exibirTextoNaTela('p.texto__paragrafo', 'O número secreto é maior!');
        }
        tentativas++;
        limparCampo();
    }
}

window.reiniciarJogo = function() { 
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirTextoNaTela('h1', 'Adivinhe o <span class="container__texto-azul">número secreto</span>');
    exibirTextoNaTela('p.texto__paragrafo', 'Escolha um número entre 1 a 10');
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

window.carregarJogoNumeroSecreto = function() {
    const appContainer = document.getElementById('app-container');
    if (!appContainer) return;

    appContainer.innerHTML = `
        <div class="container">
            <div class="container__conteudo">
                <div class="container__informacoes">
                    <div class="container__texto">
                        <h1>Adivinhe o <span class="container__texto-azul">numero secreto</span></h1>
                        <p class="texto__paragrafo">Escolha um número entre 1 a 10</p>
                    </div>
                    <input type="number" min="1" max="10" class="container__input">
                    <div class="chute container__botoes">
                        <button onclick="verificarChute()" class="container__botao">Chutar</button>
                        <button onclick="reiniciarJogo()" id="reiniciar" class="container__botao" disabled>Novo jogo</button>
                    </div>
                    <img src="pessoaolhando.png" alt="Pessoa olhando" class="container__imagem-pessoa" />
                </div>
                </div>
        </div>
    `;
    loadCss('jogo.css'); // Carrega o CSS específico do jogo

    // Inicializa o estado do jogo
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
}

// LÓGICA DO EXEMPLO DE LISTAS
let frutas = []; 

function atualizarLista() {
    const listaFrutasElem = document.getElementById('listaFrutas');
    if (listaFrutasElem) {
        listaFrutasElem.textContent = JSON.stringify(frutas);
    }
}

window.adicionarFruta = function() {
    const input = document.getElementById('frutaInput');
    const valor = input ? input.value.trim() : '';
    if (valor) {
        frutas.push(valor);
        if (input) input.value = '';
        atualizarLista();
    }
}

window.metodo = function(acao) {
    if (acao === 'push') {
        const fruta = prompt("Digite uma fruta para adicionar no final:");
        if (fruta) frutas.push(fruta);
    } else if (acao === 'pop') {
        frutas.pop();
    } else if (acao === 'shift') {
        frutas.shift();
    } else if (acao === 'unshift') {
        const fruta = prompt("Digite uma fruta para adicionar no início:");
        if (fruta) frutas.unshift(fruta);
    }
    atualizarLista();
}

window.verificarBanana = function() {
    const resultado = frutas.includes('banana') ? "🍌 Banana está no array!" : "🚫 Banana NÃO está no array.";
    const saidaElem = document.getElementById('saida');
    if (saidaElem) saidaElem.textContent = resultado;
}

window.mostrarIndex = function(fruta) { 
    const index = frutas.indexOf(fruta);
    const resultado = index !== -1 ? `A fruta '${fruta}' está na posição ${index}.` : `'${fruta}' não foi encontrada.`;
    const saidaElem = document.getElementById('saida');
    if (saidaElem) saidaElem.textContent = resultado;
}

window.mostrarJoin = function() { 
    const resultado = "join(', '): " + frutas.join(', ');
    const saidaElem = document.getElementById('saida');
    if (saidaElem) saidaElem.textContent = resultado;
}

window.mostrarSlice = function() { // Torna global
    const fatiado = frutas.slice(1, 3);
    const saidaElem = document.getElementById('saida');
    if (saidaElem) saidaElem.textContent = "slice(1, 3): " + JSON.stringify(fatiado);
}

window.fazerSplice = function() { 
    frutas.splice(1, 1);
    atualizarLista();
    const saidaElem = document.getElementById('saida');
    if (saidaElem) saidaElem.textContent = "splice(1, 1) aplicado.";
}

window.mapMaiusculas = function() { 
    const maiusculas = frutas.map(f => f.toUpperCase());
    const saidaElem = document.getElementById('saida');
    if (saidaElem) saidaElem.textContent = "map (toUpperCase): " + JSON.stringify(maiusculas);
}

window.filtrarGrandes = function() {
    const grandes = frutas.filter(f => f.length > 4);
    const saidaElem = document.getElementById('saida');
    if (saidaElem) saidaElem.textContent = "filter (length > 4): " + JSON.stringify( grandes);
}

window.carregarExemploListas = function() {
    const appContainer = document.getElementById('app-container');
    if (!appContainer) return;

    appContainer.innerHTML = `
        <h1>Manipulando Frutas</h1>
        <input type="text" id="frutaInput" placeholder="Digite uma fruta" />
        <button onclick="adicionarFruta()">Adicionar</button>
        <h2>Frutas:</h2>
        <p id="listaFrutas">[ ]</p>
        <div class="botoes">
            <button onclick="metodo('push')">Push</button>
            <button onclick="metodo('pop')">Pop</button>
            <button onclick="metodo('shift')">Shift</button>
            <button onclick="metodo('unshift')">Unshift</button>
            <button onclick="verificarBanana()">Includes('banana')</button>
            <button onclick="mostrarIndex('uva')">IndexOf('uva')</button>
            <button onclick="mostrarJoin()">Join(', ')</button>
            <button onclick="mostrarSlice()">Slice(1, 3)</button>
            <button onclick="fazerSplice()">Splice(1, 1)</button>
            <button onclick="mapMaiusculas()">Map (MAIÚSCULAS)</button>
            <button onclick="filtrarGrandes()">Filter (> 4 letras)</button>
        </div>
        <pre id="saida"></pre>
    `;
    loadCss('listas.css'); // Carrega o CSS específico das listas
    frutas = []; // Reinicializa o array de frutas para um novo uso
    atualizarLista(); 
}

// LÓGICA DO FORMULÁRIO
function configurarFormularioListener() {
    const formulario = document.getElementById("formulario");
    if (formulario) {
        formulario.addEventListener("submit", function (e) {
            e.preventDefault(); // Impede o envio padrão do formulário
            const valores = [];
            let todosPreenchidos = true;

            for (let i = 1; i <= 5; i++) {
                const inputValor = document.getElementById(`valor${i}`);
                if (inputValor) {
                    const valor = inputValor.value.trim();
                    if (valor === "") {
                        alert(`O campo Valor ${i} está vazio.`);
                        todosPreenchidos = false;
                        break; 
                    }
                    valores.push(valor);
                }
            }

            if (todosPreenchidos) {
                const conteudo = valores.map((v, i) => `Valor ${i + 1}: ${v}`).join("\n");
                const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "valores.txt";
                link.click();
                URL.revokeObjectURL(link.href);
            }
        });
    }
}

// Função para carregar o conteúdo do Formulário
window.carregarFormulario = function() {
    const appContainer = document.getElementById('app-container');
    if (!appContainer) return;

    appContainer.innerHTML = `
        <h1>Formulário de Valores</h1>
        <form id="formulario">
            <label for="valor1">Valor 1:</label>
            <input type="text" id="valor1" required><br>
            <label for="valor2">Valor 2:</label>
            <input type="text" id="valor2" required><br>
            <label for="valor3">Valor 3:</label>
            <input type="text" id="valor3" required><br>
            <label for="valor4">Valor 4:</label>
            <input type="text" id="valor4" required><br>
            <label for="valor5">Valor 5:</label>
            <input type="text" id="valor5" required><br>
            <button type="submit">Salvar em TXT</button>
        </form>
    `;
    loadCss('formulario.css'); // Carrega o CSS específico do formulário
    configurarFormularioListener(); 
}
document.addEventListener('DOMContentLoaded', () => {
});
