function loadContent() {
    checkSession();
    document.getElementById("defaultOpen").click();
    document.getElementById("userTitle").innerHTML = 'Bienvenido ' + getCookie('NOMBRE') + ' ' + getCookie('APELLIDO');
    window.setInterval(loadData, 1000);
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

function loadData() {
    loadEquipos();
    comprobarSaldo(getCookie("ID_USUARIO"));
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
            loadEquipos();
            break;
        case "Usuarios":
            loadUsers();
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
