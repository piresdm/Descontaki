logar.addEventListener('click', () => {
    var cpf = document.getElementById("CPF").value
    var senha = document.getElementById("senha").value                        

    localStorage.setItem('cpf', cpf)
    // localStorage.setItem('nome', '') //tirei pq se n vai puxar do bd, n pode apagar
    // localStorage.setItem('email', '')
    // localStorage.setItem('sexo', '')
    // localStorage.setItem('nascimento', '')
    cpf = cpf.replace("-","").replace(".","").replace(".","")

    const validarConta = (data) =>  {
        for (const atributos in data){
            if (data["cpf"] == cpf && data["senha"] == senha){
                window.location.href = "home.html"
                break
            }else(
                alert("Senha ou usuário incorretos")
            )
            break
        }
    }


    //fetch pegando os valores do banco
    fetch(`https://apirest-elcoma.herokuapp.com/usuarios/cpf/${cpf}`,
        {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer'            
        })
        .then(response => {
            if (!response.ok){throw Error(response.statusText); }
            response.json().then(data => validarConta(data))
        }).catch(function(error){
            alert("CPF ou senha inválidos, por favor tente novamente!")})

})