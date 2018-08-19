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

function drawSvg(shape, attributes, text=null, subscriptText=null) {
    var ns = 'http://www.w3.org/2000/svg'
    var result = document.createElementNS(ns, shape)
    for (var each in attributes) {
        result.setAttributeNS(null, each, attributes[each])
    }
    if (text) {
        result.appendChild(document.createTextNode(text))
    }
    if (subscriptText) {
        var tspan = document.createElementNS(ns, 'tspan')
        tspan.setAttributeNS(null, 'style', GUI_INDEX_FONT)
        tspan.setAttributeNS(null, 'dy', -CENTER)
        tspan.appendChild(document.createTextNode(subscriptText))
        result.appendChild(tspan)
    }
    return result
 }

var GUI_COLOR_GREYEDBLUE = 'rgb(195, 220, 240)'   // #C3DCF0
var GUI_COLOR_LIGHTBLUE = 'rgb(225 ,240 ,250)'   // #E1F0FA
var GUI_COLOR_ORANGERED ='rgb(238, 0, 0)'   // #EE0000
var GUI_COLOR_GREY ='rgb(160, 160, 160)'

var GUI_PLAIN_FONT = 'font:bold 16px sans-serif'
var GUI_SMALL_FONT = 'font:12px sans-serif'
var GUI_INDEX_FONT = 'font:8px sans-serif'

var GUI_RECTANGLE_CHORD_WIDTH = 155
var GUI_RECTANGLE_CHORD_HEIGHT = 250   // golden number ratio

var TITLE_HEIGHT = 50
var BIG_INSET = 37.5
var SMALL_INSET = 7.5
var CENTER = 3.75
var RADIUS_RATIO_NUM = 2.5
var RADIUS_RATIO_DEN = 3.75
var INTER_STRINGS = 15
var INTER_FRETS = 25

var NB_STRINGS = 6
var NB_FRETS = 6
var TOP_FRET = 7
var NB_DISPLAYED_FRETS = 5

var guitarStrings = ['E', 'A', 'D', 'G', 'B', 'E']
var notes = ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#']
var stringNotes = [7, 0, 5, 10, 2, 7] // notes.indexOf(guitarStrings[i]) for i in 0 .. guitarStrings.length

function treble(guitarString, finger) {
    var stringNote = stringNotes[guitarString]
    return notes[(stringNote + finger) % notes.length]
 }

function getMaxFinger(guitarChord) {
    result = 0
    for (var i = 0; i < guitarStrings.length; i++) {
        var finger = guitarChord.fingers[i]
        if (result < finger && finger != 'x') {
            result = finger
        }
    }
    return result
}

function getMinFinger(guitarChord) {
    result = +Infinity
    for (var i = 0; i < guitarStrings.length; i++) {
        var finger = guitarChord.fingers[i]
        if (0 < finger && finger < result  && finger != 'x') {
            result = finger
        }
    }
    return result
}

function getFirstDisplayedFret(guitarChord, numberOfDisplayedFrets) {
    if (getMaxFinger(guitarChord) <= numberOfDisplayedFrets) {
        return 1
    }
    else {
        return getMinFinger(guitarChord)
    }
}

