function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var cookies = decodeURIComponent(document.cookie);
    var ca = cookies.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user !== "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user !== "" && user !== null) {
            setCookie("username", user, 365);
        }
    }
}

function deleteAllCookies() {
    var cookies = document.cookie.split("; ");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var name = cookie.split('=')[0];
        setCookie(name, '', 0);
    }
    
    var cookies = document.cookie.split(", ");
}

function hashcode(toHash) {
  var hash = 0, i, chr;
  if (toHash.length === 0) return hash;
  for (i = 0; i < toHash.length; i++) {
    chr   = toHash.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function getHora24H(fecha){
    var arrayFecha = fecha.split(' ');
    var time = arrayFecha[3];
    if(arrayFecha[4] === 'PM'){
        var timeArray = time.split(':');
        var hora = parseInt(timeArray[0]);
        var minuto = parseInt(timeArray[1]);
        var segundo = parseInt(timeArray[2]);
        hora = hora + 12;
        time = hora + ':' + minuto + ':' + segundo;
    }
    return time;
}