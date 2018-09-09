function activateSearchEngine() {
    var userInput = document.getElementById("searchZone").value
    if (userInput === "")
        return

    var isRegex = false
    if (userInput.includes('*')) {
        isRegex = true
        var pattern = '\^' + userInput.replace(/\./g, "\\\.").replace(/\*/g, ".*").replace(/([\\ \+ \? \[ \^ \] \$ \( \) \{ \} \= \! \< \> \| \: \-])/g, "\\\$1") + '\$'
        var regex = new RegExp(pattern)
    }

    for (var i = 0; i < chords.guitarChords.length; i++) {
        var each = chords.guitarChords[i]
        if ((!isRegex && (userInput === each.firstName || userInput === each.alternateName || userInput === each.type))
          || (isRegex && (regex.test(each.firstName) || regex.test(each.alternateName) || regex.test(each.type)))) {
            document.getElementById('svg' + i).style.display = ""
        } else {
            document.getElementById('svg' + i).style.display = "none"
        }
    }
}

var navClosed = true

function openCloseNav() {
    document.getElementById("navigationButton1").style.display = navClosed ? "none" : ""
    document.getElementById("navigationButton2").style.display = navClosed ? "" : "none"
    var size = 155 + 7.5   // GUI_RECTANGLE_CHORD_WIDTH + SMALL_INSET
    document.getElementById("sideNavBar").style.width = navClosed ? size+"px" : "0"
    document.getElementById("content").style.marginLeft = navClosed ? size+"px" : "0"
    document.getElementById("headerPanel").style.marginLeft = navClosed ? -size/2+"px" : "0"   // to stay centered by shifting half back after content has been shifted
    navClosed = !navClosed
}

function reactToKeyboard(event) {
    var x = event.which || event.keyCode;  // Use either which or keyCode, depending on browser support
    if (x == "0x73") {
        openCloseNav()
    }
}

function displaySpecificChords(input) {
    document.getElementById("searchZone").value = input
    activateSearchEngine()
}
