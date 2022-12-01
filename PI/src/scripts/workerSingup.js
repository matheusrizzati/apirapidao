let personName = document.querySelector('#personName')
let cpf = document.querySelector('#cpf')
let password = document.querySelector('#password')
let confirmPassword = document.querySelector('#confirmPassword')
const mensageText = document.querySelector('#mensage')
const workerSingupButton = document.querySelector('#workerSingupButton')

async function submitSingup(){
    let token
    let mensage
    
    const user = {
        personName: personName.value,
        cpf: cpf.value,
        password: password.value,
        confirmPassword: confirmPassword.value
    }

    await fetch('http://localhost:8000/worker/signup', {
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
    })  
    .catch(err => console.log(err))

    insertErrorMsg(mensage)

    if(mensage === "Registrado com sucesso"){
        setTimeout(function(){
            window.location.href = "../../workerLogin.html"
        }, 1500)
    }
}

async function insertErrorMsg(mensage){
    mensageText.innerHTML = mensage
    mensageText.style.color = "red"
}

workerSingupButton.addEventListener('click', submitSingup)