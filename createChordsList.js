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

function drawSvg(shape, attributes, text=null) {
    var ns = 'http://www.w3.org/2000/svg'
    var result = document.createElementNS(ns, shape);
    for (var each in attributes) {
        result.setAttributeNS(null, each, attributes[each]);
    }
    if (text) {
        var textNode = document.createTextNode(text);
        result.appendChild(textNode);
    }
    return result
 }

function createSvgChord(guitarChord) {
    var svg = drawSvg('svg', {width:140, height:170})
    svg.appendChild(drawSvg('rect', {rx:20, ry:20, x:10, y:10, width:120, height:150, fill:'red', stroke:'black', 'stroke-width':5, opacity:0.5}))
    svg.appendChild(drawSvg('rect', {x:20, y:20, width:100, height:130, fill:'rgb(150,255,255)', stroke:'black'}))
    svg.appendChild(drawSvg('circle', {cx:70, cy:120, r:10, fill:'rgb(200,50,50)', stroke:'black', 'stroke-width':2}))
    svg.appendChild(drawSvg('line', {x1:20, y1:20, x2:120, y2:150, stroke:'rgb(200,200,200)', 'stroke-width':2}))
    svg.appendChild(drawSvg('line', {x1:120, y1:20, x2:20, y2:150, stroke:'rgb(0,200,0)', 'stroke-width':2}))
    svg.appendChild(drawSvg('text', {x:50, y:90, fill:'blue'}, guitarChord.firstName))
    return svg
}

var url = "http://localhost:8000/guitarChordDictionary.json"
var chords = loadJsonFile(url)

var htmlChordsList = parseChords(chords)
document.getElementById("chordsUL").innerHTML = htmlChordsList

for (var each of chords.guitarChords) {
    var svg = createSvgChord(each)
    document.getElementById('placeHolder').appendChild(svg)
}
