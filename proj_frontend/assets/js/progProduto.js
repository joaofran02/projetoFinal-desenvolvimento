const btnLogout = document.getElementById('btnLogout')
let resProdutos = document.getElementById('produtos')
let produtos = []

window.addEventListener('DOMContentLoaded', () =>{

    let resNomeUser = document.getElementById('resNomeUser')
    let resTipo = document.getElementById('resTipo')

    const nomeUser = sessionStorage.getItem('nome')
    const tipo = sessionStorage.getItem('tipo')

    resNomeUser.innerHTML = nomeUser
    resTipo.innerHTML = tipo

    const token = sessionStorage.getItem('token')
    fetch(`http://localhost:3000/produto`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(resp => resp.json())
    .then(dados =>{

        resProdutos.innerHTML = ''
        dados.forEach(dad =>{

            const quantidadeEstoque = dad.estoqueProduto ? dad.estoqueProduto.quantidade : 0

            resProdutos.innerHTML +=
            `
            <article class="produto">

                <figure>

                    <img src="${dad.imagem_url}">
                    <p class="stack-sans-text-textWhite">Código de produto: ${dad.codProduto}<br>Nome: ${dad.nome}<br>Descrição: ${dad.descricao}<br>Modelo: ${dad.modelo}<br>Preço: ${dad.preco}<br>Quantidade em estoque: ${quantidadeEstoque}<br>Está ativo: ${dad.ativo}</p>

                </figure>
            </article>
            `

        })
    })
})

btnLogout.addEventListener('click', () =>{
    
    sessionStorage.clear()
    location.href = '../index.html' 
})  