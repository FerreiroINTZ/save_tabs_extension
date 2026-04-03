import Controller from "./controller.js"
import Sounds, {addSoundOnElement} from "./sons.js"


// elements ================================================
const btn = document.getElementById('fetchBtn')
const listTag = document.getElementById("list")
const totaisTag = document.getElementById("totais")
const openWindows = document.getElementById("openWindows")
const clearBtn = document.getElementById("clear")
// ========================================


const slw = new Controller(listTag, totaisTag)


// listeners ==========================================
btn.addEventListener("click", () =>{
    slw.structureData()
})

openWindows.addEventListener("click", () =>{
    slw.openWindows()
})

clearBtn.addEventListener("click", () =>{
    slw.clearTabs()
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