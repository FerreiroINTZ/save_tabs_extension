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

const audiosOptions = [
    "./sounds/ui-button-click.wav", 
    "./sounds/hover.wav", 
    "./sounds/projects-hover.mp3"
]

export function addSoundOnElement(className, audioOption){
    const elements = document.getElementsByClassName(className)

    const audio = new Audio(audiosOptions[audioOption])
    audio.volume = .4

    for(let element of elements){
        if(element.tagName == "BUTTON"){
            const audio2 = new Audio(audiosOptions[1])
            audio2.volume = .4
            element.addEventListener("mouseenter", () =>{
            audio2.play()
        })
            const audio3 = new Audio(audiosOptions[audioOption])
            audio3.volume = .4
            element.addEventListener("mousedown", () =>{
            audio3.play()
        })    
        }else{
            element.addEventListener("mouseenter", () =>{
                audio.play()
            })
        }
    }
}