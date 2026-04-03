import Sounds from "./sons.js"


// transforma em classe instanciavel
class Controller{

    states = ["preview", "viewing", "others"]
    sitesAvailable = ["github", "chatgpt", "uol"]
    popipId = null

    constructor(listTag, totaisTag){
        this.listTag = listTag
        this.totaisTag = totaisTag
    }

    // listaDeSites = ["github"]
    // states = ["preview", "viewing", "others"]
    // currState = states[0]

    getSitesAvailable(){
        return this.sitesAvailable
    }
    deleteWebSite(vall){
        const newSites = this.sitesAvailable.shift(vall)
        return newSites
    }
    addWebSite(vall){
        const newSites = this.sitesAvailable.push(vall)
        return newSites
    }

    // pega, salve e atualiza o poppup com os dados
    async getTabs(){
        const tabs = await chrome.tabs.query({})
        return tabs
    }

    // lista o poppup com os dados
    async listTabs(){
        this.listTag.innerHTML = ""
        const {data} = await chrome.storage.local.get("data")
        
        this.totaisTag.innerText = `TOTAL: ${data?.length || 0}`
        
        if(!data){
            this.listTag.innerText = "Nao ha Dados Disponiveis!"
            return 
        }
        
        // cria os elementos e poe na lista
        for(let i of data){
            const li = document.createElement("li")

            const title = document.createElement("p")
            title.innerText = i.title
            title.className = "slw"
            li.appendChild(title)
            
            const state = document.createElement("p")
            state.innerText = "State: " + i.state
            li.appendChild(state)
            
            const link = document.createElement("a")
            link.href = i.link
            link.innerText = "LINK"
            link.setAttribute("target", "__blank")
            li.appendChild(link)
            
            li.classList.add(i.state)
            this.listTag.appendChild(li)
        }
    }

    async structureData(){

        function verifyIfAlreadyExist(currSite, list){
            const existance = list.filter(x => x.link == currSite)
            if(existance.length){
                return true
            }
            return false
        }

        const tabs = await this.getTabs()
        // console.log(tabs)
        
        let currState = 0

        const sites = []

        // pega os sites e organiza em um "DTO"
        for(let data of tabs){
            // infos iniciais
            const slw = new URL(data.url)
            const url = slw.host
            const link = slw.href
            const title = data.title
            
            // verifica se ja existe
            const existance = verifyIfAlreadyExist(link, sites)
            if(existance){
                console.warn("Existe!")
                break
            }
            
            // sem "www"
            const regex1 = /(?<site>\w+)\.\w+/
            // com "www"
            const regex2 = /www\.(?<site>\w+)\.\w+/
            // chrome://
            const regex3 = /(?<site>\w+)/

            // pega somente o nome do site
            let currRegex = regex3
            if(url.includes("www")){
                currRegex = regex2
            }else if(url.includes(".")){
                currRegex = regex1
            }
            const {site} = url.match(currRegex).groups

            
            // muda de fase
            switch(site){
                case "web":
                    currState = 1
                break
                case "newtab":
                    currState = 2
            }
                    
            if(!this.sitesAvailable.includes(site)){
                continue
            }

            const obj = {
                site,
                link,
                title,
                state: this.states[currState],
            }
            sites.push(obj)
            console.log(site)
        }
        console.log(sites)
        this.saveData(sites)
    }

    async saveData(sites){
        await chrome.storage.local.set({
            data: sites
        })
        await this.listTabs()
    }

    async openWindows(){
        const {data} = await chrome.storage.local.get("data")
        let currState = null
        for(let tab in data){
            console.log(currState)
            // se o estado anteriror for diferente do atual ele atualiza
            if(currState != data[tab].state){
                currState = data[tab].state
                switch(currState){
                    case "preview":
                        chrome.tabs.create({url: "https://web.whatsapp.com/"})
                    break
                    case "viewing":
                        chrome.tabs.create({url: "chrome://newtab"})
                }
            }
            chrome.tabs.create({url: data[tab].link, active: false})
        }
        console.log(data)
    }

    async clearTabs(){
        await chrome.storage.local.remove(["data"])
        await this.listTabs()
    }

    async editSitesAvailable(){
        // se a janeja la existir ele nao cria outra
        if(this.popipId){
            const slw = await chrome.windows.get(this.popipId)
            console.log("slw")
            console.log(slw)
            return 
        }
        const {id: windowId} = await chrome.windows.create({
            url: "./popup/popup.html",
            type: "popup",
            width: 400,
            height: 600
        })
        this.popipId = windowId
    }
}

export default Controller