const btn = document.getElementById('btn')
const btnClear = document.getElementById('btnClear')
const btnLogout = document.getElementById('btnLogout')

let resProdutos = document.getElementById('produtos')
let produtoAll = []

btnLogout.addEventListener('click', () =>{
    
    sessionStorage.clear()
    location.href = '../index.html' 
})

window.addEventListener('DOMContentLoaded', () =>{

    let resNomeUser = document.getElementById('resNomeUser')
    let resTipo = document.getElementById('resTipo')

    const nomeUser = sessionStorage.getItem('nome')
    const tipo = sessionStorage.getItem('tipo')

    resNomeUser.innerHTML = nomeUser
    resTipo.innerHTML = tipo

    const token = sessionStorage.getItem('token')
    fetch(`https://projbackend-production.up.railway.app/produto`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(resp => resp.json())
    .then(dados =>{

        produtoAll = dados

        resProdutos.innerHTML = ''
        dados.forEach(dad =>{
            
            if(dad.ativo === true){

                if(!dad.estoqueProduto.quantidade){

                    return 
                }

                resProdutos.innerHTML += 
                `
                <article class="produto">

                    <figure>

                        <img src="${dad.imagem_url}">
                        <p class="stack-sans-text-textWhite">Nome: ${dad.nome}<br>Descrição: ${dad.descricao}<br>Modelo: ${dad.modelo}<br>Preço: ${dad.preco}<br>Estoque: ${dad.estoqueProduto ? dad.estoqueProduto.quantidade : 0}<br></p>

                    </figure>
                    <div class="controle-produto">

                        <input type="number" min="1" max="${dad.estoqueProduto ? dad.estoqueProduto.quantidade : 0}" value="1" id="qtd-${dad.codProduto}">
                        <button onclick="add(${dad.codProduto})">Adicionar</button>

                    </div>
                </article>
                    `
            }
        })
    })
    .catch((err) =>{

        console.error('Erro ao adicionar ao carrinho:', err)
        res.innerHTML = 'Erro ao adicionar ao carrinho.'
        res.style.color = 'red'
        res.style.textAlign = 'center'
        setTimeout(() => {

            res.innerHTML = ''
        }, 1500)
    })
})

function add(id) {

    // 1. Validação simples da quantidade
    let inputQtd = document.getElementById(`qtd-${id}`);
    let qtd = parseInt(inputQtd.value);
    if(!qtd || qtd < 1){

        alert("Por favor, selecione uma quantidade válida.");
        return;
    }

    // 2. Encontrar o produto na lista global (Correção do ID)
    // Note que usamos 'p.codProduto' para bater com o ID que veio do HTML
    let produto = produtoAll.find(p => p.codProduto === id);
    if(!produto){

        alert("Erro ao encontrar o produto.");
        console.error("Produto não encontrado no array produtos:", id);
        return;
    }

    const estoqueDisponivel = produto.estoqueProduto ? produto.estoqueProduto.quantidade : 0;

    // 3. Verificar se a quantidade excede o estoque
    if(qtd > estoqueDisponivel){

        alert("Quantidade excede o estoque disponível.");
        return;
    }

    // 3. Obter carrinho atual ou criar um vazio
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // 4. Lógica Inteligente: Verificar se já existe no carrinho
    // O findIndex retorna a posição do item ou -1 se não achar
    const index = carrinho.findIndex(item => item.id === id);

    if(index !== -1){

        // SE JÁ EXISTE: Verificar se a soma excede o estoque
        if(carrinho[index].qtd + qtd > estoqueDisponivel){

            alert("Quantidade total no carrinho excede o estoque disponível.");
            return;
        }

        // Apenas soma a quantidade
        carrinho[index].qtd += qtd;
        console.log(`Quantidade atualizada para o produto ${produto.nome}`);
    }else{

        // SE NÃO EXISTE: Adiciona o novo objeto
        carrinho.push({
            id: produto.codProduto,
            nome: produto.nome,
            qtd: qtd,
            preco: produto.preco,
            imagem: produto.imagem_url // Dica: Salve a imagem para mostrar no carrinho depois
        });
    }

    // 5. Salvar e Feedback
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(`${qtd} unidade(s) de "${produto.nome}" adicionada(s) ao carrinho!`);
    
    // Opcional: Reseta o input para 1
    inputQtd.value = "1"; 
}

