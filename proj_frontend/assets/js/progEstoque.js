const btnLogout = document.getElementById('btnLogout')
const btn = document.getElementById('btn')
let res = document.getElementById('res')

window.addEventListener('DOMContentLoaded', () =>{

    let resNomeUser = document.getElementById('resNomeUser')
    let resTipo = document.getElementById('resTipo')

    const nomeUser = sessionStorage.getItem('nome')
    const tipo = sessionStorage.getItem('tipo')

    resNomeUser.innerHTML = nomeUser
    resTipo.innerHTML = tipo
})

btn.addEventListener('click', (e) =>{
    e.preventDefault()

    let idProduto = document.getElementById('idProduto').value
    let movimentacao = document.getElementById('movimentacao').value
    let tipo = document.getElementById('tipo').value

    if(!idProduto || !movimentacao || !tipo){

        res.innerHTML = `Preencha todos os campos para prosseguir.`
        res.style.color = 'red'
        res.style.textAlign = 'center'
        return
    }

    const valores = {
        movimentacao: parseInt(movimentacao),
        tipo: tipo
    }

    console.log(valores)

    const token = sessionStorage.getItem('token')
    fetch(`http://localhost:3000/estoque/${idProduto}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
    .then(dados =>{

        console.log(dados)
        res.innerHTML = ''
        res.innerHTML += dados.message
        res.style.textAlign = 'center'
        
    })
    .catch((err) =>{

        console.error('Erro ao atualizar estoque: ', err)
        res.innerHTML = 'Erro ao atualizar estoque: ' + err.message
        res.style.color = 'red'
        res.style.textAlign = 'center'
    })
})

btnLogout.addEventListener('click', () =>{

    sessionStorage.clear()
    location.href = '../index.html'
})