const btnLogout = document.getElementById('btnLogout')
const btn = document.getElementById('btn')
const btnBuscarCep = document.getElementById('btnBuscarCep')
let res = document.getElementById('res')

window.addEventListener('DOMContentLoaded', () =>{

    let resNomeUser = document.getElementById('resNomeUser')
    let resTipo = document.getElementById('resTipo')

    const nomeUser = sessionStorage.getItem('nome')
    const tipo = sessionStorage.getItem('tipo')

    resNomeUser.innerHTML = nomeUser
    resTipo.innerHTML = tipo
})

btnLogout.addEventListener('click', () =>{

    sessionStorage.clear()
    location.href = '../index.html'
})

btnBuscarCep.addEventListener('click', () =>{

    const cep = document.getElementById('cep').value.replace(/\D/g, '')

    if(cep.length !== 8){

        res.innerHTML = 'CEP deve ter 8 dígitos'
        res.style.color = 'red'
        res.style.textAlign = 'center'
        return
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(resp => resp.json())
    .then(data => {

        if(data.erro){

            res.innerHTML = 'CEP não encontrado'
            res.style.color = 'red'
            res.style.textAlign = 'center'
            return
        }
        
        document.getElementById('logradouro').value = data.logradouro
        document.getElementById('bairro').value = data.bairro
        document.getElementById('localidade').value = data.localidade
        document.getElementById('uf').value = data.uf
        
        res.innerHTML = 'Dados preenchidos automaticamente'
        res.style.color = 'green'
        res.style.textAlign = 'center'
    })
    .catch(err => {

        console.error('Erro ao buscar CEP:', err)
        res.innerHTML = 'Erro ao buscar CEP'
        res.style.color = 'red'
        res.style.textAlign = 'center'
    })
})

btn.addEventListener('click', (e) =>{
    e.preventDefault()

    const cep = document.getElementById('cep').value
    const numero = document.getElementById('numero').value
    const complemento = document.getElementById('complemento').value
    const apelido = document.getElementById('apelido').value
    const is_principal = document.getElementById('is_principal').checked

    if (!cep || !numero) {

        res.innerHTML = 'CEP e número são obrigatórios'
        res.style.color = 'red'
        res.style.textAlign = 'center'
        return
    }

    const dados = {
        cep,
        numero,
        complemento,
        apelido,
        is_principal
    }

    const token = sessionStorage.getItem('token')
    fetch(`http://localhost:3000/endereco`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dados)
    })
    .then(resp => resp.json())
    .then(data => {

        if (data.error) {

            res.innerHTML = 'Erro: ' + data.error
            res.style.color = 'red'
            res.style.textAlign = 'center'

        }else{

            res.innerHTML = data.message
            res.style.color = 'green'

            // Limpar formulário
            document.getElementById('cep').value = ''
            document.getElementById('logradouro').value = ''
            document.getElementById('bairro').value = ''
            document.getElementById('localidade').value = ''
            document.getElementById('uf').value = ''
            document.getElementById('numero').value = ''
            document.getElementById('complemento').value = ''
            document.getElementById('apelido').value = ''
            document.getElementById('is_principal').checked = false
        }
    })
    .catch(err => { 

        console.error('Erro ao cadastrar endereço:', err)
        res.innerHTML = 'Erro ao conectar com o servidor'
        res.style.color = 'red'
        res.style.textAlign = 'center'
    })
})