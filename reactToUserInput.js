function reactToUserInput() {
    var userInput = document.getElementById("searchZone").value.toLowerCase()

    for (var i = 0; i < chords.guitarChords.length; i++) {
        var svgElement = document.getElementById('svg' + i)
        var chordName = document.getElementById('name' + i).innerHTML.toLowerCase()
        if (chordName.includes(userInput)) {
            svgElement.style.display = ""
        } else {
            svgElement.style.display = "none"
        }
    }
}

var navOpen = false

function openCloseNav() {
    document.getElementById("navigationButton1").style.display = navOpen ? "none" : ""
    document.getElementById("navigationButton2").style.display = navOpen ? "" : "none"
    var size = 155 + 7.5   // GUI_RECTANGLE_CHORD_WIDTH + SMALL_INSET
    document.getElementById("sideNavBar").style.width = navOpen ? size+"px" : "0"
    document.getElementById("content").style.marginLeft = navOpen ? size+"px" : "0"
    document.getElementById("headerPanel").style.marginLeft = navOpen ? -size/2+"px" : "0"   // to stay centered by shifting half back after content has been shifted
    navOpen = !navOpen
}

function reactToKeyboard(e) {
    if (event.which == "0x73") {
        openCloseNav()
    }
}

function displayMajorChords() {
    document.getElementById("searchZone").value = "maj"
    reactToUserInput()
}

function displayMinorChords() {
    document.getElementById("searchZone").value = "min"
    reactToUserInput()
}

function displayMajor7thChords() {
    document.getElementById("searchZone").value = "maj7"
    reactToUserInput()
}

function displayMinor7thChords() {
    document.getElementById("searchZone").value = "m7"
    reactToUserInput()
}
