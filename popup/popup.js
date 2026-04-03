import Controller from "../controller.js"

const lista = document.getElementById("lista")
const input = document.getElementById("inputItem")
const addItem = document.getElementById("addItem")

const slw = new Controller()



function generateList(){
    const sites = slw.getSitesAvailable()
    lista.innerHTML = ""
    for(let site of sites){
        console.log(site)
        const li = document.createElement("li")
        const p = document.createElement("p")
        const btn = document.createElement("button")
    
        p.innerText = site
        btn.innerText = "X"
        btn.value = site
        
        btn.addEventListener("click", () =>{
            slw.deleteWebSite(btn.value)
            generateList()
        })
    
        li.appendChild(btn)
        li.appendChild(p)
        
        lista.appendChild(li)
    }
}

addItem.addEventListener("click", () =>{
    slw.addWebSite(input.value)
    generateList()
})

generateList()