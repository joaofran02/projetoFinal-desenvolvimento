const btn = document.getElementById('btn')
const btnLogout = document.getElementById('btnLogout')
let res = document.getElementById('res')

btn.addEventListener('click', (e) =>{
    e.preventDefault()

    let nome = document.getElementById('nome').value
    let descricao = document.getElementById('descricao').value
    let modelo = document.getElementById('modelo').value
    let preco = parseFloat(document.getElementById('preco').value)
    let imagem_url = document.getElementById('imagem_url').value
    let ativo = document.getElementById('ativo').value === 'true'

    if(!nome || !modelo || !preco || !ativo){

        res.innerHTML = `Preencha todos os campos para prosseguir.`
        res.style.color = 'red'
        res.style.textAlign = 'center'
        return
    }

    const valores = {
        nome: nome,
        descricao: descricao,
        modelo: modelo,
        preco: preco,
        imagem_url: imagem_url,
        ativo: ativo
    }

    console.log(valores)

    const token = sessionStorage.getItem('token')
    fetch(`https://projbackend-production.up.railway.app/produto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
    .then(dados =>{

        console.log(dados)
        if(dados.error){

            res.innerHTML = 'Erro: ' + dados.error
            res.style.color = 'red'
            res.style.textAlign = 'center'
            return
        }
        res.innerHTML = ''
        res.innerHTML += dados.message + ' e automaticamente cadastrado no estoque.'
        res.style.textAlign = 'center'
        res.style.color = 'green'
    })
    .catch((err) =>{

        console.error('Erro ao realizar o cadastro: ', err)
        res.innerHTML = 'Erro ao realizar o cadastro: ' + err
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