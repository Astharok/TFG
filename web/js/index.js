function loadContent() {
    checkSession();
}

function checkSession() {
    var sessionId = getCookie('SESSION_ID');
    var groupName = getCookie('GROUP_NAME');
    if (sessionId !== '') {
        if (groupName === 'Administradores') {
            window.location.href = "administration.jsp";
        }else{
            window.location.href = "client.jsp";
        }
    } else {
        
    }
}

function formToogleShow(formName, value) {
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