function createSvgChord(guitarChord, uniqueId) {
    var svgGlob = drawSvg('svg', {id: 'svg'+uniqueId, width:GUI_RECTANGLE_CHORD_WIDTH + SMALL_INSET, height:GUI_RECTANGLE_CHORD_HEIGHT + SMALL_INSET})
    svgGlob.appendChild(drawSvg('rect', {x:SMALL_INSET / 2, y:SMALL_INSET / 2, width:GUI_RECTANGLE_CHORD_WIDTH, height:GUI_RECTANGLE_CHORD_HEIGHT, fill:GUI_COLOR_LIGHTBLUE, stroke:'black', 'stroke-width':1}))

    var svgTop = drawSvg('svg', {x:SMALL_INSET / 2, y:SMALL_INSET / 2, width:GUI_RECTANGLE_CHORD_WIDTH, height:TITLE_HEIGHT})
    svgGlob.appendChild(svgTop)

    var fullName = guitarChord.firstName
    if (guitarChord.alternateName != "" ) {
        fullName += ' or ' + guitarChord.alternateName   // FIXME tspan to have 'or' not in bold
    }
    svgTop.appendChild(drawSvg('text', {id: 'name'+uniqueId, x:'50%', y:'50%', fill:'black', 'alignment-baseline':"middle", 'text-anchor':"middle", style:GUI_PLAIN_FONT}, fullName))

    var svgBottom = drawSvg('svg', {x:SMALL_INSET / 2, y:TITLE_HEIGHT, width:GUI_RECTANGLE_CHORD_WIDTH, height:GUI_RECTANGLE_CHORD_HEIGHT - TITLE_HEIGHT})
    svgGlob.appendChild(svgBottom)

    svgBottom.appendChild(drawSvg('rect', {x:BIG_INSET, y:BIG_INSET, width:(NB_STRINGS - 1) * INTER_STRINGS, height:(NB_FRETS - 1) * INTER_FRETS, fill:'white', stroke:'white'}))
    svgBottom.appendChild(drawSvg('rect', {x:BIG_INSET, y:BIG_INSET - TOP_FRET, width:(NB_STRINGS - 1) * INTER_STRINGS, height:TOP_FRET, fill:'white', stroke:'black'}))
    drawFrets(svgBottom)
    var radius = 0.5 * RADIUS_RATIO_NUM * Math.min(INTER_STRINGS, INTER_FRETS) / RADIUS_RATIO_DEN
    var firstDisplayedFret = getFirstDisplayedFret(guitarChord, NB_DISPLAYED_FRETS)
    if (1 < firstDisplayedFret) {
        svgBottom.appendChild(drawSvg('text', {x:SMALL_INSET + SMALL_INSET / 2, y:BIG_INSET - INTER_FRETS / 2 + INTER_FRETS, 'alignment-baseline':"middle", style:GUI_SMALL_FONT}, firstDisplayedFret + 'fr'))
    }
    for (var i = 0; i < guitarStrings.length; i++)
    {
        var finger = guitarChord.fingers[i]
        if (finger == 'x') {
            svgBottom.appendChild(drawSvg('text', {x:BIG_INSET + i * INTER_STRINGS, y:BIG_INSET, 'text-anchor':"middle", fill:GUI_COLOR_ORANGERED, style:GUI_PLAIN_FONT}, 'x'))
            svgBottom.appendChild(drawSvg('line', {x1:BIG_INSET + i * INTER_STRINGS, y1:BIG_INSET, x2:BIG_INSET + i * INTER_STRINGS, y2:BIG_INSET + (NB_FRETS - 1) * INTER_FRETS, stroke:GUI_COLOR_ORANGERED, 'stroke-dasharray':'2,3'}))
        }
        else {
            svgBottom.appendChild(drawSvg('line', {x1:BIG_INSET + i * INTER_STRINGS, y1:BIG_INSET, x2:BIG_INSET + i * INTER_STRINGS, y2:BIG_INSET + (NB_FRETS - 1) * INTER_FRETS, stroke:'black'}))
            var playedNote = treble(i, finger)
            svgBottom.appendChild(drawSvg('text', {x:BIG_INSET - CENTER + i * INTER_STRINGS, y:BIG_INSET + (NB_FRETS - 1) * INTER_FRETS + BIG_INSET / 2, style:GUI_SMALL_FONT}, playedNote[0], (playedNote.length == 2) ? playedNote[1] : null))
            if (1 < firstDisplayedFret) {
                finger -= (firstDisplayedFret - 1)
            }
            if (finger >= 1) {
                svgBottom.appendChild(drawSvg('circle', {cx:BIG_INSET + i * INTER_STRINGS, cy:BIG_INSET - INTER_FRETS / 2 + finger * INTER_FRETS, r:radius}))
            } 
        }
    }

    for (var i = 0; i < guitarStrings.length; i++)
    {
        svgBottom.appendChild(drawSvg('text', {x:BIG_INSET - CENTER + i * INTER_STRINGS, y:BIG_INSET / 2 + CENTER, fill:GUI_COLOR_GREY, style:GUI_SMALL_FONT}, guitarStrings[i]))
    }

    return svgGlob
}

function drawFrets(svg) {
    for (var i = 0; i < NB_FRETS; i++) {
        svg.appendChild(drawSvg('line', { x1: BIG_INSET, y1: BIG_INSET + i * INTER_FRETS, x2: BIG_INSET + (NB_STRINGS - 1) * INTER_STRINGS, y2: BIG_INSET + i * INTER_FRETS, stroke: 'gray' }))
    }
}

var url = "http://localhost:8000/guitarChordDictionary.json"
var chords = loadJsonFile(url)

var svgContainer = document.getElementById('svgContainer')
var uniqueId = 0
for (var each of chords.guitarChords) {
    var svgChord = createSvgChord(each, uniqueId++)
    svgContainer.appendChild(svgChord)
}
