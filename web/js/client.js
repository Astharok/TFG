function loadContent() {
    checkSession();
    document.getElementById("defaultOpen").click();
    document.getElementById("userTitle").innerHTML = 'Bienvenido ' + getCookie('NOMBRE') + ' ' + getCookie('APELLIDO');
    window.setInterval(loadData, 2000);
}

function loadData() {
    if(getCookie("EQUIPOSVIEW")){
        loadEquipos();
    }
    if(getCookie("CHATVIEW")){
        getMensajesChat(getCookie('IDCONVERSACION'), getCookie('IDUSEREMISOR'), getCookie('IDUSERRECEPTOR'), getCookie('RECEPTORNOMBRE'));
    }
    comprobarSaldo(getCookie("ID_USUARIO"));
}

function checkSession() {
    var sessionId = getCookie('SESSION_ID');
    var groupName = getCookie('GROUP_NAME');
    if (sessionId !== '') {
        if (groupName === 'Administradores') {
            window.location.href = "administration.jsp";
        }
    } else {
        window.location.href = "index.jsp";
    }
}

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

    switch (tabName) {
        case "Equipos":
            setCookie("EQUIPOSVIEW", true, 1);
            setCookie("ADMINSVIEW", false, 1);
            loadEquipos();
            break;
        case "Mensajes":
            setCookie("ADMINSVIEW", true, 1);
            setCookie("EQUIPOSVIEW", false, 1);
            loadAdmins();
            break;

    }
}

function formToogleShow(formName, value) {
    if (formName === 'main-saldo-form' && value !== null) {
        document.getElementById("idUsuarioSaldo").value = value;
    }
    if (formName === 'main-edit-user-form' && value !== null) {
        getUserForEdit(value);
    }
    if (formName === 'main-chat-form' && value !== null) {
        getUserForChat(value);
        setCookie("EQUIPOSVIEW", false, 1);
        setCookie("ADMINSVIEW", false, 1);
        setCookie("CHATVIEW", true, 1);
    }
    if (formName === 'main-chat-form' && value === null) {
        setCookie("EQUIPOSVIEW", false, 1);
        setCookie("ADMINSVIEW", true, 1);
        setCookie("CHATVIEW", false, 1);
    }
    var docClasses = document.getElementById(formName).classList;
    if (docClasses.contains('hidden')) {
        docClasses.replace('hidden', 'visible');
        return;
    }
    if (docClasses.contains('visible')) {
        docClasses.replace('visible', 'hidden');
        return;
    }
}
