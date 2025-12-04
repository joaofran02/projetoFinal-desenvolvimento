const btn = document.getElementById('btn')
const btnLogout = document.getElementById('btnLogout')
let res = document.getElementById('res')

btn.addEventListener('click', (e) =>{
    e.preventDefault()

    let codProduto = document.getElementById('codProduto').value
    let nome = document.getElementById('nome').value
    let descricao = document.getElementById('descricao').value
    let modelo = document.getElementById('modelo').value
    let preco = document.getElementById('preco').value
    let imagem_url = document.getElementById('imagem_url').value
    let ativo = document.getElementById('ativo').value

    const valores = {}

    if (nome !== "") valores.nome = nome
    if (descricao !== "") valores.descricao = descricao
    if (modelo !== "") valores.modelo = modelo
    if (preco !== "") valores.preco = preco
    if (imagem_url !== "") valores.imagem_url = imagem_url
    
    // Se ATIVO for nulo no HTMl, converte pra TRUE
    // Necessário porque como é booleano, não aceita valores != true ou false
    if(ativo === "null") ativo = true

    if (ativo !== "") valores.ativo = ativo

    const token = sessionStorage.getItem('token')
    console.log(valores)

    // --------------------------------------------- ATUALIZAR COMPLETO --------------------------------------------
    if(nome && descricao && modelo && preco && imagem_url && ativo){

        console.log('Realizando PUT')
        fetch(`https://projbackend-production.up.railway.app/${codProduto}`, {
            method: 'PUT',
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
    
            console.error('Erro ao atualizar completamente: ', err)
            res.innerHTML = 'Erro ao atualizar completamente: ' + err
            res.style.color = 'red'
            res.style.textAlign = 'center'
        })
    // -------------------------------------------- ATUALIZAR PARCIAL --------------------------------------------
    }else{

        console.log('Realizando PATCH')
        fetch(`https://projbackend-production.up.railway.app/produto/${codProduto}`, {
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
    
            console.error('Erro ao atualizar parcialmente: ', err)
            res.innerHTML = 'Erro ao atualizar parcialmente: ' + err
            res.style.color = 'red'
            res.style.textAlign = 'center'
            setTimeout(() => {

                res.innerHTML = ''
            }, 1500)
        }) 
    }
})

btnLogout.addEventListener('click', () =>{
    
    sessionStorage.clear()
    location.href = '../index.html' 
})  