const btn = document.getElementById('btn')
const btnLogout = document.getElementById('btnLogout')
let res = document.getElementById('res')

btn.addEventListener('click', (e) =>{
    e.preventDefault()

    let codProduto = document.getElementById('codProduto').value

    if(!codProduto){

        res.style.textAlign = 'center'
        res.style.color = 'red'
        return res.innerHTML = 'Preencha o campo necessário para prosseguir.'
    }

    const token = sessionStorage.getItem('token')
    fetch(`https://projbackend-production.up.railway.app/${codProduto}`, {
        method: 'DELETE',
        headers: {

            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },  
    })
    .then(resp =>{
    
        if(resp.status === 204){

            res.innerHTML = ''
            res.innerHTML += 'Dados apagados com sucesso.'
            res.style.textAlign = 'center'
        }else if(resp.status === 404){

            res.innerHTML = ''
            res.innerHTML += 'Produto não encontrado.'
            res.style.textAlign = 'center'
        }
    })
    .catch((err) =>{
    
        console.error('Erro ao apagar: ', err)
        res.innerHTML = 'Erro ao apagar: ' + err
        res.style.color = 'red'
        res.style.textAlign = 'center'
        setTimeout(() => {

            res.innerHTML = ''
        }, 1500)
    }) 
})

btnLogout.addEventListener('click', () =>{
    
    sessionStorage.clear()
    location.href = '../index.html' 
})  