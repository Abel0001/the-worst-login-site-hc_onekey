window.onload = onLoad
let pointer = document.createElement("div")
pointer.innerHTML += '<img src="pointer.png" alt="" width = 25>'

const stages = {
    NOT_LOADED: 0,
    CONTROLS_SCREEN: 1,
    CAPS_NOCAPS: 2,
    CHARACTER_SET: 3,
    LOGIN_SCREEN: 4,
    LOGGED_IN: 5
};
let pressAction = noAction
let holdAction = noAction
let stage = stages.NOT_LOADED
let shouldUseCaps = false

function onLoad(){
    understandControls()
    renderCapsNoCaps()

}

let pressTimer = 0.0
window.addEventListener("keydown", (e) => {if(e.key == "o") pressTimer = Date.now()})
window.addEventListener("keyup", (e) => {if(e.key == "o") 
{
    if(Date.now() - pressTimer < 1000){
        pressAction()}
    else {holdAction()}
    pressTimer = 0
}

})
function understandControls(){
    stage = stages.CONTROLS_SCREEN
    document.body.innerHTML = '<h1>Controlling this mess</h1>\
    <p>Press the "o" key to select stuff, or hold it if told(holding only registers after release)'
}
function renderCapsNoCaps(){
    stage = stages.CAPS_NOCAPS
    pressAction = capsSelectPress
    document.body.innerHTML = ""
    document.body.innerHTML +=  /*html*/'<h1>Do you want to differentiate between capital and non-capital letters?</h1>\
            <table>\
                    <tr>\
                        <td>'+ (!shouldUseCaps ? pointer.outerHTML:'')+'</td>\
                        <td>NO</td>\
                        <td>'+ (shouldUseCaps ? pointer.outerHTML:"")+'</td>\
                        <td>YES</td>\
                    </tr>\
                </table>'

}

//Actions
function noAction(){}
function capsSelectPress(){
        shouldUseCaps = !shouldUseCaps
        renderCapsNoCaps()
    }