let solicitacoes = JSON.parse(localStorage.getItem("solicitacoes")) || [];

const formulario = document.getElementById("formSolicitacao");
const lista = document.getElementById("listaSolicitacoes");
const pesquisa = document.getElementById("pesquisa");

function salvarDados() {
    localStorage.setItem("solicitacoes", JSON.stringify(solicitacoes));
}

function atualizarIndicadores() {
    document.getElementById("total").textContent = solicitacoes.length;

    document.getElementById("alta").textContent =
        solicitacoes.filter(item => item.prioridade === "Alta").length;

    document.getElementById("pendentes").textContent =
        solicitacoes.filter(item => item.status === "Pendente").length;
}

function mostrarSolicitacoes(filtro = "") {
    lista.innerHTML = "";

    const resultado = solicitacoes.filter(item =>
        item.titulo.toLowerCase().includes(filtro.toLowerCase())
    );

    if (resultado.length === 0) {
        lista.innerHTML = "<p>Nenhuma solicitação encontrada.</p>";
    }

    resultado.forEach(item => {
        const card = document.createElement("div");

        card.style.padding = "15px";
        card.style.border = "1px solid #ddd";
        card.style.borderRadius = "8px";
        card.style.marginBottom = "10px";

        const titulo = document.createElement("h3");
        titulo.textContent = item.titulo;

        const descricao = document.createElement("p");
        descricao.textContent = item.descricao;

        const prioridade = document.createElement("p");
        prioridade.textContent = "Prioridade: " + item.prioridade;

        const status = document.createElement("p");
        status.textContent = "Status: " + item.status;

        const botao = document.createElement("button");
        botao.textContent = "Concluir";

        botao.addEventListener("click", () => {
            item.status = "Concluída";
            salvarDados();
            mostrarSolicitacoes(pesquisa.value);
            atualizarIndicadores();
        });

        card.append(titulo, descricao, prioridade, status, botao);
        lista.appendChild(card);
    });
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const novaSolicitacao = {
        titulo: document.getElementById("titulo").value,
        descricao: document.getElementById("descricao").value,
        prioridade: document.getElementById("prioridade").value,
        status: "Pendente"
    };

    solicitacoes.push(novaSolicitacao);

    salvarDados();
    mostrarSolicitacoes();
    atualizarIndicadores();

    formulario.reset();
});

pesquisa.addEventListener("input", function() {
    mostrarSolicitacoes(pesquisa.value);
});

mostrarSolicitacoes();
atualizarIndicadores();