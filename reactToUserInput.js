function reactToUserInput() {
    var input = document.getElementById("searchZone").value.toLowerCase()
    var ul = document.getElementById("chordsUL")
    var li = ul.getElementsByTagName("li")
    for (var each of li) {
        var a = each.getElementsByTagName("a")[0]
        if (a.innerHTML.toLowerCase().indexOf(input) > -1) {
            each.style.display = ""
        } else {
            each.style.display = "none"
        }
    }
}
