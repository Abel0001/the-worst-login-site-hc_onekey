window.onload = onLoad
let pointer = document.createElement("div")
pointer.innerHTML += '<img src="pointer.png" alt="" width = 25>'
let invisPointer = document.createElement("div")
invisPointer.innerHTML += '<img src="pointer.png" alt="" width = 25 style="opacity: 0;">'
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

let activeCharacterSetNum = 0
let activeCharacterSet
const CharacterSets: {[key: string]: string[]} = {"Latin character set": [""],
"Fake character set 1": [""],
"Fake character set 2": [""]

}

function onLoad(){
    understandControls()

}

let pressTimer = 0.0
window.addEventListener("keydown", (e) => {if(e.key == "o" && !e.repeat) pressTimer = Date.now()})
window.addEventListener("keyup", (e) => {if(e.key == "o") 
{
    if(Date.now() - pressTimer < 300){
        pressAction()}
    else {holdAction()}
    pressTimer = 0
}

})
function understandControls(){
    stage = stages.CONTROLS_SCREEN
    document.body.innerHTML = '<h1>Controlling this mess</h1>\
    <h2>Press the "o" key to select stuff, or hold it if told(holding only registers after release)</h2>\
    <h2>You will have to enter your login information<br>while a pointer moves over the characters<br>pressing "o" will select the character, while holding it will go to the password field.</h2>\
    <h2>Press "o" to continue</h2>'

    pressAction = renderCapsNoCaps
}
function renderCapsNoCaps(){
    stage = stages.CAPS_NOCAPS
    pressAction = capsSelectPress
    holdAction = renderCharacterSet
    document.body.innerHTML = ""
    document.body.innerHTML +=  /*html*/'<h1>Do you want to differentiate between capital and non-capital letters?</h1>\
            <table>\
                    <tr>\
                        <td>'+ (!shouldUseCaps ? pointer.outerHTML:invisPointer.outerHTML)+'</td>\
                        <td '+ (!shouldUseCaps ? 'class="active"': '')+'>NO</td>\
                        <td>'+ (shouldUseCaps ? pointer.outerHTML:invisPointer.outerHTML)+'</td>\
                        <td '+ (shouldUseCaps ? 'class="active"': '')+'>YES</td>\
                    </tr>\
                </table>\
                <p>Press "o" to switch between options and hold to select</p>'

}

function renderCharacterSet(){
        pressAction = characterSetSelectPress
        holdAction = characterSetSelectHold
        document.body.innerHTML = 
        '<h1>Character sets</h1>'
                    
    for(let i = 0; i < Object.keys(CharacterSets).length; i++){
        if(activeCharacterSetNum == i) document.body.innerHTML += "<h2 class='active'>" + Object.keys(CharacterSets)[i] + "</h2>"
        else document.body.innerHTML += "<h2>" + Object.keys(CharacterSets)[i] + "</h2>"
    }
    
        document.body.innerHTML += '<p>Press "o" to switch between options and hold to select</p>'
}
function renderGame(){

}
//Actions
function noAction(){}
function capsSelectPress(){
        shouldUseCaps = !shouldUseCaps
        renderCapsNoCaps()
    }
function characterSetSelectPress(){
    
    activeCharacterSetNum += 1
    if(activeCharacterSetNum >= Object.keys(CharacterSets).length) activeCharacterSetNum = 0
    renderCharacterSet()

}
function characterSetSelectHold(){
        activeCharacterSet = CharacterSets[Object.keys(CharacterSets)[activeCharacterSetNum]]
            pressAction = noAction
        holdAction = noAction
}