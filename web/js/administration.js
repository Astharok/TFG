function loadContent() {
    checkSession();
    document.getElementById("defaultOpen").click();
    window.setInterval(loadData, 1000);
}

function loadData() {
    if (getCookie("EQUIPOSVIEW") === 'true') {
        loadEquipos();
    }
    if (getCookie("USERSVIEW") === 'true') {
        loadUsers();
    }
    if (getCookie("CHATVIEW") === 'true' && getCookie('IDCONVERSACION') !== null) {
        getMensajesChat();
    }
}

function checkSession() {
    var sessionId = getCookie('SESSION_ID');
    var groupName = getCookie('GROUP_NAME');
    if (sessionId !== '') {
        if (groupName === 'Administradores') {
            
        }else{
            window.location.href = "client.jsp";
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
    
    setCookie("ADMINSVIEW", false, 1);
    setCookie("EQUIPOSVIEW", false, 1);
    setCookie("GRUOPSVIEW", false, 1);
    setCookie("CHATVIEW", false, 1);

    switch (tabName) {
        case "Equipos":
            setCookie("EQUIPOSVIEW", true, 1);
            loadEquipos();
            break;
        case "Usuarios":
            setCookie("ADMINSVIEW", true, 1);
            loadUsers();
            break;
        case "Ajustes":
            setCookie("GRUOPSVIEW", true, 1);
            loadGroups();
            break;

    }
}

function formToogleShow(formName, value) {
    setCookie('IDCONVERSACION', null, 1);
    setCookie("EQUIPOSVIEW", false, 1);
    setCookie("ADMINSVIEW", false, 1);
    setCookie("CHATVIEW", false, 1);
    if (formName === 'main-saldo-form' && value !== null) {
        document.getElementById("idUsuarioSaldo").value = value;
    }
    if (formName === 'main-edit-user-form' && value !== null) {
        getUserForEdit(value);
    }
    if (formName === 'main-advise-form' && value === null) {
        getgroupsForAdvise();
    }
    if (formName === 'main-chat-form' && value !== null) {
        getUserForChat(value);
        setCookie("CHATVIEW", true, 1);
    }
    if (formName === 'main-chat-form' && value === null) {
        setCookie("ADMINSVIEW", true, 1);
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
