const btn = document.getElementById('btn')
const btnLogout = document.getElementById('btnLogout')
let res = document.getElementById('res')

btn.addEventListener('click', (e) => {
    e.preventDefault()

    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value

    if (!email || !senha) {
        res.innerHTML = `Preencha todos os campos para prosseguir.`
        res.style.color = 'red'
        res.style.textAlign = 'center'
        return
    }

    const valores = {
        email: email,
        senha: senha
    }

    fetch(`http://localhost:3000/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
    .then(dados => {

        const userToken = sessionStorage.getItem('token', dados.token)
        if(userToken){

            res.innerHTML = 'Você já está logado! Realize o logout para logar de novo.'
            res.style.color = 'red'
            res.style.textAlign = 'center' 
            setTimeout(() => {
                
                res.innerHTML = ''
            }, 2000)
            return
        }

        console.log(dados)
        console.log('Nome:', dados.usuario.nome)
        console.log('Tipo:', dados.usuario.tipo)

        if(!dados.token){

            res.innerHTML = dados.message || 'Erro ao realizar login!'
            res.style.color = 'red'
            res.style.textAlign = 'center'
            return
        }

        // Salvar token 
        sessionStorage.setItem('token', dados.token)
        // Salvar nome
        sessionStorage.setItem('nome', dados.usuario.nome)
        sessionStorage.setItem('tipo', dados.usuario.tipo)

        res.innerHTML += `Login realizado com sucesso!`
        res.style.textAlign = 'center'
        res.style.fontWeight = 'bold'

        setTimeout(() => {
            
            // Redirecionar conforme tipo
            if(dados.usuario.tipo === 'ADMIN') {

                location.href = './pages/produto.html'
            }else{

                location.href = './pages/loja.html'
            }
        }, 1500)
    })
    .catch((err) => {

        console.error('Erro ao realizar login:', err)
        res.innerHTML = `Erro ao realizar login.`
        res.style.color = 'red'
        res.style.textAlign = 'center'
    })
})

btnLogout.addEventListener('click', () =>{

    const userToken = sessionStorage.getItem('token')
    if(!userToken){
        res.innerHTML = 'Você não está logado!'
        res.style.color = 'red'
        res.style.textAlign = 'center'

        setTimeout(() => {
            
            res.innerHTML = ''
        }, 2000)
        return
    }
    
    sessionStorage.clear()

    res.innerHTML = ''
    res.innerHTML += `Logout realizado com sucesso! <br>`
    res.innerHTML += `Realocando para página de cadastro...`
    res.style.textAlign = 'center'
    res.style.fontWeight = 'bold'
    setTimeout(() => {
            
        location.href = './pages/usuarioCadastrar.html'
    }, 1500)
})