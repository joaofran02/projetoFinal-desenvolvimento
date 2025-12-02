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

btnLogout.addEventListener('click', () =>{

    sessionStorage.clear()
    location.href = '../index.html'
})

btn.addEventListener('click', (e) =>{
    e.preventDefault()

    const codEndereco = document.getElementById('codEndereco').value

    if(!codEndereco){

        res.innerHTML = 'Código do endereço é obrigatório'
        res.style.color = 'red'
        res.style.textAlign = 'center'
        return
    }

    const token = sessionStorage.getItem('token')
    fetch(`http://localhost:3000/endereco/${codEndereco}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(resp => resp.json())
    .then(dados => {

        if(dados.error){

            res.innerHTML = 'Erro: ' + dados.error
            res.style.color = 'red'
            res.style.textAlign = 'center'
        }else{

            res.innerHTML = 
            `
            <table cellpadding="8" border="1">
                <thead>

                    <tr>

                        <th>Código:</th>
                        <th>ID do Usuário:</th>
                        <th>CEP:</th>
                        <th>Logradouro:</th>
                        <th>Complemento:</th>
                        <th>Bairro:</th>
                        <th>Localidade:</th>
                        <th>UF:</th>
                        <th>Número:</th>
                        <th>Apelido:</th>
                        <th>Principal:</th>

                    </tr>

                </thead>
                <tbody>

                    <tr>
                        <td>${dados.codEndereco}</td>
                        <td>${dados.idUsuario}</td>
                        <td>${dados.cep}</td>
                        <td>${dados.logradouro}</td>
                        <td>${dados.complemento}</td>
                        <td>${dados.bairro}</td>
                        <td>${dados.localidade}</td>
                        <td>${dados.uf}</td>
                        <td>${dados.numero}</td>
                        <td>${dados.apelido}</td>
                        <td>${dados.is_principal}</td>

                    </tr>

                </tbody>
            </table>
            `
            res.style.color = 'black'
            res.style.textAlign = 'center'
        }
    })
    .catch(err => {

        console.error('Erro:', err)
        res.innerHTML = 'Erro ao conectar com o servidor'
        res.style.color = 'red'
        res.style.textAlign = 'center'
    })
})