import Sounds from "./sons.js"


// transforma em classe instanciavel
class Utils{

    listaDeSites = ["github"]
    states = ["preview", "viewing", "others"]
    currState = state[0]

    // pega, salve e atualiza o poppup com os dados
    static async getTabs(listTag){
        const tabs = await chrome.tabs.query({})
        return tabs
    }

    // lista o poppup com os dados
    static async listTabs(listTag, totaisTag){
        listTag.innerHTML = ""
        const {data} = await chrome.storage.local.get("data")
        if(!data){
            listTag.innerText = "Nao ha Dados Disponiveis!"
            return 
        }
        console.log(data)
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
            
            li.className = i.state
            Sounds(li)
            listTag.appendChild(li)
        }
        totaisTag.innerText = `TOTAL: ${data.length}`
    }

    static async structureData(){

        function verifyIfAlreadyExist(currSite, list){
            const existance = list.filter(x => x.link == currSite)
            if(existance.length){
                return true
            }
            return false
        }

        const tabs = await Utils.getTabs()
        // console.log(tabs)
        
        const states = ["preview", "viewing", "others"]
        let currState = 0

        const sitesAvailable = ["github"]

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
                    
            if(!sitesAvailable.includes(site)){
                console.log(sitesAvailable.includes(site))
                continue
            }

            const obj = {
                site,
                link,
                title,
                state: states[currState],
            }
            sites.push(obj)
        }
        console.log(sites)
        Utils.saveData(sites)
    }

    static async saveData(sites){
        await chrome.storage.local.set({
            data: sites
        })
    }

    static async openWindows(){
        const {data} = await chrome.storage.local.get("data")
        for(let tab in data){
            if(tab > 2){
                break
            }
            chrome.tabs.create({url: data[tab].link, active: false})
        }
        console.log(data)
    }
}

export default Utils