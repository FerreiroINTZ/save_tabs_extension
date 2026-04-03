// chrome://inspect => da pra debugar poppups nele

import Controller from "./controller.js"
import Sounds, {addSoundOnElement} from "./sons.js"


// elements ================================================
const btn = document.getElementById('fetchBtn')
const listTag = document.getElementById("list")
const totaisTag = document.getElementById("totais")
const openWindows = document.getElementById("openWindows")
const clearBtn = document.getElementById("clear")
const btnSitesAvailable = document.getElementById("sitesAvailable")
// ========================================


const slw = new Controller(listTag, totaisTag)


// listeners ==========================================
// salva as janelas
btn.addEventListener("click", () =>{
    slw.structureData()
})

// abre as janelas
openWindows.addEventListener("click", () =>{
    slw.openWindows()
})

// limpa os dados
clearBtn.addEventListener("click", () =>{
    slw.clearTabs()
})

// apre o popup de edicao
btnSitesAvailable.addEventListener("click", () =>{
    slw.editSitesAvailable()
})
// ========================================

// basic actions
await slw.listTabs(listTag, totaisTag)
// =========================================

// sounds =============================================
addSoundOnElement("btnAudio", 0)
addSoundOnElement("preview", 0)
addSoundOnElement("viewing", 0)
addSoundOnElement("others", 0)
// ========================================