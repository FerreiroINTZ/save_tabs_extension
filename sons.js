export default function slw(element, type){
    if(type != "btn"){
        const audio = new Audio("./sounds/ui-button-click.wav")
        audio.volume = .2
        element.addEventListener("mouseenter", () => audio.play())
    }else{
        const audio = new Audio("./sounds/hover.wav")
        const audio2 = new Audio("./sounds/projects-hover.mp3")
        audio.volume = .3
        audio2.volume = .3
        element.addEventListener("mouseenter", () => audio.play())
        element.addEventListener("mousedown", () => audio2.play())
    }
}