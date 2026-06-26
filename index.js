window.onload = onLoad
let pointer = document.createElement("div")
pointer.innerHTML += '<img src="pointer.png" alt="" width = 25>'
let invisPointer = document.createElement("div")
invisPointer.innerHTML += '<img src="pointer.png" alt="" width = 25 style="opacity: 0;">'

let pressAction = noAction
let holdAction = noAction
let shouldUseCaps = false

let activeCharacterSetNum = 0
let activeCharacterSet = [""]
const CharacterSets = {"Latin character set": ["#", "@", "$", "%", "&", "*", "(", ")", "?", "!"],
"Fake character set 1": [""],
"Fake character set 2": [""]
};

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
    document.body.innerHTML = '<h1>Controlling this mess</h1>\
    <h2>Press the "o" key to select stuff, or hold it if told(holding only registers after release)</h2>\
    <h2>You will have to enter your login information while a pointer moves over the characters<br>pressing "o" will select the character, while holding it will go to the password field.</h2>\
    <h2>THe login information will be given just before the login screen appears, remember it well!\
    <h2>Press "o" to continue</h2>'

    pressAction = renderCapsNoCaps
}
function renderCapsNoCaps(){
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
        if(activeCharacterSetNum == i) document.body.innerHTML += "<div style='display: flex; align-items:center; margin: 0;'> <img src='pointer.png' alt='' width = 25 height=25> <h2 style='padding: 8px' class='active'>" + Object.keys(CharacterSets)[i] + "</h2></div>"
        else document.body.innerHTML += '<h2 style="padding: ">' + Object.keys(CharacterSets)[i] + "</h2>"
    }
    
        document.body.innerHTML += '<p>Press "o" to switch between options and hold to select</p>'
}


let gameLoopInterval = null
let currGridIndex = 0

function showLoginInfo(){
    holdAction = noAction
    pressAction =loginInfoPress
    
}

function renderGame(){
    pressAction = gamePressAction
    holdAction = gameHoldAction
    if(gameLoopInterval) clearInterval(gameLoopInterval)
    gameLoopInterval = setInterval(() => {
    
    currGridIndex = (currGridIndex + 1) % activeCharacterSet.length
    updateGameUI()
}, 350)
    updateGameUI()

}
let username = ""
let password = ""
let isEditingPassword = false
function updateGameUI(){
    let loginhtml = '<h1>Login Screen</h1>\
    <div>\
    <p><bold>Username: ' + username +' '+(!isEditingPassword ? '<span style="color:green">_</span>' : '')+'</p>\
    <p><bold>Password: ' + "*".repeat(password.length) +(isEditingPassword ? '<span style="color:green">_</span>' : '')+'</p>\
    </div>\
    <p>Press "o" to select the character pointed at, hold "o" to swap fields or login.</p>\
    <div style="display: grid; grid-template-columns: repeat(6,1fr); gap: 10px; width: 300px; margin: 0 auto;">'
    activeCharacterSet.forEach((el,i) => {
        loginhtml += '<div style= "border: 1px solid #878787; padding: 20px; text-align: center; background-color: ' + (i == currGridIndex ? '#afa2a2': '#fff') +';">' +(i == currGridIndex ? '<img src="pointer.png" alt="" width = 15 style="rotate: 90deg"><br>':'<img src="pointer.png" alt="" width = 15 style="rotate: 90deg; opacity: 0"><br>')+el+'</div>'
    });    
    loginhtml += "</div>"
    document.body.innerHTML = loginhtml
}

function renderLoggedIn(){
    pressAction = noAction
    holdAction = noAction
    document.body.innerHTML = '<h1>Welcome ' + username+ '!</h1><h2 style="margin:0">You have sucessfully logged in!</h2><h3>(or not, there\'s no database)<p>Your password is safe with us!'
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
        showLoginInfo()
}
function loginInfoPress(){
    renderGame()
}
function gamePressAction(){
    if(!isEditingPassword) {
        username+=activeCharacterSet[currGridIndex]
    }
    else{
        password += activeCharacterSet[currGridIndex]

    }
    updateGameUI()
    }

function gameHoldAction(){
    if(!isEditingPassword){
        isEditingPassword = true;
        currGridIndex = 0
        updateGameUI()
    }
    else{
        clearInterval(gameLoopInterval)
        renderLoggedIn()
    }
}