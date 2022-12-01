const token = window.localStorage.getItem('token')
console.log(token)

async function checkToken(){
    let mensage

    if (!token){
        window.location.href = "../../workerLogin.html"
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

    console.log(mensage)

    if (mensage !== "valid session"){
        window.location.href = "../../workerLogin.html"
    }
}

// checkToken()    

async function fetchConsultas(){
    const consultas = await fetch('http://localhost:8000/consulta', {
        method: 'GET',
        headers: {
            "Content-Type":"application/json",
            "x-acess-token":token
        },
        mode: 'cors',
        cache: 'default'
    }).then(
        data => data.json()
    )

    return consultas
}

async function returnName(id){
    let personaName

    await fetch(`http://localhost:8000/checkUser/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type":"application/json",
        },
        mode: 'cors',
        cache: 'default'
    }).then(
        data => data.json()
    ).then(res => personaName = res.personName)
    return personaName
}

async function createConsulta(){
    const data = await fetchConsultas()
    const list = document.querySelector(`.list`)
    list.innerHTML = ''
    
    data.forEach(async element => {
        const personName = await returnName(element.user)
        const sympton1 = await element.symptons[0]
        const sympton2 = await element.symptons[1]
        const sympton3 = await element.symptons[2]
        const idConsulta = await element._id

        

        console.log(personName, sympton1, sympton2, sympton3, idConsulta)
        consultaComponent(personName, sympton1, sympton2, sympton3, idConsulta)
    });

    // data.forEach(async (consulta) => {
    //     const personName = await returnName(consulta.user)
    //     const sympton1 = await consulta.symptons[0]
    //     const sympton2 = await consulta.symptons[1]
    //     const sympton3 = await consulta.symptons[2]
    //     const idConsulta = await consulta._id

    //     console.log(personName, sympton1, sympton2, sympton3, idConsulta)
    //     consultaComponynent(personName, sympton1, sympton2, sympton3, idConsulta)
    // });
}
createConsulta()
async function consultaComponent(personaName, symptom1, symptom2, symptom3, letsgo){
    const list = document.querySelector(`.list`)
    const consultaDIV = document.createElement(`div`)
    consultaDIV.classList.add(`consulta`)
    consultaDIV.innerHTML = `
        <div class="first-op">
            <div class="urgencia">
                </div>
                    <div class="dados">
                        <span class="personName">${personaName}</span>
                        <div class="sintomas">
                            <span class="sympton">${symptom1}</span>
                            <span class="sympton">${symptom2}</span>
                            <span class="sympton">${symptom3}</span>
                        </div>
                    </div>
                </div>
                <div class="options">
                    <img src="./src/images/closeIco.png" class="closeIcon" onclick="deleteConsulta(\``+letsgo+`\`)">
                    </div>
                    `
    list.prepend(consultaDIV)
}

async function deleteConsulta(id){  
    await fetch(`http://localhost:8000/consulta/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type":"application/json",
            "x-acess-token":token
        },
        mode: 'cors',
        cache: 'default'
    }).then(
        data => data.json()
    ).then(res => console.log(res))
    createConsulta()
}

// show('637d4c97ad59931a0a16f9da')