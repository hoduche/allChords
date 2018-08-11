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

function createSvgChord() {
    var ns = 'http://www.w3.org/2000/svg'
    var rect = document.createElementNS(ns, 'rect')
    rect.setAttributeNS(null, 'rx', 20)
    rect.setAttributeNS(null, 'ry', 20)
    rect.setAttributeNS(null, 'x', 10)
    rect.setAttributeNS(null, 'y', 10)
    rect.setAttributeNS(null, 'width', 120)
    rect.setAttributeNS(null, 'height', 150)
    rect.setAttributeNS(null, 'style', "fill:red;stroke:black;stroke-width:5;opacity:0.5")
    var svg = document.createElementNS(ns, 'svg')
    svg.setAttributeNS(null, 'width', 140)
    svg.setAttributeNS(null, 'height', 170)
    svg.appendChild(rect)
    return svg
}

var url = "http://localhost:8000/guitarChordDictionary.json"
var chords = loadJsonFile(url)

var htmlChordsList = parseChords(chords)
document.getElementById("chordsUL").innerHTML = htmlChordsList

for (var each of chords.guitarChords) {
    var svg = createSvgChord()
    document.getElementById('placeHolder').appendChild(svg)
}
