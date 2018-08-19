function reactToUserInput() {
    var userInput = document.getElementById("searchZone").value.toLowerCase()

    for (var i = 0; i < chords.guitarChords.length; i++) {
        var svgElement = document.getElementById('svg' + i)
        var chordName = document.getElementById('name' + i).innerHTML.toLowerCase()
        if (chordName.indexOf(userInput) > -1) {
            svgElement.style.display = ""
        } else {
            svgElement.style.display = "none"
        }
    }
}
