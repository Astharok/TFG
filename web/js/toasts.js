function toast(elementId, text) {
    var x = document.getElementById(elementId);

    x.classList.add("show");
    x.innerHTML = text;

    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3000);
}