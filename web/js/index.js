function loadContent() {
    var sessionId = getCookie('sessionid');
    if(sessionId !== ''){
        window.location.href = "administration.jsp";
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

function login() {
    var apodo = $('#userName').val();
    var password = hashcode($('#password').val());
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Usuario.LOGIN',
            APODO: apodo,
            PASSWORD: password
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                setCookie("sessionid", responseText.SESSION_ID, 1);
                if (responseText.GROUP_NAME === "Administradores") {
                    window.location.href = "administration.jsp";
                } else {
                    alert(responseText.STATE + ": " + responseText.MESSAGE);
                }
            } else {
                alert(responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}