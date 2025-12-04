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

    const codEndereco = document.getElementById('codEndereco').value

    const token = sessionStorage.getItem('token')
    fetch(`https://projbackend-production.up.railway.app/endereco/${codEndereco}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(resp =>{

        if(resp.status === 204){

            res.innerHTML = 'Endereço apagado com sucesso.'
            res.style.color = 'green'
        }else if(resp.status === 404){

            res.innerHTML = 'Endereço não encontrado.'
            res.style.color = 'red'
        }else{
            res.innerHTML = 'Erro ao apagar endereço.'
            res.style.color = 'red'
        }
        res.style.textAlign = 'center'
    })
    .catch((err) =>{

        console.error('Erro ao realizar pedido:', err)
        res.innerHTML = 'Erro ao conectar com o servidor.'
        res.style.color = 'red'
        setTimeout(() => {

            res.innerHTML = ''
        }, 1500)
    })
})