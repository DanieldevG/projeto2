let currentPageUrl = 'https://swapi.dev/api/people/'


window.onload = async () => {
    try {
       await loadCharacters(currentPageUrl);
    } catch (error){
        console.log(error);
        alert('Erro ao carregar cards');
    }

    const backtButton = document.getElementById("back-button")
    const nextButton = document.getElementById("next-button")

    nextButton.addEventListener('click', loadNextPage)
    backtButton.addEventListener('click', loadPreviousPage)
}; 

async function loadCharacters(url) {
    const mainContent = document.getElementById("main-content")
    mainContent.innerHTML = ''; //limpar os resulados anteriores

    try{
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {
            const card = document.createElement("div")
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
            card.className = "cards"

            const characterNameBG = document.createElement("div")
            characterNameBG.className = "character-name-bg"

            const characterName = document.createElement("span")
            characterName.className = "character-name"
            characterName.innerText = `${character.name}` 

            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"
               
                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
                characterImage.className = "character-image"

                const name = document.createElement("span")
                name.className = "character-datails"
                name.innerText = `Nome: ${character.name}`

                const characterHeight = document.createElement("span")
                characterHeight.className = "character-datails"
                characterHeight.innerText = `Altura: ${convertHeight(character.height)}`
               

                const mass = document.createElement("span")
                mass.className = "character-datails"
                mass.innerText = `Peso: ${convertMass(character.mass)}`

                const eyeColor = document.createElement("span")
                eyeColor.className = "character-datails"
                eyeColor.innerText = `Cor dos olhos: ${coverEyeColor( character.eye_color)}`

                const birthYear = document.createElement("span")
                birthYear.className = "character-datails"
                birthYear.innerText = `Nascimento: ${convertBirthYear(character.birth_Year)}`
                
                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(characterHeight)
                modalContent.appendChild(mass)
                modalContent.appendChild(eyeColor)
                modalContent.appendChild(birthYear)

            }
           mainContent.appendChild(card)
        });

        const nextButton = document.getElementById("next-button")
        const backtButton = document.getElementById("back-button")

        nextButton.disable = !responseJson.next
        backtButton.disable = !responseJson.previous

        backtButton.style.visibility = responseJson.previous? "visible" : "hidden"


        currentPageUrl = url 

    } catch (error){
        alert('Erro ao carregar os personagens');
        console.log(error)
    }
}

async function loadNextPage() {
    if(!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)

    } catch (error){
        console.log(error)
        alert('Erro ao carregar a próxima página')
    }
}

async function loadPreviousPage() {
    if(!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)
        
    } catch (error){
        console.log(error)
        alert('Erro ao carregar a próxima anterior')
    }
} 

function hideModal(){
    const modal = document.getElementById("modal")
    modal.style.visibility = hidden 
}

function  coverEyeColor(eyeColor){
    const cores = {
        blue: "azul",
        brown: "castanho",
        green: "verde",
        yellow: "amarelo",
        black: "preto",
        pink: "rosa",
        red: "vermelho",
        orange: "laranja",
        hazel: "avela",
        unknown: "desconhecida"
    };

    return cores[eyeColor.toLowerCase()] || eyeColor;
}

function convertHeight(height){
    if(height === "unknown"){
        return"desconhecida"
    }

        return(height / 100).toFixed(2)
        
    }

    function convertMass(mass){
        if(mass === "unknown"){
            return"desconhecido"
        }
        return `${mass} kg`
    }

    function convertBirthYear(birthYear){
        if( birthYear === "unknown"){
            return"desconhecido"
        }

        return birthYear
    }


