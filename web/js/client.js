function loadContent() {
    checkSession();
    document.getElementById("defaultOpen").click();
    document.getElementById("userTitle").innerHTML = 'Bienvenido ' + getCookie('NOMBRE') + ' ' + getCookie('APELLIDO');
    window.setInterval(loadData, 5000);
}

function loadData() {
    if (getCookie("EQUIPOSVIEW") === 'true') {
        loadEquipos();
    }
    if (getCookie("CHATVIEW") === 'true' && getCookie('IDCONVERSACION') !== null) {
        getMensajesChat();
    }
    comprobarSaldo(getCookie("ID_USUARIO"));
    getAdvises(getCookie('ID_USUARIO'));
}

function checkSession() {
    var sessionId = getCookie('SESSION_ID');
    var groupName = getCookie('GROUP_NAME');
    if (sessionId !== '') {
        if (groupName === 'Administradores') {
            window.location.href = "administration.jsp";
        }else{
            
        }
    } else {
        window.location.href = "index.jsp";
    }
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

    setCookie("EQUIPOSVIEW", false, 1);
    setCookie("CHATVIEW", false, 1);

    switch (tabName) {
        case "Equipos":
            setCookie("EQUIPOSVIEW", true, 1);
            loadEquipos();
            break;
        case "Mensajes":
            loadUsersForChat();
            break;
        case "Datos de usuario":
            getUserForOwnEdit();
            break;

    }
}

function formToogleShow(formName, value) {
    setCookie('IDCONVERSACION', null, 1);
    setCookie("EQUIPOSVIEW", false, 1);
    setCookie("CHATVIEW", false, 1);
    if (formName === 'main-saldo-form' && value !== null) {
        document.getElementById("idUsuarioSaldo").value = value;
    }
    if (formName === 'main-edit-user-form' && value !== null) {
        getUserForEdit(value);
    }
    if (formName === 'main-chat-form' && value !== null) {
        getUserForChat(value);
        setCookie("CHATVIEW", true, 1);
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
