

window.addEventListener('DOMContentLoaded', () =>{

    let resNomeUser = document.getElementById('resNomeUser')
    let resTipo = document.getElementById('resTipo')

    const nomeUser = sessionStorage.getItem('nome')
    const tipo = sessionStorage.getItem('tipo')

    resNomeUser.innerHTML = nomeUser
    resTipo.innerHTML = tipo
})