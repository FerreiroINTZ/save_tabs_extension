import Utils from "./util.js"
import Sounds from "./sons.js"

const btn = document.getElementById('fetchBtn')
const listTag = document.getElementById("list")
const totaisTag = document.getElementById("totais")
const openWindows = document.getElementById("openWindows")

Sounds(btn, "btn")

btn.addEventListener("click", () =>{
    Utils.structureData()
})

openWindows.addEventListener("click", () =>{
    Utils.openWindows()
})

// Utils.structureData()

Utils.listTabs(listTag, totaisTag)