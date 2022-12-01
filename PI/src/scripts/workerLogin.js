let cpf = document.querySelector('#cpf')
let password = document.querySelector('#password')
const mensageText = document.querySelector('#mensage')
const workerLoginButton = document.querySelector('#workerLoginButton')

async function submitLogin(){
    let token
    let mensage
    
    const user = {
        cpf: cpf.value,
        password: password.value,
    }

    await fetch('http://localhost:8000/worker/login', {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user),
        mode: 'cors',
        cache: 'default'
    })
    .then(data => data.json())
    .then(res => {
        mensage = res.msg
        token = res.token
    })  
    .catch(err => console.log(err))

    insertErrorMsg(mensage)

    if(token){
        window.localStorage.setItem('token', token);
    }
    
    if(mensage === "Login efetuado"){
        setTimeout(function(){
            window.location.href = "../../admin.html"
        }, 1500)
    }
}

async function insertErrorMsg(mensage){
    mensageText.innerHTML = mensage
    mensageText.style.color = "red"
}

workerLoginButton.addEventListener('click', submitLogin)