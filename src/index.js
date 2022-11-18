console.log('%c HI', 'color: firebrick')
let breeds = []
function getBreeds() {
    const imgURL = "https://dog.ceo/api/breeds/image/random/4"
    return fetch(imgURL)
    .then(resp => resp.json())
    .then(resp => {
        console.log("response", resp.message)
        const dogImageContainer = document.getElementById("dog-image-container")
        resp.message.forEach(url => {
            const img = document.createElement("img")
            img.src = url
            dogImageContainer.append(img)
        })
    })
}

function getBreedNames() {
    const breedURL = "https://dog.ceo/api/breeds/list/all"
    fetch(breedURL)
    .then(resp => resp.json())
    .then(resp => {
        breeds = Object.keys(resp.message)
        addBreedNamesToDom(breeds)
    })
}

function addBreedNamesToDom(breeds) {
    const ul = document.querySelector("#dog-breeds")
    breeds.map(breed => {
        const li = document.createElement("li")
        li.textContent = breed
        ul.append(li)
    })
}

document.addEventListener("click", e => {
    if(e.target.matches("li")) {
        e.target.style.color = "red"
    }
})

document.addEventListener("change", e => {
    if(e.target.matches("#breed-dropdown")) {
        const ul = document.querySelector("#dog-breeds")
        ul.innerHTML = ""
        const filteredBreeds = breeds.filter(breed => breed[0] === e.target.value) 
        addBreedNamesToDom(filteredBreeds)
    }
})

getBreeds()
getBreedNames()