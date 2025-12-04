const btn = document.getElementById('btn')
let res = document.getElementById('res')

btn.addEventListener('click', (e) =>{
    e.preventDefault()

    let nome = document.getElementById('nome').value
    let email = document.getElementById('email').value
    let telefone = document.getElementById('telefone').value
    let cpf = document.getElementById('cpf').value
    let identidade = document.getElementById('identidade').value
    let senha = document.getElementById('senha').value

    if(!nome || !email || !telefone || !cpf || !senha){

        res.innerHTML = `Preencha todos os campos para prosseguir.`
        res.style.color = 'red'
        res.style.textAlign = 'center'
        return
    }

    const valores = {
        nome: nome,
        email: email,
        telefone: telefone,
        cpf: cpf,
        identidade: identidade,
        senha: senha
    }

    console.log(valores)

    fetch(`https://projbackend-production.up.railway.app/usuario`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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

        console.error('Erro ao realizar o cadastro: ', err)
        res.innerHTML = 'Erro ao realizar o cadastro: ' + err
        res.style.color = 'red'
        res.style.textAlign = 'center'
        setTimeout(() => {

            res.innerHTML = ''
        }, 1500)
    })
})