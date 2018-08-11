function loadJsonFile(url) {
    var result = null
    var xhr = new XMLHttpRequest()
    xhr.open("GET", url, false)
    xhr.send()
    if (xhr.readyState == 4) {
        result = JSON.parse(xhr.responseText)
    }
    return result
}

function parseChords(chords) {
    var result = '<ul id="chordsUL">'
    for(var each of chords.guitarChords) {
        result += '<li><a href="#">' + 
                    each.firstName +
                    " : " +
                    each.fingers +
                    "</a></li>"
    }
    result += '</ul>'
    return result
}

var url = "http://localhost:8000/guitarChordDictionary.json"
var chords = loadJsonFile(url)
var htmlChordsList = parseChords(chords)
document.getElementById("chordsUL").innerHTML = htmlChordsList
