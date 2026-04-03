import Controller from "../controller.js"

const lista = document.getElementById("lista")
const input = document.getElementById("inputItem")
const addItem = document.getElementById("addItem")

const slw = new Controller()


async function generateList(){
    const sites = await slw.getSitesAvailable()
    if(!sites.length){
        lista.innerHTML = "Nao ha nada!"
        return
    }
    lista.innerHTML = ""
    for(let site of sites){
        console.log(site)
        const li = document.createElement("li")
        const p = document.createElement("p")
        const btn = document.createElement("button")
    
        p.innerText = site
        btn.innerText = "X"
        btn.value = site
        
        btn.addEventListener("click", async () =>{
            await slw.deleteWebSite(btn.value)
            generateList()
        })
    
        li.appendChild(btn)
        li.appendChild(p)
        
        lista.appendChild(li)
    }
}

input.addEventListener("keydown", async event =>{
    if(event.code == "Enter"){
        await slw.addWebSite(input.value)
        event.target.value = ""
        console.log(event)
        generateList()
    }
})

addItem.addEventListener("click", async () =>{
    await slw.addWebSite(input.value)
    generateList()
})

generateList()