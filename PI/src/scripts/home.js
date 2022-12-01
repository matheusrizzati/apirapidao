const firstSymptom = document.querySelector('#firstSymptom')
const secondSymptom = document.querySelector('#secondSymptom')
const thirdSymptom = document.querySelector('#thirdSymptom')
const crateButton = document.querySelector('#createConsulta')

const token = window.localStorage.getItem('token')


async function checkToken(){
    let mensage

    if (!token){
        window.location.href = "../../login.html"
    }
    await fetch('http://localhost:8000/session', {
        method: 'GET',
        headers: {
            "Content-Type":"application/json",
            "x-acess-token":token
        },
        mode: 'cors',
        cache: 'default'
    })
    .then(res => res.json())
    .then(res => {
        mensage = res.msg
    })
    if (mensage !== "valid session"){
        window.location.href = "../../login.html"
    }
}

// checkToken()

async function createConsulta(){
    let mensage
    const consulta = {
        symptons: [firstSymptom.value, secondSymptom.value, thirdSymptom.value]
    }

    await fetch('http://localhost:8000/consulta', {
        method: 'POST',
        headers: {
            "Content-Type":"application/json",
            "x-acess-token": token
        },
        body: JSON.stringify(consulta),
        mode: 'cors',
        cache: 'default'
    }).then(
        data => data.json()
    ).then(
        res => mensage = res.msg
    )
    console.log(mensage)
    alert(mensage)
}

crateButton.addEventListener('click', createConsulta)
