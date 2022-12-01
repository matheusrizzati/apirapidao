let personName = document.querySelector('#personName')
let cpf = document.querySelector('#cpf')
let birthDate = document.querySelector('#birthDate')
let phone = document.querySelector('#phone')
let password = document.querySelector('#password')
let confirmPassword = document.querySelector('#confirmPassword')
const mensageText = document.querySelector('#mensage')
const singupButton = document.querySelector('#singupButton')

async function submitSingup(){
    let token
    let mensage
    
    const user = {
        personName: personName.value,
        cpf: cpf.value,
        birthDate: birthDate.value,
        phone: phone.value,
        password: password.value,
        confirmPassword: confirmPassword.value
    }

    await fetch('http://localhost:8000/user/signup', {
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
            window.location.href = "../../login.html"
        }, 1500)
    }
}

async function insertErrorMsg(mensage){
    mensageText.innerHTML = mensage
    mensageText.style.color = "red"
}

singupButton.addEventListener('click', submitSingup)